import { ageRanges, clothingDirections } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { ClothingDirectionId } from "@/types/onboarding";

import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Check, Mars, UserRound, Venus } from "lucide-react-native";
import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
          ? "relative h-[100px] flex-1 items-center justify-center rounded-medium border border-navy bg-[#F7F8FA]"
          : "relative h-[100px] flex-1 items-center justify-center rounded-medium border border-border-default bg-surface"
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
        <Icon color={colors.navy} size={31} strokeWidth={1.55} />
      </View>
      <Text className="mt-[7px] font-ui-medium text-[15px] leading-[21px] text-navy">{label}</Text>
      {selected ? (
        <View className="absolute right-[9px] top-[9px] h-5 w-5 items-center justify-center rounded-full bg-navy">
          <Check color={colors.surface} size={13} strokeWidth={2.4} />
        </View>
      ) : null}
    </Pressable>
  );
}

export function AboutYouScreen() {
  const router = useRouter();
  const { user } = useUser();
  const basics = useOnboardingStore((state) => state.profile.basics);
  const updateBasics = useOnboardingStore((state) => state.updateBasics);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();

  const selectedDirection = basics.clothingDirections.find(
    (direction) => direction === "menswear" || direction === "womenswear",
  );
  const clerkUsername = user?.username?.trim();
  const displayName = clerkUsername ?? basics.displayName ?? "";
  const canContinue = Boolean(displayName.trim() && basics.ageRange && selectedDirection);

  useEffect(() => {
    setCurrentStep("about-you");
  }, [setCurrentStep]);

  useEffect(() => {
    if (clerkUsername && basics.displayName !== clerkUsername) {
      updateBasics({ displayName: clerkUsername });
    }
  }, [basics.displayName, clerkUsername, updateBasics]);

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
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        className="flex-1"
      >
        <View className="flex-1 px-5 pb-6 pt-4">
          <OnboardingProgress />

          <Animated.View entering={reduceMotion ? undefined : FadeIn.duration(260)} className="flex-1">
            <View className="mt-[30px]">
              <Text className="font-ui-semibold text-[12px] leading-[14px] tracking-[3.1px] text-navy">
                LET&apos;S BEGIN
              </Text>
              <Text className="mt-[7px] pb-0.5 font-editorial-regular text-[50px] leading-[52px] tracking-[-1.1px] text-navy">
                with you.
              </Text>
            </View>

            <View className="mt-7 gap-6">
              <View>
                <Text className="font-ui-medium text-[16px] leading-5 text-navy">
                  What should Wera call you?
                </Text>
                <View className="mt-2.5 h-14 flex-row items-center gap-[14px] rounded-medium border border-border-default bg-surface px-4">
                  <UserRound color={colors.textPrimary} size={27} strokeWidth={1.55} />
                  <TextInput
                    accessibilityLabel="Your first name"
                    autoCapitalize="words"
                    autoComplete="name"
                    className="h-full flex-1 font-ui text-[16px] text-navy"
                    editable={!clerkUsername}
                    onChangeText={(nextDisplayName) => updateBasics({ displayName: nextDisplayName })}
                    placeholder="First name"
                    placeholderTextColor={colors.textSecondary}
                    returnKeyType="done"
                    selectionColor={colors.navy}
                    value={displayName}
                  />
                </View>
              </View>

              <View>
                <Text className="font-ui-medium text-[16px] leading-5 text-navy">
                  Which age range fits you best?
                </Text>
                <View className="mt-2.5 flex-row flex-wrap justify-between gap-y-2">
                  {ageRanges.map((ageRange) => {
                    const selected = basics.ageRange === ageRange.id;

                    return (
                      <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                        className={
                          selected
                            ? "h-12 w-[31.1%] items-center justify-center rounded-small border border-navy bg-navy"
                            : "h-12 w-[31.1%] items-center justify-center rounded-small border border-border-default bg-surface"
                        }
                        key={ageRange.id}
                        onPress={() => updateBasics({ ageRange: ageRange.id })}
                      >
                        <Text
                          className={
                            selected
                              ? "font-ui-medium text-[15px] leading-5 text-surface"
                              : "font-ui-medium text-[15px] leading-5 text-navy"
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
                <Text className="font-ui-medium text-[16px] leading-5 text-navy">
                  I&apos;m here to discover
                </Text>
                <View className="mt-2.5 flex-row gap-3">
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

          <View className="mt-6">
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !canContinue }}
              className={
                canContinue
                  ? "relative h-[54px] items-center justify-center rounded-small bg-navy"
                  : "relative h-[54px] items-center justify-center rounded-small bg-navy opacity-40"
              }
              disabled={!canContinue}
              onPress={handleContinue}
            >
              <Text className="font-ui-medium text-[17px] leading-6 text-surface">Continue</Text>
              <View className="absolute right-5 top-0 h-full justify-center">
                <ArrowRight color={colors.surface} size={28} strokeWidth={1.55} />
              </View>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              className="mt-1.5 h-11 flex-row items-center justify-center gap-[14px]"
              onPress={handleBack}
            >
              <ArrowLeft color={colors.navy} size={27} strokeWidth={1.55} />
              <Text className="font-ui-medium text-[16px] leading-[22px] text-navy">Back</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
