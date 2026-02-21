# Untilla

Beautiful event countdown app for iOS and Android.

Create countdowns to birthdays, vacations, holidays and any events that matter. See remaining time as elegant visual cards, and add widgets to your Home Screen and Lock Screen.

## Tech Stack

- React Native 0.84 (New Architecture)
- TypeScript
- React 19
- Yarn

## Requirements

- Node.js >= 22.11.0
- Yarn
- iOS 16+ / Android 7.0+
- Xcode (for iOS builds)
- Android Studio (for Android builds)

## Getting Started

```sh
yarn install
yarn start
```

### Android

```sh
yarn android
```

### iOS

```sh
bundle install
bundle exec pod install
yarn ios
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start Metro bundler |
| `yarn android` | Build & run on Android |
| `yarn ios` | Build & run on iOS |
| `yarn lint` | Run ESLint |
| `yarn test` | Run tests |

## Project Structure

```
src/
├── app/            # Root App component, providers
├── screens/        # Screen components (folder per screen)
├── components/     # Reusable UI components (folder per component)
├── hooks/          # Custom hooks
├── theme/          # Theme definitions and design tokens
├── locales/        # Translation files (en.json, ru.json)
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── services/       # Storage, notifications, widget bridge
├── store/          # State management (Zustand)
├── assets/         # Images, fonts, icons
└── navigation/     # Navigation configuration
```

## License

Proprietary. All rights reserved.
