import { images } from "@/constants/images";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";

import { useRouter } from "expo-router";
import { ArrowRight, Check, Clock3, Shirt, Sparkles, UserRound } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, useReducedMotion } from "react-native-reanimated";

const NAVIGATION_RECOVERY_DELAY_MS = 1500;

type ProfileBenefitProps = {
  icon: typeof UserRound;
  label: string;
};

function ProfileBenefit({ icon: Icon, label }: ProfileBenefitProps) {
  return (
    <View className="flex-1 gap-2">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-secondary">
        <Icon color={colors.navy} size={20} strokeWidth={1.6} />
      </View>
      <Text className="font-ui-medium text-[12px] leading-[17px] text-navy">{label}</Text>
    </View>
  );
}

export function ProfileWelcomeScreen() {
  const router = useRouter();
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const [isStartingProfile, setStartingProfile] = useState(false);
  const navigationRecoveryTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (navigationRecoveryTimer.current) {
        clearTimeout(navigationRecoveryTimer.current);
      }
    },
    [],
  );

  const handleStartProfile = () => {
    if (isStartingProfile) {
      return;
    }

    setStartingProfile(true);
    navigationRecoveryTimer.current = setTimeout(
      () => setStartingProfile(false),
      NAVIGATION_RECOVERY_DELAY_MS,
    );

    try {
      setCurrentStep("about-you");
      router.navigate("/about-you");
    } catch {
      setStartingProfile(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />

      <View className="flex-1 px-5 pb-4 pt-8">
        <Animated.View entering={reduceMotion ? undefined : FadeIn.duration(320)} className="flex-1">
          <View className="relative h-[330px] justify-end">
            <View className="absolute right-[-16px] top-0 h-[315px] w-[260px]">
              <View className="absolute right-1 top-10 h-[240px] w-[240px] rounded-full bg-surface-secondary" />
              <Image
                accessibilityLabel="Wera, your personal styling companion"
                className="h-full w-full"
                resizeMode="contain"
                source={images.onboardingProfileWelcomeMascot}
              />
            </View>

            <View className="max-w-[58%] pb-3">
              <Text className="font-ui-semibold text-[16px] leading-6 text-warm-accent">Hi, I&apos;m Wera</Text>
              <Text className="mt-3 font-editorial text-[48px] leading-[43px] text-navy">
                Let&apos;s make{`\n`}this yours.
              </Text>
              <Text className="mt-4 font-ui text-[14px] leading-[21px] text-text-secondary">
                A few thoughtful details are all I need to start styling around you.
              </Text>
            </View>
          </View>

          <View className="mt-7 border-t border-border-subtle pt-5">
            <Text className="font-ui-semibold text-[15px] text-navy">Your profile helps Wera</Text>
            <View className="mt-4 flex-row gap-3">
              <ProfileBenefit icon={UserRound} label="Understand your style" />
              <ProfileBenefit icon={Shirt} label="Recommend better looks" />
              <ProfileBenefit icon={Sparkles} label="Make it personal" />
            </View>
          </View>
        </Animated.View>

        <View className="gap-3">
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ busy: isStartingProfile, disabled: isStartingProfile }}
            className={
              isStartingProfile
                ? "h-[58px] flex-row items-center justify-center rounded-large bg-navy opacity-70"
                : "h-[58px] flex-row items-center justify-center rounded-large bg-navy active:opacity-85"
            }
            disabled={isStartingProfile}
            onPress={handleStartProfile}
          >
            <Text className="font-ui-semibold text-[17px] text-surface">
              {isStartingProfile ? "Opening your profile" : "Create my profile"}
            </Text>
            <ArrowRight className="absolute right-5" color={colors.surface} size={24} strokeWidth={1.8} />
          </Pressable>

          <View className="flex-row items-center justify-center gap-2">
            <Check color={colors.warmAccent} size={16} strokeWidth={2} />
            <Text className="font-ui text-[12px] leading-4 text-text-secondary">
              Save your progress and make changes anytime.
            </Text>
          </View>
          <View className="flex-row items-center justify-center gap-2">
            <Clock3 color={colors.textSecondary} size={15} strokeWidth={1.6} />
            <Text className="font-ui text-[12px] leading-4 text-text-secondary">It only takes a few minutes.</Text>
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
