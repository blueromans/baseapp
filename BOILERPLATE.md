# React Native Base App Boilerplate

A production-ready React Native boilerplate with TypeScript, Redux Toolkit, Navigation, and a complete development setup.

## 🎯 Features

- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management with modern Redux
- **React Navigation** - Stack, Tab, and Native Stack navigators
- **i18n** - Multi-language support (EN, TR)
- **Theming** - Light/Dark theme support with dynamic switching
- **Authentication Flow** - Sign In/Sign Up screens with navigation guards
- **API Integration** - RTK Query setup with base configuration
- **MMKV Storage** - Fast, encrypted key-value storage
- **Atomic Design** - Component organization (atoms, molecules, organisms, templates)
- **Code Quality** - ESLint, Prettier, Husky pre-commit hooks
- **Performance** - FlashList, React Native Reanimated

## 🚀 Quick Start

### Option 1: Use as Template (Recommended)

1. **Clone this repository as your boilerplate:**
```bash
git clone https://github.com/your-username/base-app.git my-boilerplate
cd my-boilerplate
```

2. **Create a new project from the boilerplate:**
```bash
./.boilerplate/use-boilerplate.sh
```

3. **Follow the interactive prompts to configure your project**

### Option 2: Manual Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/base-app.git my-new-app
cd my-new-app
```

2. **Run the initialization script:**
```bash
node .boilerplate/init.js
```

3. **Answer the configuration questions:**
- Project name
- Display name
- iOS Bundle ID
- Android Bundle ID

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── atoms/          # Basic components (Button, Text, etc.)
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex components
│   └── templates/      # Page templates
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   └── main/          # Main app screens
├── navigation/         # Navigation configuration
├── store/             # Redux store
│   ├── api/          # RTK Query API
│   └── auth/         # Auth slice
├── theme/             # Theming system
│   ├── themes/       # Light/Dark themes
│   ├── tokens/       # Design tokens
│   └── utils/        # Theme utilities
├── i18n/              # Internationalization
├── utils/             # Helper functions
├── types/             # TypeScript types
├── constants/         # App constants
└── config/            # App configuration
```

## 🛠️ Customization

### Updating Project Details

After initialization, you may need to update:

1. **iOS Bundle ID:**
   - Open `ios/YourApp.xcworkspace` in Xcode
   - Select your project in the navigator
   - Update Bundle Identifier in the General tab

2. **Android Package Name:**
   - Update `applicationId` in `android/app/build.gradle`
   - Refactor package structure in `android/app/src/main/java/`

3. **App Icons:**
   - iOS: Replace images in `ios/YourApp/Images.xcassets/AppIcon.appiconset/`
   - Android: Replace images in `android/app/src/main/res/mipmap-*/`

4. **Splash Screen:**
   - iOS: Configure in `ios/YourApp/LaunchScreen.storyboard`
   - Android: Update `android/app/src/main/res/layout/launch_screen.xml`

### Environment Variables

Create `.env` files for different environments:

```bash
# .env.development
API_URL=https://dev.api.example.com
```

```bash
# .env.production
API_URL=https://api.example.com
```

### Theme Customization

Edit theme files in `src/theme/themes/`:

```typescript
// src/theme/themes/light.ts
export const lightTheme = {
  colors: {
    primary: '#007AFF',
    // ... your colors
  },
  // ... other theme properties
};
```

### Adding New Features

1. **New Screen:**
```bash
# Create new screen file
src/screens/main/NewScreen.tsx

# Add to navigation
src/navigation/types.ts
src/navigation/stacks/MainStack.tsx
```

2. **New Component:**
```bash
# Follow atomic design principles
src/components/atoms/NewComponent/
├── NewComponent.tsx
├── NewComponent.types.ts
└── index.ts
```

3. **New Redux Slice:**
```bash
# Create slice
src/store/newFeature/newFeatureSlice.ts

# Add to store
src/store/configureStore.ts
```

## 📱 Running the Project

### iOS

```bash
cd ios && pod install
cd ..
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

### Metro Bundler

```bash
npx react-native start
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 📝 Scripts

- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm start` - Start Metro bundler
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run sort-imports` - Sort imports

## 🔧 Boilerplate Configuration

The `.boilerplate/` directory contains:

- `config.json` - Boilerplate configuration
- `init.js` - Node.js initialization script
- `use-boilerplate.sh` - Shell script for creating new projects
- `templates/` - Template files with placeholders

### Template Variables

The following variables are replaced during initialization:

- `{{PROJECT_NAME}}` - Project name (package.json name)
- `{{PROJECT_DISPLAY_NAME}}` - Display name (shown on device)
- `{{BUNDLE_ID_IOS}}` - iOS bundle identifier
- `{{BUNDLE_ID_ANDROID}}` - Android package name

## 🤝 Contributing

To improve this boilerplate:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 🙏 Acknowledgments

Built with:
- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- And many other amazing open-source libraries

---

**Happy Coding! 🚀**