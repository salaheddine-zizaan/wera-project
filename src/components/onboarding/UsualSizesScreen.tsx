import { sizeSystems } from "@/data/onboarding/size-systems";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Shirt } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInRight, FadeInUp, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

export function UsualSizesScreen() {
  const router = useRouter();
  const sizeSystem = useOnboardingStore((state) => state.profile.sizesAndFit.sizeSystem);
  const updateSizesAndFit = useOnboardingStore((state) => state.updateSizesAndFit);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setCurrentStep("usual-sizes");
  }, [setCurrentStep]);

  const handleContinue = () => {
    if (!sizeSystem) {
      return;
    }

    markStepCompleted("usual-sizes");
    setCurrentStep("build");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-5 pb-6 pt-4">
          <OnboardingProgress />

          <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)}>
            <View className="mt-[30px]">
              <Text className="font-ui-semibold text-[12px] leading-[14px] tracking-[3.1px] text-navy">
                YOUR WERA MODEL
              </Text>
              <Text className="mt-[7px] font-editorial-regular text-[46px] leading-[50px] tracking-[-1.1px] text-navy">
                your usual sizes.
              </Text>
              <Text className="mt-3 max-w-[330px] font-ui text-[14px] leading-5 text-text-secondary">
                Choose the sizing system you know best. We will use it to keep recommendations practical.
              </Text>
            </View>

            <Animated.View
              entering={reduceMotion ? undefined : FadeInUp.delay(100).duration(240)}
              className="mt-10 rounded-large border border-border-default bg-surface p-4"
            >
              <View className="flex-row items-center">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-surface-secondary">
                  <Shirt color={colors.textPrimary} size={24} strokeWidth={1.55} />
                </View>
                <Text className="ml-3 font-ui-semibold text-[16px] leading-5 text-navy">Sizing system</Text>
              </View>
              <View className="mt-5 flex-row flex-wrap gap-2">
                {sizeSystems.map((system) => {
                  const selected = system.id === sizeSystem;

                  return (
                    <Pressable
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      className={
                        selected
                          ? "h-12 min-w-[68px] items-center justify-center rounded-small bg-navy px-4"
                          : "h-12 min-w-[68px] items-center justify-center rounded-small border border-border-default bg-surface px-4"
                      }
                      key={system.id}
                      onPress={() => updateSizesAndFit({ sizeSystem: system.id })}
                    >
                      <Text className={selected ? "font-ui-medium text-[15px] text-surface" : "font-ui-medium text-[15px] text-navy"}>
                        {system.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Animated.View>
          </Animated.View>

          <Animated.View entering={reduceMotion ? undefined : FadeInUp.delay(180).duration(240)} className="mt-auto pt-8">
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !sizeSystem }}
              className={
                sizeSystem
                  ? "h-[54px] flex-row items-center justify-between rounded-small bg-navy px-5"
                  : "h-[54px] flex-row items-center justify-between rounded-small bg-navy px-5 opacity-40"
              }
              disabled={!sizeSystem}
              onPress={handleContinue}
            >
              <View className="w-7" />
              <Text className="font-ui-medium text-[17px] leading-6 text-surface">Continue</Text>
              <ArrowRight color={colors.surface} size={28} strokeWidth={1.55} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              className="mt-1.5 h-11 flex-row items-center justify-center gap-[14px]"
              onPress={() => {
                setCurrentStep("measurements");
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
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  scrollContent: { flexGrow: 1 },
});
