# Components - Atomic Design System

This project follows **Atomic Design** methodology for component organization.

## 📁 Structure

```
components/
├── atoms/          # Basic building blocks
├── molecules/      # Simple components from atoms
├── organisms/      # Complex components from molecules/atoms
├── templates/      # Page layouts
└── pages/          # Complete screens (in screens/ folder)
```

## 🧩 Component Hierarchy

### 1. **Atoms** - Basic Building Blocks
Smallest functional components that can't be broken down further.

**Example: Block**
```tsx
import { Block } from '@/components/atoms/Block';

<Block flex padding={16} bg="primary">
  {children}
</Block>
```

### 2. **Molecules** - Simple Components
Relatively simple groups of atoms functioning together as a unit.

**Example: Card**
```tsx
import { Card } from '@/components/molecules';

<Card
  title="Product Name"
  subtitle="Description"
  onPress={handlePress}
  variant="elevated"
/>
```

**Example: ListItem**
```tsx
import { ListItem } from '@/components/molecules';

<ListItem
  title="Settings"
  subtitle="Manage your preferences"
  leftIcon={<Icon />}
  onPress={navigateToSettings}
/>
```

**Example: SearchBar**
```tsx
import { SearchBar } from '@/components/molecules';

<SearchBar
  value={query}
  onChangeText={setQuery}
  onSearch={handleSearch}
  placeholder="Search products..."
/>
```

### 3. **Organisms** - Complex Components
Relatively complex components composed of molecules and/or atoms.

**Example: Header**
```tsx
import { Header } from '@/components/organisms';

<Header
  title="Home"
  leftAction={{ text: '‹', onPress: goBack }}
  rightAction={{ icon: <MenuIcon />, onPress: openMenu }}
/>
```

**Example: ProductList**
```tsx
import { ProductList } from '@/components/organisms';

<ProductList
  products={products}
  layout="grid"
  onProductPress={handleProductPress}
  onEndReached={loadMore}
/>
```

**Example: TabBar**
```tsx
import { TabBar } from '@/components/organisms';

<TabBar
  tabs={[
    { key: 'home', label: 'Home', icon: <HomeIcon /> },
    { key: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  ]}
  activeTab={activeTab}
  onTabPress={setActiveTab}
/>
```

### 4. **Templates** - Page Layouts
Page-level components that define the layout but don't contain data.

**Example: AuthTemplate**
```tsx
import { AuthTemplate } from '@/components/templates';

<AuthTemplate
  headerTitle="Sign In"
  showBackButton
  scrollable
>
  <LoginForm />
</AuthTemplate>
```

**Example: ListTemplate**
```tsx
import { ListTemplate } from '@/components/templates';

<ListTemplate
  headerTitle="Products"
  showSearch
  data={products}
  renderItem={(item) => <ProductCard {...item} />}
  keyExtractor={(item) => item.id}
  onRefresh={refresh}
/>
```

**Example: DetailTemplate**
```tsx
import { DetailTemplate } from '@/components/templates';

<DetailTemplate
  heroImage={product.image}
  title={product.name}
  subtitle={product.description}
  actions={[
    { label: 'Buy Now', onPress: handleBuy },
    { label: 'Add to Cart', onPress: handleAddToCart, variant: 'secondary' },
  ]}
>
  <ProductDetails />
</DetailTemplate>
```

## 🎯 Best Practices

### 1. **Component Naming**
- Use PascalCase for components
- Prefix interfaces with 'I' (e.g., `IBlockProps`)
- Use descriptive names that indicate purpose

### 2. **File Organization**
```
ComponentName/
├── ComponentName.tsx      # Main component
├── ComponentName.types.ts # TypeScript interfaces
├── ComponentName.utils.ts # Utility functions
├── ComponentName.test.tsx # Tests
└── index.ts              # Public exports
```

### 3. **Performance**
- Always use `React.memo` for components
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Implement proper `keyExtractor` for lists

### 4. **TypeScript**
- Define interfaces for all props
- Export types from index files
- Use strict typing (no `any`)
- Document complex types

### 5. **Composition Rules**
- **Atoms** should not import molecules/organisms
- **Molecules** can import atoms
- **Organisms** can import atoms and molecules
- **Templates** can import any component type
- **Pages** use templates and can override with any component

## 📊 Component Decision Tree

```
Need a component?
│
├─ Is it indivisible? → **Atom**
│  └─ Examples: Button, Input, Icon
│
├─ Is it a simple group? → **Molecule**
│  └─ Examples: Card, ListItem, SearchBar
│
├─ Is it complex/sectioned? → **Organism**
│  └─ Examples: Header, Navigation, Form
│
└─ Is it a layout? → **Template**
   └─ Examples: AuthTemplate, DashboardTemplate
```

## 🚀 Creating New Components

### 1. Identify the level (atom/molecule/organism/template)
### 2. Create folder structure
### 3. Implement with TypeScript
### 4. Add performance optimizations
### 5. Export from category index
### 6. Document usage

## 📱 Usage Example - Complete Screen

```tsx
import React from 'react';
import { ListTemplate } from '@/components/templates';
import { Card } from '@/components/molecules';
import { useProducts } from '@/hooks';

const ProductsScreen = () => {
  const { products, loading, refresh } = useProducts();

  return (
    <ListTemplate
      headerTitle="Our Products"
      showSearch
      showTabBar
      tabs={productTabs}
      data={products}
      renderItem={(product) => (
        <Card
          title={product.name}
          subtitle={`$${product.price}`}
          onPress={() => navigateToProduct(product)}
        />
      )}
      keyExtractor={(item) => item.id}
      refreshing={loading}
      onRefresh={refresh}
    />
  );
};
```

This structure ensures:
- ✅ Consistent component architecture
- ✅ Reusable components
- ✅ Clear separation of concerns
- ✅ Easy maintenance
- ✅ Scalable codebase