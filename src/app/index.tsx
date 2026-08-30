import { useAuth, useClerk } from "@clerk/expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/onboarding");
  };

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-canvas px-screen">
      <Stack.Screen options={{ headerShown: false }} />
      <Text className="text-center font-ui-semibold text-heading text-navy">
        wera app.
      </Text>
      <Pressable
        accessibilityRole="button"
        className="h-touch items-center justify-center rounded-medium bg-navy px-6 active:opacity-80"
        onPress={() => void handleSignOut()}
      >
        <Text className="font-ui-semibold text-[15px] text-white">Log out</Text>
      </Pressable>
    </View>
  );
}


