import { activityOptions, professions, usualDressingOptions } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { LifestyleActivityId, OnboardingOption } from "@/types/onboarding";

import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Dumbbell,
  GraduationCap,
  Plane,
  Shirt,
  UsersRound,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInRight, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

type QuestionId = "profession" | "usual-dressing" | "activities";

type Question = {
  id: QuestionId;
  title: string;
  helper: string;
};

const QUESTIONS: readonly Question[] = [
  {
    id: "profession",
    title: "What fills most of your week?",
    helper: "This helps Wera understand the moments you dress for most often.",
  },
  {
    id: "usual-dressing",
    title: "How do you usually like to dress?",
    helper: "Choose the direction that feels most like your everyday self.",
  },
  {
    id: "activities",
    title: "What do you make time for?",
    helper: "Select all the moments Wera should keep in mind.",
  },
] as const;

const activityIcons: Record<LifestyleActivityId, typeof Dumbbell> = {
  gym: Dumbbell,
  friends: UsersRound,
  classes: GraduationCap,
  work: BriefcaseBusiness,
  travel: Plane,
  events: CalendarDays,
};

type SelectionOptionProps<Id extends string> = {
  option: OnboardingOption<Id>;
  selected: boolean;
  onPress: () => void;
  Icon?: typeof Dumbbell;
};

function SelectionOption<Id extends string>({
  Icon,
  onPress,
  option,
  selected,
}: SelectionOptionProps<Id>) {
  const OptionIcon = Icon ?? Shirt;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      className={
        selected
          ? "relative h-[104px] w-[48.2%] items-center justify-center rounded-medium border border-navy bg-[#F7F8FA] px-3"
          : "relative h-[104px] w-[48.2%] items-center justify-center rounded-medium border border-border-default bg-surface px-3"
      }
      onPress={onPress}
    >
      <View
        className={
          selected
            ? "h-11 w-11 items-center justify-center rounded-full bg-[#E7EBF2]"
            : "h-11 w-11 items-center justify-center rounded-full bg-surface-secondary"
        }
      >
        <OptionIcon color={colors.navy} size={25} strokeWidth={1.55} />
      </View>
      <Text className="mt-2 text-center font-ui-medium text-[14px] leading-[19px] text-navy">
        {option.label}
      </Text>
      {selected ? (
        <View className="absolute right-[9px] top-[9px] h-5 w-5 items-center justify-center rounded-full bg-navy">
          <Check color={colors.surface} size={13} strokeWidth={2.4} />
        </View>
      ) : null}
    </Pressable>
  );
}

export function DailyLifeScreen() {
  const router = useRouter();
  const lifestyle = useOnboardingStore((state) => state.profile.lifestyle);
  const updateLifestyle = useOnboardingStore((state) => state.updateLifestyle);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = QUESTIONS[questionIndex];
  const isLastQuestion = questionIndex === QUESTIONS.length - 1;

  useEffect(() => {
    setCurrentStep("daily-life");
  }, [setCurrentStep]);

  const hasAnswer =
    question.id === "profession"
      ? Boolean(lifestyle.profession)
      : question.id === "usual-dressing"
        ? Boolean(lifestyle.usualDressing)
        : lifestyle.activities.length > 0;

  const toggleActivity = (activityId: LifestyleActivityId) => {
    const activities = lifestyle.activities.includes(activityId)
      ? lifestyle.activities.filter((activity) => activity !== activityId)
      : [...lifestyle.activities, activityId];

    updateLifestyle({ activities });
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex((currentIndex) => currentIndex - 1);
      return;
    }

    setCurrentStep("about-you");
    router.back();
  };

  const handleNext = () => {
    if (!hasAnswer) {
      return;
    }

    if (!isLastQuestion) {
      setQuestionIndex((currentIndex) => currentIndex + 1);
      return;
    }

    markStepCompleted("daily-life");
    setCurrentStep("model-method");
    router.navigate("/model-method");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 px-5 pb-6 pt-4">
        <OnboardingProgress />

        <Animated.View
          entering={reduceMotion ? undefined : FadeInRight.duration(260)}
          key={question.id}
          className="flex-1"
        >
          <View className="mt-[30px]">
            <Text className="font-ui-semibold text-[12px] leading-[14px] tracking-[3.1px] text-navy">
              YOUR DAILY LIFE
            </Text>
            <Text className="mt-[7px] pb-0.5 font-editorial-regular text-[47px] leading-[51px] tracking-[-1.1px] text-navy">
              {question.title}
            </Text>
            <Text className="mt-4 max-w-[320px] font-ui text-[14px] leading-5 text-text-secondary">
              {question.helper}
            </Text>
          </View>

          <View className="mt-8 flex-row flex-wrap justify-between gap-y-3">
            {question.id === "profession"
              ? professions.map((option) => (
                  <SelectionOption
                    key={option.id}
                    onPress={() => updateLifestyle({ profession: option.id })}
                    option={option}
                    selected={lifestyle.profession === option.id}
                  />
                ))
              : null}
            {question.id === "usual-dressing"
              ? usualDressingOptions.map((option) => (
                  <SelectionOption
                    key={option.id}
                    onPress={() => updateLifestyle({ usualDressing: option.id })}
                    option={option}
                    selected={lifestyle.usualDressing === option.id}
                  />
                ))
              : null}
            {question.id === "activities"
              ? activityOptions.map((option) => (
                  <SelectionOption
                    Icon={activityIcons[option.id]}
                    key={option.id}
                    onPress={() => toggleActivity(option.id)}
                    option={option}
                    selected={lifestyle.activities.includes(option.id)}
                  />
                ))
              : null}
          </View>
        </Animated.View>

        <View className="mt-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-ui-medium text-[13px] leading-5 text-text-secondary">
              Question {questionIndex + 1} of {QUESTIONS.length}
            </Text>
            <View className="flex-row gap-1.5">
              {QUESTIONS.map((item, index) => (
                <View
                  className={
                    index <= questionIndex
                      ? "h-1.5 w-5 rounded-full bg-navy"
                      : "h-1.5 w-5 rounded-full bg-muted"
                  }
                  key={item.id}
                />
              ))}
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !hasAnswer }}
            className={
              hasAnswer
                ? "relative h-[54px] items-center justify-center rounded-small bg-navy"
                : "relative h-[54px] items-center justify-center rounded-small bg-navy opacity-40"
            }
            disabled={!hasAnswer}
            onPress={handleNext}
          >
            <Text className="font-ui-medium text-[17px] leading-6 text-surface">
              {isLastQuestion ? "Continue" : "Next"}
            </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
