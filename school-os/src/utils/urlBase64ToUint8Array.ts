export const urlBase64ToUint8Array = (base64String: string) => {
    // console.log("computing...")
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
    console.log({ base64String, padding, base64, rawData });
    // console.log("data: ", Uint8Array.from([...rawData].map((char) => char.charCodeAt(0))))

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const PUBLIC_VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY?.trim();

export async function subscribeUser() {
  const registration = await navigator.serviceWorker.ready;
  // console.log("registration: ", registration);
  // console.log("subs: ");
  const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
    });

  return subscription;
}
