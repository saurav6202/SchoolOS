export function getDeviceInfo() {
  const ua = navigator.userAgent;

  return {
    userAgent: ua,
    platform: navigator.platform,
    browser: getBrowser(ua),
    os: getOS(ua),
    browserVersion: getBrowserVersion(ua),
  };
}

function getBrowser(ua: string) {
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Brave")) return "Brave";
  return "Unknown";
}

function getOS(ua: string) {
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Mac")) return "Mac";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone")) return "iOS";
  return "Unknown";
}

function getBrowserVersion(ua: string) {
  const match = ua.match(/(Chrome|Firefox|Edg|Brave)\/([\d.]+)/);
  return match ? match[2] : "Unknown";
}
