import { colors } from "@/theme";

import { useAuth } from "@clerk/expo";
import { LogOut } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    setIsSigningOut(true);

    try {
      await signOut();
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 items-center justify-center px-5">
        <Text className="font-display text-[38px] tracking-[4px] text-navy">WERA</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ busy: isSigningOut }}
          className="mt-8 h-12 self-center flex-row items-center justify-center gap-2 rounded-medium border border-border-default px-5 active:bg-surface-secondary"
          disabled={isSigningOut}
          onPress={() => void handleLogout()}
        >
          {isSigningOut ? (
            <ActivityIndicator accessibilityLabel="Logging out" color={colors.navy} size="small" />
          ) : (
            <LogOut color={colors.navy} size={19} strokeWidth={1.8} />
          )}
          <Text className="font-ui-semibold text-[15px] text-navy">Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
