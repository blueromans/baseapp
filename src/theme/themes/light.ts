// Local Components and Hooks
import { Theme } from '../types';
import { basePalette } from '../tokens/colors';
import size, { fontSize } from '../../utils/helpers/size';

export const lightTheme: Theme = {
  name: 'light',
  isDark: false,

  colors: {
    palette: basePalette,

    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
      elevated: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    text: {
      primary: '#111827',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      disabled: '#D1D5DB',
      inverse: '#FFFFFF',
      link: '#3B82F6',
    },

    brand: {
      primary: '#3B82F6',
      secondary: '#2563EB',
      tertiary: '#DBEAFE',
    },

    status: {
      success: '#22C55E',
      warning: '#EAB308',
      error: '#EF4444',
      info: '#3B82F6',
    },

    interactive: {
      default: '#3B82F6',
      hover: '#2563EB',
      pressed: '#1D4ED8',
      disabled: '#E5E7EB',
      focus: '#3B82F6',
    },

    border: {
      default: '#E5E7EB',
      subtle: '#F3F4F6',
      strong: '#D1D5DB',
      focus: '#3B82F6',
    },

    surface: {
      card: '#FFFFFF',
      modal: '#FFFFFF',
      sheet: '#FFFFFF',
    },

    shadow: {
      default: '#000000',
      strong: '#000000',
    },
  },

  spacing: {
    scale: {
      0: 0,
      1: size(4),
      2: size(8),
      3: size(12),
      4: size(16),
      5: size(20),
      6: size(24),
      8: size(32),
      10: size(40),
      12: size(48),
      16: size(64),
      20: size(80),
      24: size(96),
    },

    semantic: {
      none: 0,
      xs: size(4),
      sm: size(8),
      md: size(16),
      lg: size(24),
      xl: size(32),
      '2xl': size(40),
      '3xl': size(48),
    },

    components: {
      button: {
        paddingX: size(16),
        paddingY: size(12),
        gap: size(8),
      },
      card: {
        padding: size(16),
        gap: size(12),
      },
      input: {
        paddingX: size(12),
        paddingY: size(12),
      },
      list: {
        itemGap: size(8),
        sectionGap: size(24),
      },
      modal: {
        padding: size(20),
        gap: size(16),
      },
    },

    layout: {
      containerPadding: size(16),
      sectionGap: size(32),
      elementGap: size(16),
    },
  },

  typography: {
    fontFamilies: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
      light: 'System',
      thin: 'System',
      black: 'System',
      italic: 'System',
      boldItalic: 'System',
    },

    fontSizes: {
      xs: fontSize(10),
      sm: fontSize(12),
      md: fontSize(14),
      lg: fontSize(16),
      xl: fontSize(18),
      '2xl': fontSize(20),
      '3xl': fontSize(24),
      '4xl': fontSize(30),
      '5xl': fontSize(36),
      '6xl': fontSize(48),
      '7xl': fontSize(60),
      '8xl': fontSize(72),
      '9xl': fontSize(96),
    },

    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    letterSpacing: {
      tighter: -0.05,
      tight: -0.025,
      normal: 0,
      wide: 0.025,
      wider: 0.05,
      widest: 0.1,
    },

    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
      '100': '100',
      '200': '200',
      '300': '300',
      '400': '400',
      '500': '500',
      '600': '600',
      '700': '700',
      '800': '800',
      '900': '900',
    },

    variants: {
      h1: {
        fontSize: fontSize(36),
        fontWeight: '700',
        lineHeight: fontSize(36) * 1.2,
        letterSpacing: -0.025,
      },
      h2: {
        fontSize: fontSize(30),
        fontWeight: '700',
        lineHeight: fontSize(30) * 1.2,
        letterSpacing: -0.025,
      },
      h3: {
        fontSize: fontSize(24),
        fontWeight: '600',
        lineHeight: fontSize(24) * 1.3,
        letterSpacing: -0.025,
      },
      h4: {
        fontSize: fontSize(20),
        fontWeight: '600',
        lineHeight: fontSize(20) * 1.3,
      },
      h5: {
        fontSize: fontSize(18),
        fontWeight: '600',
        lineHeight: fontSize(18) * 1.4,
      },
      h6: {
        fontSize: fontSize(16),
        fontWeight: '600',
        lineHeight: fontSize(16) * 1.4,
      },
      subtitle1: {
        fontSize: fontSize(16),
        fontWeight: '500',
        lineHeight: fontSize(16) * 1.5,
      },
      subtitle2: {
        fontSize: fontSize(14),
        fontWeight: '500',
        lineHeight: fontSize(14) * 1.5,
      },
      body1: {
        fontSize: fontSize(16),
        fontWeight: '400',
        lineHeight: fontSize(16) * 1.5,
      },
      body2: {
        fontSize: fontSize(14),
        fontWeight: '400',
        lineHeight: fontSize(14) * 1.5,
      },
      button: {
        fontSize: fontSize(14),
        fontWeight: '600',
        lineHeight: fontSize(14) * 1.5,
        letterSpacing: 0.025,
        textTransform: 'uppercase',
      },
      caption: {
        fontSize: fontSize(12),
        fontWeight: '400',
        lineHeight: fontSize(12) * 1.5,
      },
      overline: {
        fontSize: fontSize(10),
        fontWeight: '600',
        lineHeight: fontSize(10) * 1.5,
        letterSpacing: 0.05,
        textTransform: 'uppercase',
      },
      label: {
        fontSize: fontSize(12),
        fontWeight: '500',
        lineHeight: fontSize(12) * 1.5,
      },
    },
  },

  borderRadii: {
    none: 0,
    sm: size(2),
    md: size(4),
    lg: size(8),
    xl: size(12),
    '2xl': size(16),
    '3xl': size(24),
    full: 9999,
    button: size(8),
    card: size(12),
    input: size(8),
    modal: size(16),
    avatar: 9999,
  },

  shadows: {
    none: {},
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 4,
    },
    '2xl': {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 5,
    },
    inner: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 0,
    },
  },

  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    toast: 1700,
  },

  animations: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
  },
};
