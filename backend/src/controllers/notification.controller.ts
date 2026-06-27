import { Request, Response } from "express";
import NotificationService from "../services/notification.service";

export const handleSubscribe = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    if (!data.subscription) {
      return res.status(400).json({
        success: false,
        message: "Subscription missing",
      });
    }
    const saved = await NotificationService.createOrUpdateSubscription(data);
    return res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Subscription failed",
    });
  }
};

export const handleUnsubscribe = async (req: Request, res: Response) => {
  try {
    const { endpoint } = req.body;
    if (!endpoint) {
      return res.status(400).json({
        success: false,
        message: "Endpoint required",
      });
    }
    await NotificationService.deleteSubscriptionByEndpoint(endpoint);
    return res.status(201).json({
      success: true,
      message: "Unsubscribed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unsubscribe failed",
    });
  }
};

export const sendToUser = async (req: Request, res: Response) => {
  const { userId, payload } = req.body;
  const result = await NotificationService.sendToUser(userId, payload);
  res.json({ success: true, data: result });
};

export const sendToAllUsers = async (req: Request, res: Response) => {
  const { payload } = req.body;
  const result = await NotificationService.sendToAllUsers(payload);
  res.json({ success: true, data: result });
};
