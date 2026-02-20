# Untilla

Beautiful event countdown app for iOS and Android.

Create countdowns to birthdays, vacations, holidays and any events that matter. See remaining time as elegant visual cards, and add widgets to your Home Screen and Lock Screen.

## Tech Stack

- React Native 0.84 (New Architecture)
- TypeScript
- React 19

## Requirements

- Node.js >= 22.11.0
- iOS 16+ / Android 7.0+
- Xcode (for iOS builds)
- Android Studio (for Android builds)

## Getting Started

```sh
npm install
npm start
```

### Android

```sh
npm run android
```

### iOS

```sh
bundle install
bundle exec pod install
npm run ios
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Build & run on Android |
| `npm run ios` | Build & run on iOS |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |

## Project Structure

```
src/
├── screens/        # Screen components
├── components/     # Reusable UI components
├── hooks/          # Custom hooks
├── theme/          # Theme definitions and tokens
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── services/       # API and data services
├── store/          # State management
├── assets/         # Images, fonts, icons
└── navigation/     # Navigation configuration
```

## License

Proprietary. All rights reserved.
