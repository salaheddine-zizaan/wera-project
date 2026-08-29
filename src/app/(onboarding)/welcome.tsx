import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { Stack } from "expo-router";

export default function WelcomeRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <WelcomeScreen />
    </>
  );
}
