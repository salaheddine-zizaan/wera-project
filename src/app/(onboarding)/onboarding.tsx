import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function OnboardingRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <WelcomeScreen />
    </>
  );
}
