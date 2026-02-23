export function detectSource() {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("src");

  if (utm) return utm;

  const ref = document.referrer;

  if (!ref) return "direct";
  if (ref.includes("instagram")) return "instagram";
  if (ref.includes("twitter") || ref.includes("t.co")) return "twitter";
  if (ref.includes("linkedin")) return "linkedin";

  return "other";
}