import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";

import { useRouter } from "expo-router";
import { ArrowLeft, Camera, RotateCw, ScanFace, ShieldCheck, UserRound } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInRight, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const photoSteps = [
  { label: "Front", Icon: UserRound },
  { label: "Side", Icon: RotateCw },
  { label: "Full body", Icon: ScanFace },
] as const;

export function PhotoModelScreen() {
  const router = useRouter();
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setCurrentStep("photo-model");
  }, [setCurrentStep]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 px-5 pb-6 pt-4">
        <OnboardingProgress />

        <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)} className="flex-1">
          <View className="mt-[30px]">
            <Text className="font-ui-semibold text-[12px] leading-[14px] tracking-[3.1px] text-navy">
              CREATE FROM PHOTOS
            </Text>
            <Text className="mt-[7px] pb-0.5 font-editorial-regular text-[46px] leading-[50px] tracking-[-1.1px] text-navy">
              three views, one Model.
            </Text>
            <Text className="mt-3 max-w-[330px] font-ui text-[14px] leading-5 text-text-secondary">
              Wera will guide you through three simple photos to create a natural, consistent preview.
            </Text>
          </View>

          <View className="mt-9 rounded-large border border-border-default bg-surface px-5 py-6">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-surface-secondary">
              <Camera color={colors.navy} size={26} strokeWidth={1.5} />
            </View>
            <Text className="mt-5 font-ui-semibold text-[18px] leading-6 text-navy">Your guided photo set</Text>
            <View className="mt-5 flex-row justify-between gap-2">
              {photoSteps.map(({ Icon, label }) => (
                <View className="flex-1 items-center" key={label}>
                  <View className="h-16 w-full items-center justify-center rounded-small bg-surface-secondary">
                    <Icon color={colors.navy} size={26} strokeWidth={1.45} />
                  </View>
                  <Text className="mt-2 text-center font-ui-medium text-[12px] leading-4 text-navy">{label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-5 flex-row items-start gap-3 rounded-medium bg-surface-secondary px-4 py-4">
            <ShieldCheck color={colors.navy} size={22} strokeWidth={1.55} />
            <Text className="flex-1 font-ui text-[13px] leading-5 text-text-secondary">
              You&apos;ll be able to review and replace each photo before anything is used.
            </Text>
          </View>
        </Animated.View>

        <Pressable
          accessibilityRole="button"
          className="mt-6 h-11 flex-row items-center justify-center gap-[14px]"
          onPress={() => {
            setCurrentStep("model-method");
            router.back();
          }}
        >
          <ArrowLeft color={colors.navy} size={27} strokeWidth={1.55} />
          <Text className="font-ui-medium text-[16px] leading-[22px] text-navy">Back</Text>
        </Pressable>
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
