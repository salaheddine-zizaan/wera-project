import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { LengthMeasurement, WeightMeasurement } from "@/types/profile";

import { useRouter } from "expo-router";
import { ArrowLeft, Check, Ruler, Weight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInRight, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

function initialHeightValue(measurement?: LengthMeasurement) {
  return measurement?.unit === "cm" ? String(measurement.value) : "";
}

function initialWeightValue(measurement?: WeightMeasurement) {
  return measurement?.unit === "kg" ? String(measurement.value) : "";
}

export function MeasurementsScreen() {
  const router = useRouter();
  const sizesAndFit = useOnboardingStore((state) => state.profile.sizesAndFit);
  const updateSizesAndFit = useOnboardingStore((state) => state.updateSizesAndFit);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const reduceMotion = useReducedMotion();
  const [height, setHeight] = useState(() => initialHeightValue(sizesAndFit.measurements.height));
  const [weight, setWeight] = useState(() => initialWeightValue(sizesAndFit.measurements.weight));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCurrentStep("measurements");
  }, [setCurrentStep]);

  const saveMeasurements = () => {
    const heightValue = Number(height);
    const weightValue = Number(weight);

    updateSizesAndFit({
      measurementSystem: "metric",
      measurements: {
        ...(Number.isFinite(heightValue) && heightValue > 0
          ? { height: { unit: "cm", value: heightValue } }
          : {}),
        ...(Number.isFinite(weightValue) && weightValue > 0
          ? { weight: { unit: "kg", value: weightValue } }
          : {}),
      },
    });
    setSaved(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 px-5 pb-6 pt-4">
        <OnboardingProgress />

        <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)} className="flex-1">
          <View className="mt-[30px]">
            <Text className="font-ui-semibold text-[12px] leading-[14px] tracking-[3.1px] text-navy">
              YOUR WERA MODEL
            </Text>
            <Text className="mt-[7px] pb-0.5 font-editorial-regular text-[46px] leading-[50px] tracking-[-1.1px] text-navy">
              the basics first.
            </Text>
            <Text className="mt-3 max-w-[330px] font-ui text-[14px] leading-5 text-text-secondary">
              These two details give your virtual Model a useful starting point. You can refine it later.
            </Text>
          </View>

          <View className="mt-9 gap-5">
            <View>
              <Text className="font-ui-medium text-[16px] leading-5 text-navy">Your height</Text>
              <View className="mt-2.5 h-14 flex-row items-center gap-3 rounded-medium border border-border-default bg-surface px-4">
                <Ruler color={colors.textPrimary} size={25} strokeWidth={1.55} />
                <TextInput
                  accessibilityLabel="Height in centimetres"
                  className="h-full flex-1 font-ui text-[16px] text-navy"
                  keyboardType="decimal-pad"
                  onChangeText={(value) => {
                    setHeight(value);
                    setSaved(false);
                  }}
                  placeholder="Height"
                  placeholderTextColor={colors.textSecondary}
                  value={height}
                />
                <Text className="font-ui-medium text-[14px] text-text-secondary">cm</Text>
              </View>
            </View>

            <View>
              <Text className="font-ui-medium text-[16px] leading-5 text-navy">Your weight</Text>
              <View className="mt-2.5 h-14 flex-row items-center gap-3 rounded-medium border border-border-default bg-surface px-4">
                <Weight color={colors.textPrimary} size={25} strokeWidth={1.55} />
                <TextInput
                  accessibilityLabel="Weight in kilograms"
                  className="h-full flex-1 font-ui text-[16px] text-navy"
                  keyboardType="decimal-pad"
                  onChangeText={(value) => {
                    setWeight(value);
                    setSaved(false);
                  }}
                  placeholder="Weight"
                  placeholderTextColor={colors.textSecondary}
                  value={weight}
                />
                <Text className="font-ui-medium text-[14px] text-text-secondary">kg</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <View className="mt-6">
          <Pressable
            accessibilityRole="button"
            className="relative h-[54px] items-center justify-center rounded-small bg-navy"
            onPress={saveMeasurements}
          >
            <Text className="font-ui-medium text-[17px] leading-6 text-surface">
              {saved ? "Saved" : "Save measurements"}
            </Text>
            {saved ? (
              <View className="absolute right-5 top-0 h-full justify-center">
                <Check color={colors.surface} size={25} strokeWidth={2} />
              </View>
            ) : null}
          </Pressable>
          <Pressable
            accessibilityRole="button"
            className="mt-1.5 h-11 flex-row items-center justify-center gap-[14px]"
            onPress={() => {
              setCurrentStep("model-method");
              router.back();
            }}
          >
            <ArrowLeft color={colors.navy} size={27} strokeWidth={1.55} />
            <Text className="font-ui-medium text-[16px] leading-[22px] text-navy">Back</Text>
          </Pressable>
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
