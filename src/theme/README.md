# Theme System Documentation

## 📁 Structure

```
theme/
├── context/          # Theme context and provider
├── themes/          # Theme definitions (light/dark)
├── types/           # TypeScript definitions
├── tokens/          # Design tokens (colors, etc.)
├── hooks/           # Custom theme hooks
├── utils/           # Utility functions
├── migration/       # Backward compatibility
└── ThemeProvider/   # Legacy provider location (deprecated)
```

## 🎨 Features

### 1. **Semantic Design Tokens**

- **Colors**: Background, text, brand, status, interactive, border, surface
- **Spacing**: Scale (0-24) + semantic (xs-3xl)
- **Typography**: Variants (h1-h6, body, button, etc.)
- **Shadows**: Multiple elevation levels
- **Border Radii**: Consistent corner radius system

### 2. **Performance Optimized**

- Context with refs to minimize re-renders
- Memoized theme computations
- Granular hooks for specific properties
- Lazy theme switching

### 3. **Type Safety**

- Full TypeScript coverage
- Strict type definitions
- IntelliSense support

### 4. **Responsive Design**

- Breakpoint system (xs, sm, md, lg, xl, 2xl)
- Responsive value hooks
- Device detection utilities

## 🚀 Usage

### Basic Theme Access

```tsx
import { useTheme } from '@/theme';

const Component = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background.primary }}>
      <Text style={{ color: theme.colors.text.primary }}>Hello World</Text>
    </View>
  );
};
```

### Optimized Property Access

```tsx
import { useThemeColors, useThemeSpacing } from '@/theme';

const Component = () => {
  const colors = useThemeColors();
  const spacing = useThemeSpacing();

  return (
    <View
      style={{
        backgroundColor: colors.surface.card,
        padding: spacing.semantic.md,
      }}
    >
      {/* content */}
    </View>
  );
};
```

### Responsive Values

```tsx
import { useResponsive } from '@/theme';

const Component = () => {
  const padding = useResponsive({
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  });

  return <View style={{ padding }} />;
};
```

### Themed Styles

```tsx
import { useThemeStyles } from '@/theme';

const Component = () => {
  const styles = useThemeStyles(theme => ({
    container: {
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing.semantic.lg,
      borderRadius: theme.borderRadii.lg,
      ...theme.shadows.md,
    },
    text: {
      ...theme.typography.variants.h3,
      color: theme.colors.text.primary,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Themed Component</Text>
    </View>
  );
};
```

### Color Manipulation

```tsx
import { withOpacity, lighten, darken } from '@/theme';

const Component = () => {
  const { theme } = useTheme();

  const overlayColor = withOpacity(theme.colors.background.primary, 0.8);
  const lightColor = lighten(theme.colors.brand.primary, 0.2);
  const darkColor = darken(theme.colors.brand.primary, 0.2);

  return <View />;
};
```

## 🔄 Migration from Old System

### For Existing Components

```tsx
// Old way
import { useTheme } from '@/theme';
const { colors, sizes } = useTheme();

// New way (recommended)
import { useTheme } from '@/theme';
const { theme } = useTheme();
// Access: theme.colors.text.primary instead of colors.text
```

## 📝 Theme Structure

### Colors

```typescript
colors: {
  background: { primary, secondary, tertiary, elevated, overlay },
  text: { primary, secondary, tertiary, disabled, inverse, link },
  brand: { primary, secondary, tertiary },
  status: { success, warning, error, info },
  interactive: { default, hover, pressed, disabled, focus },
  border: { default, subtle, strong, focus },
  surface: { card, modal, sheet },
  shadow: { default, strong },
  palette: { gray, red, green, blue, yellow, purple } // 50-900 scales
}
```

### Spacing

```typescript
spacing: {
  scale: { 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 },
  semantic: { none, xs, sm, md, lg, xl, '2xl', '3xl' },
  components: { button, card, input, list, modal },
  layout: { containerPadding, sectionGap, elementGap }
}
```

### Typography

```typescript
typography: {
  fontFamilies: { regular, medium, semibold, bold, ... },
  fontSizes: { xs, sm, md, lg, xl, '2xl', ... '9xl' },
  lineHeights: { none, tight, snug, normal, relaxed, loose },
  letterSpacing: { tighter, tight, normal, wide, wider, widest },
  fontWeights: { thin, light, normal, medium, semibold, bold, ... },
  variants: { h1, h2, h3, h4, h5, h6, body1, body2, button, ... }
}
```

## ⚠️ Important Notes

1. **Performance**: Use specific hooks (useThemeColors, useThemeSpacing) instead of full useTheme when possible
2. **TypeScript**: All theme properties are fully typed - use IntelliSense for discovery
3. **Customization**: Themes can be extended by modifying files in `/themes/`

## 🔧 Maintenance

- **Add new colors**: Edit `/tokens/colors.ts` for palette, `/themes/*.ts` for semantic tokens
- **Adjust spacing**: Modify spacing scales in `/themes/*.ts`
- **Create new theme**: Duplicate `/themes/light.ts`, modify values, import in `/index.ts`
- **Add utilities**: Create new functions in `/utils/` or hooks in `/hooks/`
