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


// import { HomeScreen } from "@/components/home/HomeScreen";
// import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
// import { useOnboardingStore } from "@/store/onboarding-store";
// import { useAuth } from "@clerk/expo";
// import { Redirect } from "expo-router";

// export default function Index() {
//   const { isLoaded, isSignedIn } = useAuth();
//   const hasCompletedProfile = useOnboardingStore((state) =>
//     state.completedSteps.includes("profile-ready"),
//   );

//   if (!isLoaded) {
//     return null;
//   }

//   if (!isSignedIn) {
//     return <WelcomeScreen />;
//   }

//   if (!hasCompletedProfile) {
//     return <Redirect href="/profile-welcome" />;
//   }

//   return <HomeScreen />;
// }