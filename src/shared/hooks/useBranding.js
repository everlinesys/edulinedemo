import branding from "../../config/branding.json"
import themes from "../../config/themes.json";

export function useBranding() {
  const host = window.location.host;
  const brand = branding[host] || branding.default;

  const theme = themes[brand.theme || "darkBox"];

  return {
    ...brand,
    theme,

    colors: {
      primary:
        brand.colors?.primary ||
        brand.primaryColor ||
        "#f94430",

      accent:
        brand.colors?.accent ||
        brand.accentColor ||
        "#22C55E"
    }
  };
}
