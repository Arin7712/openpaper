export function detectSource() {
  const ua = navigator.userAgent.toLowerCase();
  const ref = document.referrer.toLowerCase();

  if (ua.includes("whatsapp")) return "whatsapp";
  if (ua.includes("twitter")) return "twitter";
  if (ua.includes("linkedin")) return "linkedin";
  if (ua.includes("instagram")) return "instagram";

  if (ref.includes("twitter")) return "twitter";
  if (ref.includes("linkedin")) return "linkedin";
  if (ref.includes("instagram")) return "instagram";

  return "direct";
}