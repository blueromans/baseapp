# BaseApp - React Native Starter Template

A production-ready React Native boilerplate with authentication, navigation, state management, and modern UI components pre-configured. This boilerplate provides a solid foundation for building scalable React Native applications with best practices and commonly needed features already implemented.

## Why Use This Boilerplate?

This boilerplate saves weeks of development time by providing:

- **Pre-built Authentication Flow**: Skip the tedious auth setup with ready-to-use screens
- **Production-Ready Architecture**: Scalable folder structure following best practices
- **Modern State Management**: Redux Toolkit setup with persistence out of the box
- **Type Safety**: Full TypeScript configuration with strict type checking
- **Performance Optimized**: FlashList, Reanimated, and MMKV for blazing fast performance
- **Developer Experience**: ESLint, Prettier, and Husky pre-configured
- **Cross-Platform Ready**: Tested on both iOS and Android devices

## Features

- **Authentication Flow**: Ready-to-use SignIn/SignUp screens with form validation
- **Navigation**: Tab navigation with nested stack navigators using React Navigation
- **State Management**: Redux Toolkit with Redux Persist for offline storage
- **Internationalization**: i18next integration for multi-language support
- **Storage**: MMKV for high-performance local storage
- **UI Components**:
  - Reusable templates (ListTemplate, HeaderTemplate)
  - Theme support with light/dark mode
  - Keyboard-aware scroll views
  - High-performance lists with FlashList
- **Developer Experience**:
  - TypeScript configured
  - ESLint and Prettier setup
  - Husky git hooks for code quality
  - Import sorting automation

## Tech Stack

- React Native 0.81.4
- React Navigation v7
- Redux Toolkit & Redux Persist
- React Native Reanimated v4
- React Native Skia for graphics
- MMKV for storage
- i18next for internationalization
- TypeScript

## What's Included in the Boilerplate

### Pre-built Screens

- **SignIn Screen**: Email/password authentication with validation
- **SignUp Screen**: User registration with form validation
- **Tab Screens (4)**: Example screens demonstrating different UI patterns
  - Tab1: Basic content screen
  - Tab2: List with pull-to-refresh using FlashList
  - Tab3: Form inputs and keyboard handling
  - Tab4: Settings and preferences

### UI Components Library

- **Atoms**: Button, Text, TextInput, Icon, Spacer
- **Molecules**: Card, Header, ListItem, LoadingIndicator
- **Templates**: HeaderTemplate, ListTemplate for consistent layouts

### Configured Libraries

- **Navigation**: Tab navigation with nested stacks
- **State Management**: Redux slices for auth, user, and app state
- **Storage**: MMKV for encrypted local storage
- **Animations**: Reanimated for smooth 60fps animations
- **Graphics**: Skia for advanced graphics rendering
- **Forms**: Keyboard-aware scroll view for better UX
- **Lists**: FlashList for high-performance lists

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── atoms/       # Basic building blocks
│   ├── molecules/   # Composite components
│   └── templates/   # Page templates
├── config/          # App configuration
│   ├── api.config.ts    # API endpoints
│   └── app.config.ts    # App settings
├── constants/       # App constants
├── hooks/           # Custom React hooks
│   ├── useTheme.ts      # Theme hook
│   └── useStorage.ts    # Storage hook
├── i18n/           # Internationalization
│   └── locales/         # Translation files
├── navigation/      # Navigation configuration
│   ├── navigators/      # Stack, Tab, Auth navigators
│   └── types.ts         # Navigation types
├── screens/        # Screen components
│   ├── auth/       # Authentication screens
│   └── main/       # Main app screens
├── services/       # API and external services
│   └── api/            # API client setup
├── store/          # Redux store configuration
│   ├── slices/         # Redux slices
│   └── index.ts        # Store configuration
├── themes/         # Theme definitions
│   ├── colors.ts       # Color palette
│   ├── fonts.ts        # Typography
│   └── spacing.ts      # Spacing system
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
    ├── storage.ts      # Storage utilities
    └── validation.ts   # Form validation
