export type PermissionStatus = "default" | "granted" | "denied";
export type SubscriptionStatus = "not-subscribed" | "subscribed";
export type ServiceWorkerStatus = "not-registered" | "active";

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
