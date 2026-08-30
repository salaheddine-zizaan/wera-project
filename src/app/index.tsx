import { HomeScreen } from "@/components/home/HomeScreen";
import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { useAuth } from "@clerk/expo";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? <HomeScreen /> : <WelcomeScreen />;
}


