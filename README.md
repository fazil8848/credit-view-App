# PaymentFlow App

A sleek and interactive multi-step payment flow built using **React Native**, **Expo Router**, and **Tailwind CSS via NativeWind**. This app allows users to:

- Select full or custom payment amounts
- Enter card details with animated credit card visualization
- Review and confirm payment
- See a success screen with transaction details

---

## 📱 Features

- **Multi-step Flow**: Guided steps to ensure smooth payment experience
- **Credit Card Flip Animation**: Card flips to show CVV input
- **Custom Amount Input**: Users can pay full or enter a specific amount
- **Visual Step Indicator**: Clear progress through amount > payment > confirm > success
- **Responsive UI**: Designed for mobile with Tailwind-styled components

---

## 🛠️ Tech Stack

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| React Native         | UI development                          |
| Expo Router          | File-based routing in React Native apps |
| NativeWind           | TailwindCSS utility classes             |
| expo-linear-gradient | Background gradients for cards          |
| lucide-react-native  | Icon set for feedback and actions       |

---

## 🚀 Getting Started

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

### 1. Clone the Repo

```bash
git clone https://github.com/fazil8848/credit-view-App.git
cd credit-view-App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Expo Specific Packages

```bash
npx expo install expo-linear-gradient expo-blur expo-constants expo-font expo-haptics expo-image expo-linking expo-router expo-splash-screen expo-status-bar expo-symbols expo-system-ui expo-web-browser
```

### 4. Start the App

```bash
npx expo start
```

Open it in an emulator or Expo Go on your phone.

---

## 📁 Project Structure

```bash
/app
  /index.tsx
  /_layout.tsx     # PaymentFlow screen logic
  /debt/[id].tsx     # Debt detail screen (for navigation)
  /debt/[id]/payment.tsx     # Debt detail screen (for navigation)
  /debt/[id]/chat.tsx     # Debt detail screen (for navigation)
/components          # Shared UI components
/assets              # Fonts, images, etc.
tailwind.config.js   # NativeWind config
```

---

## 🧩 Navigation

- Uses `useLocalSearchParams()` from `expo-router` to access route params
- Navigation to `/debt/[id]` happens via `router.push()` after successful payment

---

## 📌 To-Do / Improvements

- Add validation for expiry format MM/YY
- Integrate with actual payment API (e.g., Stripe)
- Save transaction to a backend (e.g., Firebase or REST API)
- Add loading spinner for async steps

---

## 🙋‍♂️ Contact

Made by \[Fazil]

If you have any questions or suggestions, feel free to reach out at [Email](mailto:fazilfaz8848@gmail.com)

---

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with
