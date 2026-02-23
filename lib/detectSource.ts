export function detectSource() {
  const ref = document.referrer;

  if (!ref) return "direct";
  if (ref.includes("instagram")) return "instagram";
  if (ref.includes("twitter") || ref.includes("t.co")) return "twitter";
  if (ref.includes("linkedin")) return "linkedin";
  if (ref.includes("facebook")) return "facebook";
  if (ref.includes("youtube")) return "youtube";

  return "other";
}
