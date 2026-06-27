import api from "../api/api";
import { showError } from "../utils/toast";
import { subscribeUser } from "../utils/urlBase64ToUint8Array";

type SaveSubscriptionRequest = {
  subscription: PushSubscription;
  userId?: string;
  deviceInfo: {
    browser: string;
    browserVersion: string;
    os: string;
    platform: string;
    userAgent: string;
  };
};

class NotificationService {
  async registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      showError("Notification not supported");
      throw new Error("Service worker is not supported!");
    }
    return navigator.serviceWorker.register("/sw.js");
  }

  async getPermission() {
    return Notification.permission;
  }

  async requestPermission() {
    return Notification.requestPermission();
  }

  async getSubscriptions() {
    const registration = await navigator.serviceWorker.ready;
    return registration.pushManager.getSubscription();
  }

  async subscribe() {
    let subscription = await this.getSubscriptions();
    if (!subscription) {
      subscription = await subscribeUser();
    }
    return subscription;
  }

  async unsubscribe() {
    const subscription = await this.getSubscriptions();
    if (!subscription) return;

    await api.delete("/notifications/unsubscribe", {
      data: {
        endpoint: subscription.endpoint,
      },
    });
    console.log("endpoint: : : ", subscription.endpoint);

    await subscription.unsubscribe();
    return true;
  }

  async saveSubscription(payload: SaveSubscriptionRequest) {
    console.log("payload: ", payload)
    const res = await api.post("/notifications/subscribe", { data: payload });
    return res.data;
  }

  async syncSubscriptionState() {
    const subscription = await this.getSubscriptions();
    return !!subscription;
  }
}

export default new NotificationService();
