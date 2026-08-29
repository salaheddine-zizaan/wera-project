import { Link, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-canvas px-screen">
      <Stack.Screen options={{ headerShown: false }} />
      <Text className="text-center font-ui-semibold text-heading text-navy">
        wera app.
      </Text>
      <Link href="./welcome" asChild>
        <Pressable className="h-touch items-center justify-center rounded-medium bg-navy px-6">
          <Text className="font-ui-semibold text-[15px] text-white">
            Open welcome onboarding
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}


