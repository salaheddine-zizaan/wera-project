import { images } from "@/constants/images";
import { colors } from "@/theme";

import { ArrowRight } from "lucide-react-native";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { WelcomeHero } from "./WelcomeHero";

type WelcomeActionProps = {
  label: string;
  variant?: "primary" | "secondary";
  onPress?: () => void;
};

function WelcomeAction({
  label,
  variant = "primary",
  onPress,
}: WelcomeActionProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={
        isPrimary
          ? "relative h-14 w-full flex-row items-center justify-center rounded-medium bg-navy active:opacity-80"
          : "h-12 w-full items-center justify-center active:opacity-60"
      }
    >
      <Text
        className={
          isPrimary
            ? "font-ui-semibold text-base text-surface"
            : "font-ui-semibold text-[15px] text-navy"
        }
      >
        {label}
      </Text>

      {isPrimary && (
        <View className="absolute right-4">
          <ArrowRight
            color={colors.surface}
            size={23}
            strokeWidth={2}
          />
        </View>
      )}
    </Pressable>
  );
}

export function WelcomeScreen() {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom"]}
    >
      <StatusBar
        backgroundColor={colors.canvas}
        barStyle="dark-content"
      />

      <View className="flex-1 bg-canvas px-6 pb-4 pt-2">
        {/* Logo */}
        <Image
          accessibilityLabel="Wera"
          source={images.weraLogoWithName}
          resizeMode="contain"
          className="h-7 w-28"
        />

        {/* Animated women / men hero */}
        <WelcomeHero />

        {/* Content */}
        <View className="-mt-7">
          <Text className="font-display text-[48px] leading-[44px] tracking-[-0.8px] text-navy">
            Dress for{"\n"}
            every version{"\n"}
            of you.
          </Text>

          <Text className="mt-3 font-ui text-[15px] leading-[22px] text-text-secondary">
            Your personal stylist learns your taste and curates your wardrobe
            over time.
          </Text>

          <View className="mt-5 gap-1">
            <WelcomeAction label="Start building my profile" />

            <WelcomeAction
              label="I already have an account"
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});