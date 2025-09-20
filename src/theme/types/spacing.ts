// Spacing scale using t-shirt sizes and numeric values
export interface SpacingScale {
  0: number; // 0
  1: number; // 4
  2: number; // 8
  3: number; // 12
  4: number; // 16
  5: number; // 20
  6: number; // 24
  8: number; // 32
  10: number; // 40
  12: number; // 48
  16: number; // 64
  20: number; // 80
  24: number; // 96
}

// Semantic spacing tokens
export interface SemanticSpacing {
  none: number;
  xs: number; // extra small
  sm: number; // small
  md: number; // medium
  lg: number; // large
  xl: number; // extra large
  '2xl': number; // 2x large
  '3xl': number; // 3x large
}

export interface ThemeSpacing {
  scale: SpacingScale;
  semantic: SemanticSpacing;

  // Component-specific spacing
  components: {
    button: {
      paddingX: number;
      paddingY: number;
      gap: number;
    };
    card: {
      padding: number;
      gap: number;
    };
    input: {
      paddingX: number;
      paddingY: number;
    };
    list: {
      itemGap: number;
      sectionGap: number;
    };
    modal: {
      padding: number;
      gap: number;
    };
  };

  // Layout spacing
  layout: {
    containerPadding: number;
    sectionGap: number;
    elementGap: number;
  };
}
