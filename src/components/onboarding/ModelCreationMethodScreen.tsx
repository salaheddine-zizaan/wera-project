import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { ModelCreationMethod } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, Camera, Check, SlidersHorizontal } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInRight, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

type MethodOptionProps = {
  method: ModelCreationMethod;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

function MethodOption({
  description,
  method,
  onPress,
  selected,
  title,
}: MethodOptionProps) {
  const Icon = method === "photos" ? Camera : SlidersHorizontal;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className={
        selected
          ? "relative min-h-[152px] rounded-medium border border-navy bg-[#F7F8FA] px-5 py-5"
          : "relative min-h-[152px] rounded-medium border border-border-default bg-surface px-5 py-5"
      }
      onPress={onPress}
    >
      <View
        className={
          selected
            ? "h-12 w-12 items-center justify-center rounded-full bg-[#E7EBF2]"
            : "h-12 w-12 items-center justify-center rounded-full bg-surface-secondary"
        }
      >
        <Icon color={colors.navy} size={27} strokeWidth={1.55} />
      </View>
      <Text className="mt-4 font-ui-semibold text-[17px] leading-6 text-navy">{title}</Text>
      <Text className="mt-1 font-ui text-[14px] leading-5 text-text-secondary">{description}</Text>
      {selected ? (
        <View className="absolute right-4 top-4 h-5 w-5 items-center justify-center rounded-full bg-navy">
          <Check color={colors.surface} size={13} strokeWidth={2.4} />
        </View>
      ) : null}
    </Pressable>
  );
}

export function ModelCreationMethodScreen() {
  const router = useRouter();
  const creationMethod = useOnboardingStore((state) => state.profile.model.creationMethod);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setCurrentStep("model-method");
  }, [setCurrentStep]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 px-5 pb-6 pt-4">
        <OnboardingProgress />

        <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)}>
          <View className="mt-[30px]">
            <Text className="font-ui-semibold text-[12px] leading-[14px] tracking-[3.1px] text-navy">
              YOUR WERA MODEL
            </Text>
            <Text className="mt-[7px] pb-0.5 font-editorial-regular text-[50px] leading-[52px] tracking-[-1.1px] text-navy">
              make it yours.
            </Text>
            <Text className="mt-4 max-w-[320px] font-ui text-[14px] leading-5 text-text-secondary">
              Choose the way you&apos;d like to create the model Wera will use for outfit previews.
            </Text>
          </View>

          <View className="mt-8 gap-3">
            <MethodOption
              description="Use a few guided photos to create your Model."
              method="photos"
              onPress={() => updateModel({ creationMethod: "photos" })}
              selected={creationMethod === "photos"}
              title="Create from photos"
            />
            <MethodOption
              description="Choose your details yourself, step by step."
              method="manual"
              onPress={() => updateModel({ creationMethod: "manual" })}
              selected={creationMethod === "manual"}
              title="Build manually"
            />
          </View>
        </Animated.View>

        <Pressable
          accessibilityRole="button"
          className="mt-auto h-11 flex-row items-center justify-center gap-[14px]"
          onPress={() => {
            setCurrentStep("daily-life");
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
