import PushSubscription from "../models/PushSubscription.model";
import webpush from "../utils/vapid";

interface Payload {
  title: string;
  body: string;
  url?: string;
  type?: string;
}

// interface SubscriptionPayload  {
//   subscription: PushSubscription;
//   userId?: string;
//   deviceInfo: {
//     browser: string;
//     browserVersion: string;
//     os: string;
//     platform: string;
//     userAgent: string;
//   };
// };

class NotificationService {
  async createOrUpdateSubscription(data: any) {
    const { subscription, userId, deviceInfo } = data;
    const { endpoint, keys, expirationTime } = subscription;
    console.log("data: ", data);
    const existing = await PushSubscription.findOne({ endpoint });
    if (existing) {
      existing.keys = keys;
      existing.expirationTime = expirationTime;
      existing.userId = userId || existing.userId;
      existing.deviceInfo = deviceInfo || existing.deviceInfo;
      existing.lastSeen = new Date();
      existing.active = true;

      await existing.save();
      return existing;
    }
    const newSub = await PushSubscription.create({
      endpoint,
      keys,
      expirationTime,
      userId,
      deviceInfo,
    });
    return newSub;
  }

  async findSubscriptionsByUserId(userId: string) {
    return await PushSubscription.find({ userId });
  }

  async findSubscriptionByEndpoint(endpoint: string) {
    return await PushSubscription.findOne({ endpoint });
  }

  async deleteSubscriptionByEndpoint(endpoint: string) {
    return await PushSubscription.findOneAndDelete({ endpoint });
  }

  async sendToUser(userId: string, payload: Payload) {
    const subscriptions = await PushSubscription.find({ userId });
    const message = JSON.stringify(payload);
    const results = await Promise.allSettled(
      subscriptions.map((sub) => webpush.sendNotification(sub as any, message)),
    );
    await this.cleanFailedSubscriptions(results, subscriptions);
    return results;
  }

  async sendToAllUsers(payload: Payload) {
    const subscriptions = await PushSubscription.find();
    const message = JSON.stringify(payload);
    console.log("message: ", message);
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        await PushSubscription.updateOne(
          { endpoint: sub.endpoint },
          { lastSeen: new Date() },
        );
        return webpush.sendNotification(sub as any, message);
      }),
    );
    console.log("results: ", results);

    await this.cleanFailedSubscriptions(results, subscriptions);
    return results;
  }
  async sendToClass(classId: string, payload: Payload) {
    const subscriptions = await PushSubscription.find({ classId });
    const message = JSON.stringify(payload);
    const results = await Promise.allSettled(
      subscriptions.map((sub) => webpush.sendNotification(sub as any, message)),
    );

    return await Promise.allSettled(
      subscriptions.map((sub) => webpush.sendNotification(sub as any, message)),
    );
  }

  async cleanFailedSubscriptions(
    results: PromiseSettledResult<any>[],
    subscriptions: any[],
  ) {
    const toDelete: string[] = [];
    results.forEach((res, index) => {
      if (
        res.status === "rejected" &&
        (res.reason?.statusCode === 404 || res.reason?.statusCode === 410)
      ) {
        toDelete.push(subscriptions[index].endpoint);
      }
    });
    if (toDelete.length > 0) {
      await PushSubscription.deleteMany({
        endpoint: { $in: toDelete },
      });
    }
  }
}

export default new NotificationService();