```

## Quick Start Guide

### Using This Boilerplate

1. **Clone and rename your project:**

```bash
git clone <repository-url> MyAwesomeApp
cd MyAwesomeApp
```

2. **Update project name:**

- Change `name` in `package.json`
- Update app name in `app.json`
- For iOS: Update display name in `ios/BaseApp/Info.plist`
- For Android: Update app name in `android/app/src/main/res/values/strings.xml`

3. **Install and run:**

```bash
npm install
cd ios && pod install && cd ..
npm run ios # or npm run android
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Xcode 15+ (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd BaseApp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (macOS only):

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Running the App

### Start Metro Bundler

```bash
npm start
# or
yarn start
```

### Run on iOS

```bash
npm run ios
# or
yarn ios
```

### Run on Android

```bash
npm run android
# or
yarn android
```

## Available Scripts

```bash
npm run start          # Start Metro bundler
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run test          # Run tests
npm run sort-imports  # Sort imports in TypeScript files
```

## Development Workflow

### Adding New Screens

1. Create your screen component in `src/screens/`
2. Add navigation types in `src/navigation/types.ts`
3. Register screen in appropriate navigator

### State Management

The app uses Redux Toolkit with the following structure:

- Store configuration in `src/store/`
- Create slices for different features
- Use Redux Persist for data persistence

### Theming

- Theme definitions in `src/themes/`
- Light and dark mode support
- Access theme via `useTheme()` hook

### Internationalization

- Translation files in `src/i18n/locales/`
- Use `useTranslation()` hook for translations
- Language switching support built-in

### Component Architecture

The project follows Atomic Design principles:

- **Atoms**: Basic building blocks (Button, Text, Input)
- **Molecules**: Composite components (Card, ListItem)
- **Templates**: Page layouts (ListTemplate, HeaderTemplate)
- **Screens**: Complete application screens

### Boilerplate Scripts

The boilerplate includes helpful scripts in the `scripts/` directory:

- **sort-imports.cjs**: Automatically organizes imports
- **init.sh**: Initial setup script for new projects

## Code Quality

### Pre-commit Hooks

The project uses Husky to run checks before commits:

- Linting with ESLint
- Code formatting with Prettier
- Import sorting

## Troubleshooting

### Common Issues

1. **iOS Build Fails**: Make sure you've run `pod install` in the `ios` directory
2. **Metro Bundler Issues**: Clear cache with `npx react-native start --reset-cache`
3. **Android Build Issues**: Clean build with `cd android && ./gradlew clean`
4. **Module Resolution**: Delete `node_modules` and reinstall

### Development Tips

- Use Fast Refresh for instant updates (enabled by default)
- Press `R` twice on Android or `Cmd+R` on iOS simulator to reload
- Use React Native Debugger for advanced debugging

For more detailed troubleshooting, see the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Customization Guide

### Changing Theme Colors

Edit `src/themes/colors.ts` to customize your app's color palette:

```typescript
export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  // Add your custom colors
};
```

### Adding New Screens

1. Create screen in `src/screens/your-feature/`
2. Add to navigation in `src/navigation/navigators/`
3. Update types in `src/navigation/types.ts`

### Configuring API Endpoints

Update `src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-api.com',
  TIMEOUT: 10000,
};
```

### Adding Redux Slices

1. Create slice in `src/store/slices/`
2. Add to root reducer in `src/store/index.ts`
3. Use with `useSelector` and `useDispatch` hooks

## Performance Optimization Tips

- Use `FlashList` instead of `FlatList` for large lists
- Implement lazy loading for heavy screens
- Use `React.memo` for expensive components
- Enable Hermes for Android (already configured)
- Use MMKV for storage instead of AsyncStorage

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [FlashList](https://shopify.github.io/flash-list/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Skia](https://shopify.github.io/react-native-skia/)

## Boilerplate Maintenance

This boilerplate is actively maintained. To update to the latest versions:

```bash
npm update
cd ios && pod update && cd ..
```

## Support

For issues and feature requests, please use the GitHub issue tracker.

## Credits

Built with ❤️ using React Native and the amazing open-source community.
