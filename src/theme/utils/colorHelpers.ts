// React and React Native
import { ColorValue } from 'react-native';

/**
 * Comprehensive color utility functions
 * Combines all color manipulation helpers
 */

// Convert hex to RGB
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Add opacity to a color
export const withOpacity = (color: ColorValue, opacity: number): string => {
  const hexColor = String(color);
  const rgb = hexToRgb(hexColor);
  if (!rgb) return hexColor;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

// Lighten a color
export const lighten = (color: ColorValue, amount: number): string => {
  const hexColor = String(color);
  const rgb = hexToRgb(hexColor);
  if (!rgb) return hexColor;

  const factor = 1 + amount;
  const r = Math.min(255, Math.round(rgb.r * factor));
  const g = Math.min(255, Math.round(rgb.g * factor));
  const b = Math.min(255, Math.round(rgb.b * factor));

  return rgbToHex(r, g, b);
};

// Darken a color
export const darken = (color: ColorValue, amount: number): string => {
  const hexColor = String(color);
  const rgb = hexToRgb(hexColor);
  if (!rgb) return hexColor;

  const factor = 1 - amount;
  const r = Math.max(0, Math.round(rgb.r * factor));
  const g = Math.max(0, Math.round(rgb.g * factor));
  const b = Math.max(0, Math.round(rgb.b * factor));

  return rgbToHex(r, g, b);
};

// Check if color is dark
export const isDarkColor = (color: ColorValue): boolean => {
  const hexColor = String(color);
  const rgb = hexToRgb(hexColor);
  if (!rgb) return false;

  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance < 0.5;
};

// Get contrast color (black or white)
export const getContrastColor = (color: ColorValue): string => {
  return isDarkColor(color) ? '#FFFFFF' : '#000000';
};

/**
 * Generate color variants from a primary color
 * Migrated from old colorUtils.ts
 */
export const generateColorVariants = (primaryColor: string) => {
  // Convert hex to HSL for better color manipulation
  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // Convert HSL back to hex
  const hslToHex = (h: number, s: number, l: number) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hsl = hexToHsl(primaryColor);

  return {
    primary: primaryColor,
    secondary: hslToHex(
      hsl.h,
      Math.max(hsl.s - 20, 10),
      Math.max(hsl.l - 15, 10),
    ),
    tertiary: hslToHex(
      hsl.h,
      Math.max(hsl.s - 30, 10),
      Math.min(hsl.l + 30, 90),
    ),
    light: hslToHex(hsl.h, Math.max(hsl.s - 40, 5), Math.min(hsl.l + 40, 95)),
    dark: hslToHex(hsl.h, Math.min(hsl.s + 10, 100), Math.max(hsl.l - 25, 5)),
  };
};
