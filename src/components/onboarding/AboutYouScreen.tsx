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

import { OnboardingProgress } from "./OnboardingProgress";

const selectableClothingDirections = clothingDirections
  .filter(
    (direction): direction is (typeof clothingDirections)[number] & {
      id: Exclude<ClothingDirectionId, "both">;
    } => direction.id !== "both",
  )
  .sort((firstDirection, secondDirection) =>
    firstDirection.label.localeCompare(secondDirection.label),
  );

function DirectionIcon({ directionId, selected }: { directionId: ClothingDirectionId; selected: boolean }) {
  const Icon = directionId === "menswear" ? Mars : Venus;

  return (
    <View
      className={
        selected
          ? "h-14 w-14 items-center justify-center rounded-full bg-navy"
          : "h-14 w-14 items-center justify-center rounded-full bg-surface-secondary"
      }
    >
      <Icon color={selected ? colors.surface : colors.navy} size={31} strokeWidth={1.55} />
    </View>
  );
}

export function AboutYouScreen() {
  const router = useRouter();
  const basics = useOnboardingStore((state) => state.profile.basics);
  const updateBasics = useOnboardingStore((state) => state.updateBasics);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);

  const selectedDirection = basics.clothingDirections.find(
    (direction) => direction === "menswear" || direction === "womenswear",
  );
  const canContinue = Boolean(
    basics.displayName?.trim() && basics.ageRange && selectedDirection,
  );

  useEffect(() => {
    setCurrentStep("about-you");
  }, [setCurrentStep]);

  const handleDirectionChange = (directionId: Exclude<ClothingDirectionId, "both">) => {
    updateBasics({ clothingDirections: [directionId] });
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    markStepCompleted("about-you");
    setCurrentStep("daily-life");
    router.push("/daily-life");
  };

  const handleBack = () => {
    setCurrentStep(undefined);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <OnboardingProgress />

          <View className="mt-12">
            <Text className="font-ui-semibold text-[17px] leading-6 text-warm-accent">
              Let&apos;s get to know you
            </Text>
            <Text className="mt-3 text-[52px] leading-[48px] tracking-[-1px] text-navy" style={styles.title}>
              Let&apos;s start{"\n"}with you
            </Text>
          </View>

          <View className="mt-8 rounded-large border border-border-subtle bg-surface px-5 py-6">
            <Text className="font-ui-semibold text-[18px] leading-6 text-navy">Your name</Text>
            <TextInput
              accessibilityLabel="Your name"
              autoCapitalize="words"
              className="mt-4 h-[54px] rounded-medium border border-border-default px-4 font-ui text-[16px] text-navy"
              onChangeText={(displayName) => updateBasics({ displayName })}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
              returnKeyType="done"
              value={basics.displayName ?? ""}
            />

            <Text className="mt-7 font-ui-semibold text-[18px] leading-6 text-navy">Age range</Text>
            <View className="mt-4 flex-row flex-wrap gap-2">
              {ageRanges.map((ageRange) => {
                const selected = basics.ageRange === ageRange.id;

                return (
                  <Pressable
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    className={
                      selected
                        ? "relative h-[58px] basis-[31%] flex-grow items-center justify-center rounded-medium bg-navy"
                        : "h-[58px] basis-[31%] flex-grow items-center justify-center rounded-medium border border-border-default bg-surface"
                    }
                    key={ageRange.id}
                    onPress={() => updateBasics({ ageRange: ageRange.id })}
                  >
                    <Text
                      className={
                        selected
                          ? "font-ui-medium text-[15px] text-surface"
                          : "font-ui-medium text-[15px] text-navy"
                      }
                    >
                      {ageRange.label}
                    </Text>
                    {selected && (
                      <View className="absolute right-2 top-2 h-5 w-5 items-center justify-center rounded-full bg-surface">
                        <Check color={colors.navy} size={14} strokeWidth={2.5} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <Text className="mt-7 font-ui-semibold text-[18px] leading-6 text-navy">
              Your direction
            </Text>
            <View className="mt-4 flex-row gap-3">
              {selectableClothingDirections.map((direction) => {
                const selected = selectedDirection === direction.id;

                return (
                  <Pressable
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    className={
                      selected
                        ? "relative h-[158px] flex-1 items-center justify-center rounded-medium border border-navy bg-surface"
                        : "h-[158px] flex-1 items-center justify-center rounded-medium border border-border-default bg-surface"
                    }
                    key={direction.id}
                    onPress={() => handleDirectionChange(direction.id)}
                  >
                    <DirectionIcon directionId={direction.id} selected={selected} />
                    <Text
                      className={
                        selected
                          ? "mt-3 font-ui-semibold text-[16px] leading-5 text-navy"
                          : "mt-3 font-ui-medium text-[16px] leading-5 text-text-secondary"
                      }
                    >
                      {direction.label}
                    </Text>
                    {selected && (
                      <View className="absolute right-3 top-3 h-6 w-6 items-center justify-center rounded-full bg-navy">
                        <Check color={colors.surface} size={15} strokeWidth={2.2} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !canContinue }}
              className={
                canContinue
                  ? "relative mt-7 h-[58px] items-center justify-center rounded-medium bg-navy active:opacity-85"
                  : "relative mt-7 h-[58px] items-center justify-center rounded-medium bg-navy opacity-40"
              }
              disabled={!canContinue}
              onPress={handleContinue}
            >
              <Text className="font-ui-semibold text-[18px] text-surface">Continue</Text>
              <View className="absolute right-4 h-9 w-9 items-center justify-center rounded-full bg-[#263958]">
                <ArrowRight color={colors.surface} size={23} strokeWidth={1.9} />
              </View>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            className="mt-6 h-12 flex-row items-center justify-center gap-2 active:opacity-60"
            onPress={handleBack}
          >
            <ArrowLeft color={colors.textSecondary} size={23} strokeWidth={1.8} />
            <Text className="font-ui-medium text-[16px] text-text-secondary">Back</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamilies.editorialRegular,
  },
});
