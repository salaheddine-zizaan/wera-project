import { images } from "@/constants/images";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";

import { Link } from "expo-router";
import { ArrowRight, Clock3, Shirt, Sparkles, UserRound } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInUp,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const DIALOGUE_DELAYS = {
  greeting: 1200,
  introduction: 2550,
} as const;

type ProfileBenefitProps = {
  icon: typeof UserRound;
  label: string;
};

function ProfileBenefit({ icon: Icon, label }: ProfileBenefitProps) {
  return (
    <View className="flex-1 items-center px-1">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-secondary">
        <Icon color={colors.navy} size={21} strokeWidth={1.5} />
      </View>
      <Text className="mt-1.5 text-center font-ui-medium text-[10px] leading-[13px] text-navy">
        {label}
      </Text>
    </View>
  );
}

export function ProfileWelcomeScreen() {
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [isProfileStarting, setProfileStarting] = useState(false);
  const mascotOffset = useSharedValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const greetingTimer = setTimeout(
      () => setDialogueStep(1),
      DIALOGUE_DELAYS.greeting,
    );
    const introductionTimer = setTimeout(
      () => setDialogueStep(2),
      DIALOGUE_DELAYS.introduction,
    );

    if (!reduceMotion) {
      mascotOffset.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 1800 }),
          withTiming(0, { duration: 1800 }),
        ),
        -1,
        false,
      );
    }

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(introductionTimer);
      cancelAnimation(mascotOffset);
    };
  }, [mascotOffset, reduceMotion]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: mascotOffset.value }],
  }));

  const handleStartProfile = () => {
    setCurrentStep("about-you");
    setProfileStarting(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />

      <View className="flex-1 px-5 pb-3 pt-20">
        <View className="relative h-[338px] justify-end">
          <Animated.View
            className="absolute right-[-20px] top-[-6px] h-[340px] w-[270px]"
            style={mascotStyle}
          >
            <View className="absolute right-1 top-[41px] h-[252px] w-[252px] rounded-full bg-[#F4F1EB]" />
            <Image
              accessibilityLabel="Wera, your personal styling companion"
              className="h-full w-full"
              resizeMode="contain"
              source={images.onboardingProfileWelcomeMascot}
            />
          </Animated.View>

          <Sparkles
            className="absolute left-[45%] top-[90px]"
            color={colors.warmAccent}
            size={19}
            strokeWidth={1.45}
          />

          <View className="max-w-[56%] pb-1">
            <Animated.Text
              entering={reduceMotion ? undefined : FadeInUp.duration(420)}
              className="font-ui-semibold text-[17px] leading-6 text-warm-accent"
            >
              {"Hi, I'm Wera"}
            </Animated.Text>

            {dialogueStep >= 1 && (
              <Animated.Text
                entering={reduceMotion ? undefined : FadeInUp.duration(480)}
                className="mt-3 font-editorial text-[45px] leading-[41px] text-navy"
              >
                {"Nice to\nmeet you!"}
              </Animated.Text>
            )}

            {dialogueStep >= 2 && (
              <Animated.Text
                entering={reduceMotion ? undefined : FadeIn.delay(260).duration(620)}
                className="mt-3.5 font-ui text-[14px] leading-[21px] text-text-secondary"
              >
                {"I'm here to help you build a Wera profile that truly reflects you."}
              </Animated.Text>
            )}
          </View>
        </View>

        <View className="mt-8 h-[136px] rounded-[20px] bg-surface px-3 pb-3 pt-4 shadow-sm">
          <Text className="text-center font-ui-semibold text-[14px] leading-5 text-navy">
            {"Let's build your profile to:"}
          </Text>

          <View className="mt-2 flex-1 flex-row items-center">
            <ProfileBenefit icon={UserRound} label={"Personalize\nyour style"} />
            <View className="h-11 w-px bg-border-subtle" />
            <ProfileBenefit icon={Shirt} label={"Get better\nrecommendations"} />
            <View className="h-11 w-px bg-border-subtle" />
            <ProfileBenefit icon={Sparkles} label={"Unlock a tailored\nexperience"} />
          </View>
        </View>

        <Link asChild href="/about-you" onPress={handleStartProfile}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ busy: isProfileStarting }}
            className="relative mt-12 h-[58px] items-center justify-center rounded-large bg-navy active:opacity-85"
          >
            <Text className="font-ui-semibold text-[17px] leading-[22px] text-surface">
              {isProfileStarting ? "Your profile is starting" : "Let's make my profile"}
            </Text>
            <View className="absolute right-5">
              <ArrowRight color={colors.surface} size={25} strokeWidth={1.8} />
            </View>
          </Pressable>
        </Link>

        <View className="mt-3 flex-row items-center justify-center gap-2">
          <Clock3 color={colors.textSecondary} size={16} strokeWidth={1.6} />
          <Text className="font-ui text-[12px] leading-4 text-text-secondary">
            It only takes a few minutes.
          </Text>
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
