# Block Component

## Overview
The Block component is the foundational building block for all UI components in this React Native application. It extends React Native's View with theme-aware props and enhanced functionality.

## Architecture

```
Block/
├── Block.tsx                 # Main export file
├── Block.container.tsx       # Container logic and composition
├── Block.types.ts           # TypeScript definitions
├── components/              # Component variants
│   ├── BaseBlock.tsx       # Base implementation
│   ├── ScrollBlock.tsx     # Scrollable variant
│   ├── KeyboardBlock.tsx   # Keyboard-aware variant
│   └── TouchableBlock.tsx  # Touchable variant
├── hooks/                   # Custom hooks
│   ├── useBlockStyles.ts   # Style computation hook
│   └── useBlockProps.ts    # Props extraction hook
├── utils/                   # Utility functions
│   ├── Block.styles.ts     # Style builders
│   ├── Block.colors.ts     # Color resolvers
│   ├── Block.presets.ts    # Preset styles
│   └── Block.props.ts      # Prop extractors
├── constants/               # Configuration constants
│   └── Block.constants.ts  # Shared constants
└── README.md               # This file
```

## Usage

### Basic Usage
```tsx
import { Block } from '@/components/atoms/Block';

<Block flex row center padding={16}>
  <Text>Content</Text>
</Block>
```

### Container Types
```tsx
// Scrollable container
<Block scroll contentContainerStyle={{ padding: 16 }}>
  {/* Long content */}
</Block>

// Keyboard-aware container
<Block keyboard>
  <TextInput />
</Block>

// Touchable container
<Block onPress={handlePress}>
  <Text>Press me</Text>
</Block>
```

### Styling Props
```tsx
// Layout
<Block flex={1} row center justify="space-between" align="center">

// Spacing
<Block padding={16} margin={8} paddingHorizontal={20}>

// Visual
<Block color="#fff" radius={8} shadow card outlined>

// Dimensions
<Block width={200} height={100} fullWidth fullHeight>

// Position
<Block position="absolute" top={0} left={0}>
```

## Performance Considerations

1. **Memoization**: All style computations are memoized using `useMemo`
2. **Component Memoization**: Block is wrapped with `React.memo`
3. **Prop Extraction**: View props are extracted efficiently to prevent unnecessary re-renders
4. **Style Flattening**: Styles are flattened once during computation

## Testing

```tsx
describe('Block Component', () => {
  it('should render with theme props', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Block testID="test-block" flex padding={16} />
      </ThemeProvider>
    );

    const block = getByTestId('test-block');
    expect(block).toBeDefined();
  });
});
```

## Migration Guide

If you're migrating from the old structure:

1. Update imports:
```tsx
// Old
import { Block } from './type';

// New
import { Block } from '@/components/atoms/Block';
import type { IBlockProps } from '@/components/atoms/Block';
```

2. Type imports are now more specific:
```tsx
import type {
  IBlockProps,
  IBlockStyleProps,
  IBlockBehaviorProps,
  BlockComputedStyles
} from '@/components/atoms/Block';
```

## Contributing

When adding new features:

1. Add types to `Block.types.ts`
2. Add utility functions to appropriate `utils/Block.*.ts` files
3. Update hooks if needed
4. Add constants to `Block.constants.ts`
5. Update this README

## Performance Tips

- Use `flex` prop instead of `style={{ flex: 1 }}`
- Use theme color keys instead of hex values
- Prefer Block's built-in props over inline styles
- Use memoization for complex children components