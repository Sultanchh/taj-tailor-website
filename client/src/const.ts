export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Taj Tailor";
export const SHOP_NAME = "Taj Tailor";
export const SHOP_TAGLINE = "Custom Shalwar Kameez - Karachi's Finest Tailoring";
export const SHOP_PHONE = "+92-300-XXXXXXX";
export const SHOP_EMAIL = "info@tajtailor.com";
export const SHOP_ADDRESS = "Karachi, Pakistan";
export const SHOP_HOURS = "Monday - Saturday: 10:00 AM - 6:00 PM | Sunday: Closed";

export const APP_LOGO = "https://placehold.co/128x128/1F3A5F/D4AF37?text=Taj+Tailor";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
