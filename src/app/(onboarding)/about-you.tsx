import { AboutYouScreen } from "@/components/onboarding/AboutYouScreen";
import { Stack } from "expo-router";

export default function AboutYouRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AboutYouScreen />
    </>
  );
}
