Kasi Mashesha App

Kasi Mashesha is a React Native mobile application built with TypeScript and Expo Router, designed for local business and fast-food delivery. The app connects users with local restaurants and vendors, allowing them to browse menus, place orders, and manage their personal profiles with ease.

The app emphasizes fast, intuitive interactions, mobile-friendly design, and a personal user experience.

Features

User Authentication: Login and registration flow for customers.

Profile Management: Edit personal details and update profile picture.

Top-Right Avatar: Always visible for quick access to the profile.

Order Placement: Browse local vendors and fast-food menus (planned for next versions).

Save & Logout: Easily save profile changes and log out securely.

Mobile-Optimized: Designed for smooth performance on mobile devices.

Safe Permissions: Handles image picker permissions correctly on mobile; fallback for web.

Screens

Login / Registration Screen

Authenticate users and redirect to Profile or Home screen

Profile Screen

Edit personal details: name, email, phone number, address

Update profile photo (tap avatar)

Save changes and logout

Main Menu / Home Screen (future)

Browse local restaurants and fast food

Place orders for delivery

Technologies

React Native – Mobile app framework

TypeScript – Strongly typed JavaScript for better code quality

Expo – Managed workflow for rapid development and testing

Expo Router – Navigation and routing between screens

Expo Image Picker – Upload and edit profile pictures

Installation

Clone the repository:

git clone <your-repo-url>
cd kasi-mashesha


Install dependencies:

npm install


Start the Expo server:

npx expo start


Open the app on a mobile device using Expo Go, or in an emulator.

Usage

Open the app and login or register.

Access the Profile screen:

Tap the top-right avatar or main profile image to update your photo.

Edit personal details: name, email, phone, address.

Tap SAVE CHANGES to save updates.

Tap LOGOUT to return to login.

Future screens will allow users to browse menus and place orders.

⚠️ On web, the image picker shows an alert because photo selection requires a mobile device.

Folder Structure
Kasi-Mashesha/
├─ components/
│  └─ AppScreenWrapper.tsx      # Optional future global header with avatar
├─ screens/
│  ├─ Profile.tsx               # Profile screen
│  ├─ Login.tsx                 # Login screen
│  └─ Register.tsx              # Registration screen
├─ assets/                      # Images, logos, icons
├─ App.tsx                      # Entry point
├─ package.json
└─ README.md

🚚 Delivery Logic & Driver Coordination

​Responsibility: Handling real-time delivery data, location tracking, and driver-customer communication.
​This module manages the critical "last mile" of the delivery process. It ensures that the driver has the correct coordinates and instructions, and prevents accidental order completion through a verification workflow.

​Key Features
​Geospatial Visualization: Integrated react-native-maps to render the driver's current position and the customer's drop-off point in real-time.
​Customer-to-Driver Instructions: A dedicated communication bridge allowing users to provide specific delivery notes (e.g., gate codes, "don't ring bell") which are stored in the delivery state.

​Action Verification Workflow: Implemented a two-step "Ask Before Finalizing" logic using native Alert controllers to ensure delivery status is only updated after explicit driver confirmation.
​Responsive Input Handling: Utilized KeyboardAvoidingView to ensure the interface remains functional on Android devices during text entry.

​Technical Implementation (TypeScript)

​The module is built with a focus on Type Safety and Clean Architecture:

​Strict Typing: Used TypeScript Interfaces (Location, DeliveryData) to ensure coordinate data (\text{latitude/longitude}) is always valid, preventing runtime crashes during map rendering.

​State Synchronization: Managed via React Hooks (useState). The driverNotes state captures user input and bundles it with coordinate data for the final API payload.

​UI/UX Patterns: * Visual Feedback: The "Finalize" button includes a loading state (isFinalizing) to prevent double-submissions.
​Conditional Rendering: The map uses a Polyline to visually connect the driver and the destination, improving the spatial awareness of the user
