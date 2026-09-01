import { ageRanges, clothingDirections } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { ClothingDirectionId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Check, Mars, Venus } from "lucide-react-native";
import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const selectableClothingDirections = clothingDirections.filter(
  (direction): direction is (typeof clothingDirections)[number] & {
    id: Exclude<ClothingDirectionId, "both">;
  } => direction.id !== "both",
);

type DirectionOptionProps = {
  directionId: Exclude<ClothingDirectionId, "both">;
  label: string;
  onPress: () => void;
  selected: boolean;
};

function DirectionOption({ directionId, label, onPress, selected }: DirectionOptionProps) {
  const Icon = directionId === "menswear" ? Mars : Venus;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className={
        selected
          ? "relative h-[132px] flex-1 items-center justify-center rounded-medium bg-navy"
          : "relative h-[132px] flex-1 items-center justify-center rounded-medium border border-border-default bg-surface"
      }
      onPress={onPress}
    >
      <View
        className={
          selected
            ? "h-12 w-12 items-center justify-center rounded-full bg-[#263958]"
            : "h-12 w-12 items-center justify-center rounded-full bg-surface-secondary"
        }
      >
        <Icon color={selected ? colors.surface : colors.navy} size={27} strokeWidth={1.55} />
      </View>
      <Text
        className={
          selected
            ? "mt-3 font-ui-semibold text-[15px] text-surface"
            : "mt-3 font-ui-medium text-[15px] text-navy"
        }
      >
        {label}
      </Text>
      {selected && (
        <View className="absolute right-3 top-3 h-6 w-6 items-center justify-center rounded-full bg-surface">
          <Check color={colors.navy} size={15} strokeWidth={2.4} />
        </View>
      )}
    </Pressable>
  );
}

export function AboutYouScreen() {
  const router = useRouter();
  const basics = useOnboardingStore((state) => state.profile.basics);
  const updateBasics = useOnboardingStore((state) => state.updateBasics);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();

  const selectedDirection = basics.clothingDirections.find(
    (direction) => direction === "menswear" || direction === "womenswear",
  );
  const canContinue = Boolean(basics.displayName?.trim() && basics.ageRange && selectedDirection);

  useEffect(() => {
    setCurrentStep("about-you");
  }, [setCurrentStep]);

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    markStepCompleted("about-you");
    setCurrentStep("daily-life");
    router.navigate("/daily-life");
  };

  const handleBack = () => {
    setCurrentStep(undefined);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <OnboardingProgress />

          <Animated.View entering={reduceMotion ? undefined : FadeIn.duration(260)}>
            <View className="mt-10">
              <Text className="font-ui-semibold text-[16px] leading-6 text-warm-accent">About you</Text>
              <Text className="mt-2 text-[46px] leading-[43px] text-navy" style={styles.title}>
                Let&apos;s begin{`\n`}with you.
              </Text>
              <Text className="mt-4 max-w-[310px] font-ui text-[14px] leading-5 text-text-secondary">
                Tell Wera the essentials. You can update every detail later.
              </Text>
            </View>

            <View className="mt-8 gap-7">
              <View>
                <Text className="font-ui-semibold text-[17px] text-navy">What should Wera call you?</Text>
                <TextInput
                  accessibilityLabel="Your name"
                  autoCapitalize="words"
                  autoComplete="name"
                  className="mt-3 h-14 rounded-medium border border-border-default bg-surface px-4 font-ui text-[16px] text-navy"
                  onChangeText={(displayName) => updateBasics({ displayName })}
                  placeholder="Your first name"
                  placeholderTextColor={colors.textSecondary}
                  returnKeyType="done"
                  selectionColor={colors.navy}
                  value={basics.displayName ?? ""}
                />
              </View>

              <View>
                <Text className="font-ui-semibold text-[17px] text-navy">Your age range</Text>
                <View className="mt-3 flex-row flex-wrap gap-2">
                  {ageRanges.map((ageRange) => {
                    const selected = basics.ageRange === ageRange.id;

                    return (
                      <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                        className={
                          selected
                            ? "h-[52px] basis-[30%] flex-grow items-center justify-center rounded-medium bg-navy"
                            : "h-[52px] basis-[30%] flex-grow items-center justify-center rounded-medium border border-border-default bg-surface"
                        }
                        key={ageRange.id}
                        onPress={() => updateBasics({ ageRange: ageRange.id })}
                      >
                        <Text
                          className={
                            selected
                              ? "font-ui-semibold text-[14px] text-surface"
                              : "font-ui-medium text-[14px] text-navy"
                          }
                        >
                          {ageRange.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View>
                <Text className="font-ui-semibold text-[17px] text-navy">Your style direction</Text>
                <Text className="mt-1 font-ui text-[13px] leading-5 text-text-secondary">
                  This helps us make the experience feel right from day one.
                </Text>
                <View className="mt-3 flex-row gap-3">
                  {selectableClothingDirections.map((direction) => (
                    <DirectionOption
                      directionId={direction.id}
                      key={direction.id}
                      label={direction.label}
                      onPress={() => updateBasics({ clothingDirections: [direction.id] })}
                      selected={selectedDirection === direction.id}
                    />
                  ))}
                </View>
              </View>
            </View>
          </Animated.View>

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canContinue }}
            className={
              canContinue
                ? "relative mt-10 h-[58px] items-center justify-center rounded-large bg-navy active:opacity-85"
                : "relative mt-10 h-[58px] items-center justify-center rounded-large bg-navy opacity-40"
            }
            disabled={!canContinue}
            onPress={handleContinue}
          >
            <Text className="font-ui-semibold text-[17px] text-surface">Continue</Text>
            <ArrowRight className="absolute right-5" color={colors.surface} size={24} strokeWidth={1.8} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            className="mt-5 h-12 flex-row items-center justify-center gap-2 active:opacity-60"
            onPress={handleBack}
          >
            <ArrowLeft color={colors.textSecondary} size={21} strokeWidth={1.8} />
            <Text className="font-ui-medium text-[15px] text-text-secondary">Back</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  title: {
    fontFamily: fontFamilies.editorialRegular,
  },
});
