self.addEventListener("install", () => {
  console.log("Service Worker Installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker Activated");
});

self.addEventListener("push", (event) => {
  console.log("🔥 PUSH EVENT TRIGGERED");

  if (!event.data) {
    console.log("No data in push");
    return;
  }

  console.log("RAW DATA:", event.data.text());

  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = event.data.text();
    }
  }

  console.log("PARSED DATA:", data);

  const title = data.title || "Notification";
  const options = {
    body: data.body || "No message",
    icon: "/logo.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // If a tab is already open, focus it
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        // Otherwise open a new tab
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }),
  );
});
