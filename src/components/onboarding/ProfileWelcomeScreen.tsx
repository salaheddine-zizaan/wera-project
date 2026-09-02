import { images } from "@/constants/images";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import { useRouter } from "expo-router";
import { ArrowRight, Check, Clock3 } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVIGATION_RECOVERY_DELAY_MS = 1500;

export function ProfileWelcomeScreen() {
  const router = useRouter();

  const setCurrentStep = useOnboardingStore(
    (state) => state.setCurrentStep,
  );

  const [isStartingProfile, setStartingProfile] = useState(false);

  const navigationRecoveryTimer =
    useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { height: screenHeight } = useWindowDimensions();

  const isCompactScreen = screenHeight < 740;

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

  /*
   * ─────────────────────────────────────────────
   * Responsive visual treatment
   * ─────────────────────────────────────────────
   */

  const screenClassName = isCompactScreen
    ? "flex-1 px-5 pb-2"
    : "flex-1 px-5 pb-4";

  const heroClassName = isCompactScreen
    ? "relative flex-1 pt-10"
    : "relative flex-1 pt-[76px]";

  const mascotHaloClassName = isCompactScreen
    ? "absolute right-[-72px] top-[130px] h-[220px] w-[220px] rounded-full bg-surface-secondary opacity-70"
    : "absolute right-[-76px] top-[170px] h-[270px] w-[270px] rounded-full bg-surface-secondary opacity-70";

  const mascotClassName = isCompactScreen
    ? "absolute right-[-18px] top-[135px] h-[202px] w-[176px]"
    : "absolute right-[-26px] top-[170px] h-[246px] w-[220px]";

  const displayHeadlineClassName = isCompactScreen
    ? "font-display text-[45px] leading-[43px] tracking-[-2.2px] text-navy"
    : "font-display text-[52px] leading-[50px] tracking-[-2.6px] text-navy";

  const editorialHeadlineClassName = isCompactScreen
    ? "-mt-1 font-editorial text-[42px] leading-[46px] tracking-[-1px] text-navy"
    : "-mt-1 font-editorial text-[49px] leading-[52px] tracking-[-1px] text-navy";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.canvas,
      }}
      edges={["top", "bottom"]}
    >
      <StatusBar
        backgroundColor={colors.canvas}
        barStyle="dark-content"
      />

      <View className={screenClassName}>
        {/* ───────────────── HEADER ───────────────── */}

        <View className={isCompactScreen ? "pt-1" : "pt-2"}>
          <View className="h-11 justify-center">
            <Image
              accessibilityLabel="Wera"
              className="-ml-3.5 h-[30px] w-[104px]"
              source={images.weraLogoWithName}
              resizeMode="contain"
            />
          </View>

          <Text className="mt-2 font-ui-medium text-[11px] uppercase leading-4 tracking-[2.5px] text-text-secondary">
            Your personal stylist
          </Text>
        </View>

        {/* ───────────────── HERO ───────────────── */}

        <View className={heroClassName}>
          {/* Soft editorial shape behind mascot */}
          <View
            pointerEvents="none"
            className={mascotHaloClassName}
          />

          {/* Mascot */}
          <Image
            accessibilityLabel="Wera, your personal styling companion"
            className={mascotClassName}
            source={images.onboardingProfileWelcomeMascot}
            resizeMode="contain"
          />

          {/* Copy */}
          <View className="relative z-10">
            <Text className="font-ui-medium text-[18px] leading-6 tracking-[0.3px] text-warm-accent">
              Hi, I&apos;m Wera
            </Text>

            <View
              className={
                isCompactScreen
                  ? "mt-8"
                  : "mt-10"
              }
            >
              <Text className="font-ui-semibold text-[12px] uppercase leading-[18px] tracking-[2.4px] text-navy">
                Let&apos;s make
              </Text>

              <View className="mt-3">
                <Text className={displayHeadlineClassName}>
                  A PROFILE
                  {"\n"}
                  THAT
                </Text>

                <Text className={editorialHeadlineClassName}>
                  feels like you.
                </Text>
              </View>

              {/* Small Wera accent */}
              <View className="mt-4 h-[2px] w-7 bg-warm-accent" />

              <Text
                className={
                  isCompactScreen
                    ? "mt-4 max-w-[205px] font-ui text-[14px] leading-[21px] text-text-secondary"
                    : "mt-5 max-w-[225px] font-ui text-[15px] leading-[23px] text-text-secondary"
                }
              >
                Share the essentials, and I&apos;ll make every suggestion more
                personal.
              </Text>
            </View>
          </View>
        </View>

        {/* ───────────────── ACTION ───────────────── */}

        <View className={isCompactScreen ? "pb-10" : "pb-12 pt-2"}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{
              busy: isStartingProfile,
              disabled: isStartingProfile,
            }}
            className={
              isStartingProfile
                ? "h-[58px] items-center justify-center rounded-medium bg-navy opacity-70"
                : "h-[58px] items-center justify-center rounded-medium bg-navy active:scale-[0.985] active:opacity-90"
            }
            disabled={isStartingProfile}
            onPress={handleStartProfile}
          >
            <Text className="font-ui-semibold text-[16px] leading-6 text-surface">
              {isStartingProfile
                ? "Opening your profile"
                : "Create my profile"}
            </Text>

            <View className="absolute bottom-0 right-[18px] top-0 justify-center">
              <ArrowRight
                color={colors.surface}
                size={27}
                strokeWidth={1.6}
              />
            </View>
          </Pressable>

          {/* Reassurance row */}
          <View
            className={
              isCompactScreen
                ? "mt-[18px] flex-row items-center justify-center"
                : "mt-6 flex-row items-center justify-center"
            }
          >
            <View className="flex-row items-center gap-2">
              <Check
                color={colors.warmAccent}
                size={19}
                strokeWidth={2}
              />

              <Text className="font-ui text-[12px] leading-[17px] text-text-secondary">
                Progress saved
              </Text>
            </View>

            <View className="mx-4 h-5 w-px bg-border-default" />

            <View className="flex-row items-center gap-2">
              <Clock3
                color={colors.textSecondary}
                size={18}
                strokeWidth={1.7}
              />

              <Text className="font-ui text-[12px] leading-[17px] text-text-secondary">
                Takes a few minutes
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
