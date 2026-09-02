import { images } from "@/constants/images";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { ModelCreationMethod } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Camera, Check, SlidersHorizontal } from "lucide-react-native";
import { useEffect } from "react";
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeInRight,
  FadeInUp,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

type MethodChoiceProps = {
  method: ModelCreationMethod;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

function MethodChoice({ description, method, onPress, selected, title }: MethodChoiceProps) {
  const Icon = method === "photos" ? Camera : SlidersHorizontal;
  const reduceMotion = useReducedMotion();
  const selectionScale = useSharedValue(1);
  const selectionStyle = useAnimatedStyle(() => ({
    transform: [{ scale: selectionScale.value }],
  }));

  useEffect(() => {
    if (reduceMotion || !selected) {
      selectionScale.value = 1;
      return;
    }

    selectionScale.value = withSequence(
      withTiming(1.015, { duration: 120, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 220, easing: Easing.out(Easing.cubic) }),
    );
  }, [reduceMotion, selected, selectionScale]);

  return (
    <Animated.View
      entering={
        reduceMotion
          ? undefined
          : FadeInUp.delay(method === "photos" ? 260 : 330)
              .duration(280)
              .easing(Easing.out(Easing.cubic))
      }
      style={selectionStyle}
    >
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        className={
          selected
            ? "h-[102px] flex-row items-center rounded-medium border border-navy bg-surface px-4"
            : "h-[102px] flex-row items-center rounded-medium border border-border-default bg-surface px-4"
        }
        onPress={onPress}
      >
        <View className="h-12 w-12 items-center justify-center rounded-full bg-surface-secondary">
          <Icon color={colors.textPrimary} size={26} strokeWidth={1.6} />
        </View>
        <View className="ml-3 flex-1 pr-3">
          <Text className="font-ui-semibold text-[16px] leading-5 text-navy">{title}</Text>
          <Text className="mt-1 font-ui text-[13px] leading-[18px] text-text-secondary">{description}</Text>
        </View>
        {selected ? (
          <View className="h-8 w-8 items-center justify-center rounded-full bg-navy">
            <Check color={colors.surface} size={18} strokeWidth={2.3} />
          </View>
        ) : (
          <View className="h-8 w-8 rounded-full border-2 border-[#D8D5D1]" />
        )}
      </Pressable>
    </Animated.View>
  );
}

export function ModelCreationMethodScreen() {
  const router = useRouter();
  const creationMethod = useOnboardingStore((state) => state.profile.model.creationMethod);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setCurrentStep("model-method");
  }, [setCurrentStep]);

  const handleContinue = () => {
    if (!creationMethod) {
      return;
    }

    markStepCompleted("model-method");
    router.navigate(creationMethod === "photos" ? "/photo-model" : "/measurements");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <OnboardingProgress />

          <View className="mt-2 h-[400px]">
            <View className="relative h-full justify-center overflow-visible pl-2">
              <View pointerEvents="none" style={styles.artworkBackdrop}>
                <View style={styles.backdropOval} />
              </View>

              <Animated.View
                entering={
                  reduceMotion
                    ? undefined
                    : FadeInRight.duration(360).easing(Easing.out(Easing.cubic))
                }
                className="z-30 max-w-[48%]"
              >
                <Text className="font-ui-semibold text-[11px] leading-[13px] tracking-[3px] text-warm-accent">
                  CREATE YOUR MODEL
                </Text>
                <Text className="mt-4 font-editorial-regular text-[38px] leading-[45px] tracking-[-1px] text-navy">
                  How would{"\n"}you like to{"\n"}build it?
                </Text>
                <Text className="mt-5 font-ui text-[14px] leading-5 text-text-secondary">
                  Choose a way to create your Wera model. You can always update it later.
                </Text>
              </Animated.View>

              <Animated.View
                entering={
                  reduceMotion
                    ? undefined
                    : FadeInUp.delay(80).duration(380).easing(Easing.out(Easing.cubic))
                }
                className="absolute right-[-12px] top-[44px] z-10 h-[134px] w-[134px]"
                style={styles.floatingMascot}
              >
                <Image
                  resizeMode="contain"
                  source={images.onboardingFloatingMascot}
                  style={styles.mascotImage}
                />
              </Animated.View>

              <Animated.View
                entering={
                  reduceMotion
                    ? undefined
                    : FadeInUp.delay(180).duration(460).easing(Easing.out(Easing.cubic))
                }
                className="absolute bottom-[-6px] right-[-22px] z-20 h-[96%] w-[72%]"
              >
                <Image
                  resizeMode="contain"
                  source={images.onboardingPhotoGuideModel}
                  style={styles.modelImage}
                />
              </Animated.View>
            </View>
          </View>

          <View className="mt-1 gap-2Read AGENTS.md and follow it strictly.

The package `react-native-dynamically-selected-picker` is causing:

`View config not found for component BVLinearGradient`

because it depends on `react-native-linear-gradient`, which does not fit our current Expo setup.

Remove:
- react-native-dynamically-selected-picker
- react-native-linear-gradient if it was installed only for this picker

Do not change the Measurements screen design or onboarding logic.

Find and recommend another horizontal wheel/number picker that:
- works with Expo SDK 57
- does not require unsupported native modules
- supports horizontal scrolling
- snaps to the centered value
- allows custom rendering so the center value can be large/navy/100% opacity and surrounding values faded
- works for height and weight

Before installing anything, show me the recommended package and compatibility reasoning and wait for approval.">
            <MethodChoice
              description="Enter a few photos and Wera creates your model for you."
              method="photos"
              onPress={() => updateModel({ creationMethod: "photos" })}
              selected={creationMethod === "photos"}
              title="Create from photos"
            />
            <MethodChoice
              description="Customize every detail of your model step by step."
              method="manual"
              onPress={() => updateModel({ creationMethod: "manual" })}
              selected={creationMethod === "manual"}
              title="Build manually"
            />
          </View>

          <Animated.View
            entering={
              reduceMotion
                ? undefined
                : FadeInUp.delay(400).duration(280).easing(Easing.out(Easing.cubic))
            }
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !creationMethod }}
              className={
                creationMethod
                  ? "mt-4 h-[54px] flex-row items-center justify-between rounded-small bg-navy px-5"
                  : "mt-4 h-[54px] flex-row items-center justify-between rounded-small bg-navy px-5 opacity-40"
              }
              disabled={!creationMethod}
              onPress={handleContinue}
            >
              <View className="w-7" />
              <Text className="font-ui-medium text-[17px] leading-6 text-surface">Continue</Text>
              <ArrowRight color={colors.surface} size={28} strokeWidth={1.55} />
            </Pressable>
          </Animated.View>

          <Animated.View
            entering={
              reduceMotion
                ? undefined
                : FadeInUp.delay(460).duration(240).easing(Easing.out(Easing.cubic))
            }
          >
            <Pressable
              accessibilityRole="button"
              className="mt-4 h-11 flex-row items-center justify-center gap-[14px]"
              onPress={() => {
                setCurrentStep("daily-life");
                router.back();
              }}
            >
              <ArrowLeft color={colors.navy} size={27} strokeWidth={1.55} />
              <Text className="font-ui-medium text-[16px] leading-[22px] text-navy">Back</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  artworkBackdrop: {
    ...StyleSheet.absoluteFill,
    overflow: "visible",
  },
  backdropOval: {
    backgroundColor: "#F2EFEB",
    borderRadius: 999,
    bottom: 14,
    height: 210,
    position: "absolute",
    right: -14,
    transform: [{ rotate: "-30deg" }],
    width: 238,
  },
  floatingMascot: {
    transform: [{ rotate: "20deg" }],
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  mascotImage: {
    height: "100%",
    width: "100%",
  },
  modelImage: {
    height: "100%",
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
