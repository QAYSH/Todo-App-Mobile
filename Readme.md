# Todo App with Theme Switcher

A beautiful, responsive todo app with light/dark theme switching and real-time sync using Convex.

✨ Features
🎯 Core Functionality
✅ Full CRUD Operations - Create, read, update, and delete todos seamlessly

🎨 Pixel-Perfect Design - Meticulously crafted UI matching exact design specifications

🌙 Theme Switching - Beautiful light/dark modes with smooth transitions

⚡ Real-time Sync - Instant synchronization across all devices using Convex

📱 Responsive Design - Optimized for all screen sizes and devices

🚀 Advanced Features
🔍 Smart Filtering - Filter todos by All, Active, or Completed status

📝 Search Functionality - Quickly find specific tasks

🔄 Drag & Drop - Intuitive reordering optimized for mobile

💾 Persistent Storage - Theme preferences and todos saved locally

🎭 Custom Animations - Smooth interactions and transitions

🏗️ Architecture
text
ToDo-App/
├── convex/                 # Backend functions & database schema
│   ├── schema.ts          # Data model definitions
│   ├── todo.ts            # CRUD operations
│   └── _generated/        # Auto-generated types
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── TodoItem.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── SearchBar.tsx
│   ├── screens/           # App screens
│   │   └── TodoScreen.tsx
│   ├── theme/             # Theme system
│   │   ├── index.ts
│   │   ├── colors.ts
│   │   └── ThemeContext.tsx
│   └── types/             # TypeScript definitions
│       └── todo.ts
├── assets/                # Images, icons, and static files
└── App.tsx               # Application entry point
🚀 Quick Start
Prerequisites
Node.js 18.0 or higher

npm or yarn package manager

Expo Go app (for mobile testing)

Convex account (for backend services)

Installation & Setup
Clone and setup the project:

bash
git clone <your-repo-url>
cd ToDo-App
npm install
Configure Convex Backend:

bash
# Start Convex development server
npx convex dev

# Deploy to production
npx convex deploy
Environment Configuration:
Create a .env.local file in the root directory:

env
CONVEX_DEPLOYMENT=your-deployment-name
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
Start Development:

bash
# Web development
npm run web

# Or start with Expo
npx expo start
📱 Build & Deployment
Development Builds
bash
# Web development
npm run web

# Android development
npm run android

# iOS development (macOS only)
npm run ios
Production Builds
bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios

# Build for web deployment
expo build:web
APK Generation
bash
# Build Android APK
eas build --platform android --profile preview
🔧 Convex Backend Setup
Initial Configuration
Install Convex CLI globally:

bash
npm install -g convex
Login to Convex:

bash
npx convex login
Initialize Convex in your project:

bash
npx convex init
Development Workflow
bash
# Start local development server
npx convex dev

# Generate TypeScript types
npx convex codegen

# Deploy to production
npx convex deploy

# View deployment dashboard
npx convex dashboard
🎨 Theme System
The app features a comprehensive theme system with:

Light & Dark Modes - Automatic switching based on system preferences

Persistent Preferences - User selections saved across app sessions

Custom Colors - Tailored color schemes for different themes

Smooth Transitions - Animated theme changes for better UX

Theme Configuration
typescript
// Example theme configuration
export const lightTheme = {
  background: '#FFFFFF',
  surface: '#FAFAFA',
  primary: '#3F7EFE',
  textPrimary: '#2E2E2E',
  textSecondary: '#888888',
  border: '#E5E5E5'
};

export const darkTheme = {
  background: '#1A1A1A',
  surface: '#2D2D2D',
  primary: '#3F7EFE',
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#404040'
};
🧪 Testing
Run TypeScript Checks
bash
npx tsc --noEmit
Test on Different Platforms
bash
# Test on Android device/emulator
npx expo start --android

# Test on iOS simulator (macOS only)
npx expo start --ios

# Test in web browser
npx expo start --web

# Test with tunnel (for external devices)
npx expo start --tunnel
📊 Performance
Optimized Bundles - Efficient code splitting and tree shaking

Fast Refresh - Instant updates during development

Efficient Re-renders - Optimized React component structure

Real-time Performance - WebSocket-based updates with Convex

🔒 Quality Assurance
TypeScript - Full type safety across the application

ESLint - Code quality and consistency

Prettier - Consistent code formatting

Responsive Testing - Cross-platform compatibility checks

🌟 Best Practices Implemented
✅ Component reusability and composition

✅ Proper state management with React hooks

✅ Efficient rendering with memoization

✅ Accessibility compliance (WCAG guidelines)

✅ Error boundaries and graceful error handling

✅ Loading states and empty state handling

✅ Offline capability considerations

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a pull request

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

🆘 Support
Documentation: Expo Docs | Convex Docs

Issues: GitHub Issues

Discussion: GitHub Discussions

🙏 Acknowledgments
Expo for the amazing React Native platform

Convex for the real-time backend

React Navigation for smooth navigation

React Native Community for excellent libraries

<div align="center">
Built with ❤️ using React Native, Expo, and Convex

⬆ Back to Top

</div>