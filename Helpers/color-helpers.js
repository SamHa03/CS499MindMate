// color-helpers.js
// Helper functions for color manipulation and conversion.

/** 
 * Converts a hex color (e.g. "#ff0000") to its RGB components.
 */
export function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  
/**
* Converts RGB components to a hex string.
*/
export function rgbToHex(r, g, b) {
    const clamp = (val) => Math.max(0, Math.min(255, Math.round(val)));
    const rh = clamp(r).toString(16).padStart(2, '0');
    const gh = clamp(g).toString(16).padStart(2, '0');
    const bh = clamp(b).toString(16).padStart(2, '0');
    return `#${rh}${gh}${bh}`;
  }

// Function to convert hex to HSL
function hexToHSL(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0, s = 0, l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
  }

  return { h, s, l };
}

// Function to convert HSL back to hex
function hslToHex(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(color * 255).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// function to blend an array of colors using HSL with saturation boost
export function blendColors(colors) {
  if (!Array.isArray(colors) || colors.length === 0) {
    throw new Error("Please provide an array of colors with at least one color.");
  }

  // convert all colors to HSL
  const hslColors = colors.map(color => hexToHSL(color));

  // initialize sums for H, S, and L components
  let hSum = 0;
  let sSum = 0;
  let lSum = 0;

  // sum up each HSL component
  for (const hsl of hslColors) {
    hSum += hsl.h;
    sSum += hsl.s;
    lSum += hsl.l;
  }

  // compute the average of each component
  const h = hSum / hslColors.length;
  const s = Math.min((sSum / hslColors.length) + 0.2, 1); // Boost saturation
  const l = lSum / hslColors.length;

  // convert blended HSL back to HEX
  return hslToHex(h, s, l);
}