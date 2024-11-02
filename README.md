# ![mind Logo](https://onecdn.io/media/6f5527be-1ff9-42cc-a321-b8e1738ca974/md2x)

Welcome to **mind**, a mobile app designed to elevate your mindfulness and self-improvement journey. Built with **React Native**, the app is targeted for both **iOS** and **Android** platforms, offering features like personal vision boards, diaries, and subscription management—all while prioritizing user privacy and personalization.

## 📖 Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Modifying the App](#modifying-the-app)
- [Deployment](#deployment)
- [Testing](#testing)
- [Additional Resources](#additional-resources)

## 🚀 Getting Started
To get started with mind, make sure you've completed the React Native environment setup. Follow the official [React Native setup guide](https://reactnative.dev/docs/environment-setup) until the "Creating a New Application" step.

## ✨ Features
- **Subscription Management**: Supports phone-payment options for convenient subscription handling. Payments can be managed directly via the App Store or Google Play settings.
- **Privacy-Focused Storage**: Personal images, such as vision boards and diary entries, are stored locally on the user's device for privacy and optimized memory usage.
- **REST API Communication**: Seamlessly integrates with the mind backend for data handling and content delivery.
- **User Roles**: Includes roles such as Administrator, Free User, Paid User, and Editor, each with specific access levels and features.
- **Interactive Diary**: Includes features like mood tracking, goal setting, and personalized content suggestions based on user activities and mood entries.
- **Gamified Tasks and Training Plans**: Offers level-based XP progression, affirmations, and personalized training plans for social, emotional, and mental well-being.
- **Multi-Level Categories**: Users can advance in various well-being categories (e.g., Gratitude, Emotional Intelligence) with corresponding content suggestions.
- **Offline Support**: Content is cached locally to ensure a seamless experience even in offline scenarios, similar to the YouTube experience for non-streaming features.

## 📦 Installation
To set up the project locally, follow these steps:

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/mind.git
cd mind
```

### Step 2: Install Dependencies
```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### Step 3: Install Pods (for iOS)
For iOS devices, you need to install the CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

## ▶️ Running the App

### Step 1: Start the Metro Server
First, you need to start **Metro**, the JavaScript bundler that ships with React Native:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start Your Application

#### For Android
Ensure you have an Android emulator running or a device connected, then run:
```bash
npm run android
```

#### For iOS
Ensure you have Xcode installed and configured properly, then run:
```bash
npm run ios
```

If all configurations are correct, your app should launch on your Android emulator, iOS simulator, or physical device.

## 🛠️ Modifying the App
You can modify the app as needed by editing the code in `App.tsx`. Here’s how to see your changes:

- **For Android**: Press `R` twice or select **Reload** from the Developer Menu (`Ctrl + M` on Windows/Linux or `Cmd ⌘ + M` on macOS).
- **For iOS**: Press `Cmd ⌘ + R` in the iOS Simulator to reload the app.

## 🏗️ Deployment

### Android
To submit the app to the **Google Play Store**, generate an Android App Bundle (`.aab`):

```bash
cd android
./gradlew bundleRelease
```
The generated `.aab` file will be found in `android/app/build/outputs/bundle/release`.

### iOS
For iOS deployment, ensure all dependencies are installed and configured. Archive the project using **Xcode** and submit it to App Store Connect.

## 🗂️ Folder Structure

|- android -> Android Bundle\
|- ios -> Apple IOS Package\
|-src\
&emsp;|- api -> Connection to Backend\
&emsp;|- assets -> static assets implemented in the app \
&emsp;|- components -> Frontend components used throughout the app\
&emsp;|- config -> Definitions of configs like enums\
&emsp;|- constants -> Definition of color-theme and static images\
&emsp;|- navigation\
&emsp;|- screens\
&emsp;|- state \
&emsp;|- styles\
|- rest of definition files (.env, package.json, app.json etc.)

## 🧪 Testing

- **iOS**: Utilize **TestFlight** for managing test groups and distributing pre-release versions.
- **Android**: Use Google Play's testing tracks (internal, closed, open testing) to test different versions before a public release.

## 📚 Additional Resources

- **[React Native Documentation](https://reactnative.dev/docs/getting-started)**: Learn the basics of React Native and set up your environment.
- **[React Navigation](https://reactnavigation.org/)**: Understand how navigation works in the app using React Navigation.
- **[REST API Documentation](#)**: The app communicates with the **mind Backend** via REST API. For more details, check the API documentation.
- **[Google Play & App Store Guidelines](#)**: Make sure your app complies with store requirements for a smooth submission process.

### Troubleshooting
If you encounter any issues while setting up or running the app, consult:

- **[React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)**
- Ensure system compatibility and that all required tools are set up properly as per the official React Native guide.

---
