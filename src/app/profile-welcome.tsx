import { ProfileWelcomeScreen } from "@/components/onboarding/ProfileWelcomeScreen";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function ProfileWelcomeRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ProfileWelcomeScreen />
    </>
  );
}
