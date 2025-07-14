import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: Roboto_400Regular,
    RobotoBold: Roboto_700Bold,
    RobotoExtraBold: Roboto_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="debt/[id]" options={{ title: "Debt Details" }} />
      <Stack.Screen name="debt/[id]/payment" options={{ title: "Payment" }} />
    </Stack>
  );
}
