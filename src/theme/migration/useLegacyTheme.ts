// Global Types
import { ITheme } from '@/types/interfaces/theme';

// Local Components and Hooks
import { useTheme } from '../context/ThemeContext';

export const useLegacyTheme = (): ITheme => {
  const { theme } = useTheme();

  // Map new theme structure to old ITheme interface
  return {
    isDark: theme.isDark,
    colors: {
      text: theme.colors.text.primary,
      primary: theme.colors.brand.primary,
      secondary: theme.colors.brand.secondary,
      tertiary: theme.colors.brand.tertiary,
      black: theme.colors.palette.black,
      white: theme.colors.palette.white,
      dark: theme.isDark
        ? theme.colors.background.primary
        : theme.colors.palette.gray[900],
      light: theme.isDark
        ? theme.colors.palette.gray[100]
        : theme.colors.background.secondary,
      gray: theme.colors.palette.gray[500],
      lightGray: theme.colors.palette.gray[300],
      danger: theme.colors.status.error,
      warning: theme.colors.status.warning,
      success: theme.colors.status.success,
      info: theme.colors.status.info,
      card: theme.colors.surface.card,
      background: theme.colors.background.primary,
      shadow: theme.colors.shadow.default,
      overlay: theme.colors.background.overlay,
      focus: theme.colors.interactive.focus,
      input: theme.colors.surface.card,
      switchOn: theme.colors.status.success,
      switchOff: theme.colors.palette.gray[400],
      inputFocused: theme.colors.border.focus,
      inputUnFocused: theme.colors.border.default,
      checkbox: [
        theme.colors.brand.primary,
        theme.colors.background.secondary,
        theme.colors.palette.gray[400],
      ],
      checkboxIcon: theme.colors.text.inverse,
      icon: theme.isDark
        ? theme.colors.text.primary
        : theme.colors.palette.gray[800],
      blurTint: theme.isDark ? 'dark' : 'light',
      link: theme.colors.text.link,
      button: theme.colors.brand.primary,
    },
    sizes: {
      // Map spacing
      base: theme.spacing.semantic.sm,
      text: theme.typography.fontSizes.md,
      radius: theme.borderRadii.md,
      padding: theme.spacing.semantic.lg,

      // Typography
      h1: theme.typography.fontSizes['6xl'],
      h2: theme.typography.fontSizes['5xl'],
      h3: theme.typography.fontSizes['4xl'],
      h4: theme.typography.fontSizes['3xl'],
      h5: theme.typography.fontSizes.xl,
      p: theme.typography.fontSizes.md,

      // Components
      buttonBorder: 1,
      buttonRadius: theme.borderRadii.button,
      iconSize: theme.spacing.scale[8],

      inputHeight: theme.spacing.scale[10],
      inputBorder: 0.5,
      inputRadius: theme.borderRadii.input,
      inputPadding: theme.spacing.components.input.paddingX,

      cardRadius: theme.borderRadii.card,
      cardPadding: theme.spacing.components.card.padding,

      imageRadius: theme.borderRadii.lg,
      avatarSize: theme.spacing.scale[8],
      avatarRadius: theme.borderRadii.avatar,

      switchWidth: theme.spacing.scale[12],
      switchHeight: theme.spacing.scale[8],
      switchThumb: theme.spacing.scale[6],

      checkboxWidth: theme.spacing.scale[5],
      checkboxHeight: theme.spacing.scale[5],
      checkboxRadius: theme.borderRadii.sm,
      checkboxIconWidth: theme.spacing.scale[5],
      checkboxIconHeight: theme.spacing.scale[5],

      linkSize: theme.typography.fontSizes.sm,

      // Shadow properties
      shadowOffsetWidth: 0,
      shadowOffsetHeight: theme.shadows.md.shadowOffset?.height || 2,
      shadowOpacity: theme.shadows.md.shadowOpacity || 0.15,
      shadowRadius: theme.shadows.md.shadowRadius || 3,

      multiplier: 2,

      // Include spacing - map to old ThemeSpacing interface
      width: 0,
      height: 0,
      xs: theme.spacing.semantic.xs,
      s: theme.spacing.semantic.sm,
      sm: theme.spacing.semantic.sm,
      m: theme.spacing.semantic.md,
      md: theme.spacing.semantic.md,
      l: theme.spacing.semantic.lg,
      xl: theme.spacing.semantic.xl,
      xxl: theme.spacing.semantic['2xl'],
    },
    fonts: theme.typography.fontFamilies,
    weights: theme.typography.fontWeights,
    lines: theme.typography.lineHeights,
  } as unknown as ITheme;
};
