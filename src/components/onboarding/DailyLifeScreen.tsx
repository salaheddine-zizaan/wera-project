import {
  activityLevels,
  commonOccasions,
  dressCodes,
  environments,
  routines,
} from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type {
  ActivityLevelId,
  CommonOccasionId,
  DressCodeId,
  EnvironmentId,
  OnboardingOption,
  RoutineId,
} from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingProgress } from "./OnboardingProgress";

type OptionChipsProps<Id extends string> = {
  options: readonly OnboardingOption<Id>[];
  selectedIds: readonly Id[];
  onPress: (id: Id) => void;
};

function OptionChips<Id extends string>({ options, onPress, selectedIds }: OptionChipsProps<Id>) {
  return (
    <View className="mt-3 flex-row flex-wrap gap-2">
      {options.map((option) => {
        const selected = selectedIds.includes(option.id);

        return (
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected }}
            className={
              selected
                ? "min-h-11 flex-row items-center rounded-full bg-navy px-4 py-2"
                : "min-h-11 flex-row items-center rounded-full border border-border-default bg-surface px-4 py-2"
            }
            key={option.id}
            onPress={() => onPress(option.id)}
          >
            <Text
              className={
                selected
                  ? "font-ui-medium text-[13px] leading-5 text-surface"
                  : "font-ui-medium text-[13px] leading-5 text-navy"
              }
            >
              {option.label}
            </Text>
            {selected && <Check className="ml-1" color={colors.surface} size={15} strokeWidth={2.2} />}
          </Pressable>
        );
      })}
    </View>
  );
}

export function DailyLifeScreen() {
  const router = useRouter();
  const lifestyle = useOnboardingStore((state) => state.profile.lifestyle);
  const updateLifestyle = useOnboardingStore((state) => state.updateLifestyle);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);

  useEffect(() => {
    setCurrentStep("daily-life");
  }, [setCurrentStep]);

  const toggleOccasion = (occasionId: CommonOccasionId) => {
    const commonOccasions = lifestyle.commonOccasions.includes(occasionId)
      ? lifestyle.commonOccasions.filter((id) => id !== occasionId)
      : [...lifestyle.commonOccasions, occasionId];

    updateLifestyle({ commonOccasions });
  };

  const handleBack = () => {
    setCurrentStep("about-you");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <OnboardingProgress />

        <View className="mt-12">
          <Text className="font-ui-semibold text-[17px] leading-6 text-warm-accent">
            Help us understand your rhythm
          </Text>
          <Text className="mt-3 text-[50px] leading-[47px] tracking-[-1px] text-navy" style={styles.title}>
            Tell us about{"\n"}your days
          </Text>
          <Text className="mt-4 font-ui text-[14px] leading-5 text-text-secondary">
            A little context helps Wera make recommendations that fit your real life.
          </Text>
        </View>

        <View className="mt-8 rounded-large border border-border-subtle bg-surface px-5 py-6">
          <Text className="font-ui-semibold text-[17px] leading-6 text-navy">
            What does most of your week look like?
          </Text>
          <OptionChips<RoutineId>
            onPress={(routine) => updateLifestyle({ routine })}
            options={routines}
            selectedIds={lifestyle.routine ? [lifestyle.routine] : []}
          />

          <Text className="mt-7 font-ui-semibold text-[17px] leading-6 text-navy">
            Where do you spend most of your time?
          </Text>
          <OptionChips<EnvironmentId>
            onPress={(environment) => updateLifestyle({ environment })}
            options={environments}
            selectedIds={lifestyle.environment ? [lifestyle.environment] : []}
          />

          <Text className="mt-7 font-ui-semibold text-[17px] leading-6 text-navy">
            What&apos;s your usual dress code?
          </Text>
          <OptionChips<DressCodeId>
            onPress={(dressCode) => updateLifestyle({ dressCode })}
            options={dressCodes}
            selectedIds={lifestyle.dressCode ? [lifestyle.dressCode] : []}
          />

          <Text className="mt-7 font-ui-semibold text-[17px] leading-6 text-navy">
            How active are your days?
          </Text>
          <OptionChips<ActivityLevelId>
            onPress={(activityLevel) => updateLifestyle({ activityLevel })}
            options={activityLevels}
            selectedIds={lifestyle.activityLevel ? [lifestyle.activityLevel] : []}
          />

          <Text className="mt-7 font-ui-semibold text-[17px] leading-6 text-navy">
            Common occasions
          </Text>
          <Text className="mt-1 font-ui text-[13px] leading-5 text-text-secondary">
            Select any that come up often.
          </Text>
          <OptionChips<CommonOccasionId>
            onPress={toggleOccasion}
            options={commonOccasions}
            selectedIds={lifestyle.commonOccasions}
          />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamilies.editorialRegular,
  },
});
