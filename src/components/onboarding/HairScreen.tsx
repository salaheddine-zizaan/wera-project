import {
  getHairStyleAsset,
  getModelBaseForClothingDirection,
} from "@/constants/model-assets";
import {
  faceShapes,
  feminineHairStyles,
  hairColorClassNames,
  hairColors,
  masculineHairStyles,
} from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { HairColorId, HairStyleId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  useReducedMotion,
} from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_HAIR_COLOR: HairColorId = "black";

export function HairScreen() {
  const router = useRouter();
  const clothingDirections = useOnboardingStore((state) => state.profile.basics.clothingDirections);
  const faceShape = useOnboardingStore((state) => state.profile.model.faceShape);
  const savedHairStyle = useOnboardingStore((state) => state.profile.model.hairStyle);
  const savedHairColor = useOnboardingStore((state) => state.profile.model.hairColor);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const modelBase = getModelBaseForClothingDirection(clothingDirections);
  const hairStyles = modelBase === "masculine" ? masculineHairStyles : feminineHairStyles;
  const availableHairStyles = useMemo(
    () => hairStyles.filter((style) => getHairStyleAsset(modelBase, style.id) !== undefined),
    [hairStyles, modelBase],
  );
  const defaultHairStyle = availableHairStyles[0]?.id;
  const restoredHairStyle =
    savedHairStyle && getHairStyleAsset(modelBase, savedHairStyle) ? savedHairStyle : defaultHairStyle;
  const [selectedHairStyleId, setSelectedHairStyleId] = useState<HairStyleId | undefined>(restoredHairStyle);
  const [selectedHairColorId, setSelectedHairColorId] = useState<HairColorId>(
    savedHairColor ?? DEFAULT_HAIR_COLOR,
  );
  const previewAsset = selectedHairStyleId
    ? getHairStyleAsset(modelBase, selectedHairStyleId)
    : undefined;
  const selectedHairStyle = availableHairStyles.find((style) => style.id === selectedHairStyleId);
  const faceShapeLabel = faceShapes.find((shape) => shape.id === faceShape)?.label ?? "selected";

  useEffect(() => {
    setCurrentStep("hair");
  }, [setCurrentStep]);

  useEffect(() => {
    setSelectedHairStyleId(restoredHairStyle);
  }, [restoredHairStyle]);

  useEffect(() => {
    setSelectedHairColorId(savedHairColor ?? DEFAULT_HAIR_COLOR);
  }, [savedHairColor]);

  const handleBack = () => {
    setCurrentStep("face-shape");
    router.back();
  };

  const handleHairStylePress = (hairStyleId: HairStyleId) => {
    setSelectedHairStyleId(hairStyleId);
    updateModel({ hairStyle: hairStyleId });
  };

  const handleHairColorPress = (hairColorId: HairColorId) => {
    setSelectedHairColorId(hairColorId);
    updateModel({ hairColor: hairColorId });
  };

  const handleContinue = () => {
    if (selectedHairStyleId) {
      updateModel({ hairStyle: selectedHairStyleId, hairColor: selectedHairColorId });
    }

    markStepCompleted("hair");
    setCurrentStep(modelBase === "masculine" ? "facial-hair" : "skin-tone");
    router.navigate(modelBase === "masculine" ? "/facial-hair" : "/skin-tone");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 px-5 pb-[2px] pt-[14px]">
        <OnboardingProgress />

        <Animated.View
          className="mt-[19px]"
          entering={reduceMotion ? undefined : FadeInUp.duration(240)}
        >
          <Text className="font-ui-semibold text-[11px] leading-[15px] tracking-[3.2px] text-navy">
            YOUR WERA MODEL
          </Text>
          <Text className="mt-1 font-editorial-regular text-[44px] leading-[47px] tracking-[-1.1px] text-navy">
            Choose your hair.
          </Text>
          <Text className="mt-[7px] font-ui text-[15px] leading-[21px] text-text-secondary">
            Pick a hairstyle and color that feel most you.
          </Text>
        </Animated.View>

        <View className="relative flex-1 min-h-[150px] items-center justify-end overflow-hidden pt-[3px]">
          <View
            className="absolute bottom-0 h-[92%] w-[91%] rounded-t-[172px] bg-surface-secondary"
            pointerEvents="none"
          />
          {previewAsset && selectedHairStyleId ? (
            <Animated.View
              className="h-full w-full items-center justify-end"
              entering={reduceMotion ? undefined : FadeIn.duration(190).easing(Easing.out(Easing.cubic))}
              exiting={reduceMotion ? undefined : FadeOut.duration(120)}
              key={selectedHairStyleId}
            >
              <Animated.Image
                accessibilityLabel={`${selectedHairStyle?.label ?? "Selected"} hairstyle for a ${faceShapeLabel} face shape`}
                className="h-[100%] w-[100%]"
                resizeMode="contain"
                source={previewAsset.source}
              />
            </Animated.View>
          ) : null}
        </View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-ui-semibold text-[11px] leading-[15px] tracking-[2.8px] text-navy">
              HAIRSTYLE
            </Text>
            <Text className="font-ui text-[12px] leading-4 text-text-secondary">Swipe to explore</Text>
          </View>
          <ScrollView
            contentContainerClassName="gap-2.5 pr-5"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {availableHairStyles.map((style) => {
              const isSelected = style.id === selectedHairStyleId;
              const asset = getHairStyleAsset(modelBase, style.id);

              return (
                <Pressable
                  accessibilityLabel={`Select ${style.label} hairstyle`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  className={`h-[105px] w-[78px] items-center justify-between overflow-hidden rounded-medium border-[1.5px] pb-2 pt-1 active:opacity-80 ${
                    isSelected ? "border-navy bg-surface" : "border-transparent bg-surface-secondary"
                  }`}
                  key={style.id}
                  onPress={() => handleHairStylePress(style.id)}
                >
                  {asset ? (
                    <Animated.Image
                      className="-mt-[3px] h-[73px] w-[73px]"
                      resizeMode="contain"
                      source={asset.source}
                    />
                  ) : null}
                  <Text
                    className={`w-full text-center font-ui-medium text-[12px] leading-4 ${
                      isSelected ? "font-ui-semibold text-navy" : "text-text-secondary"
                    }`}
                    numberOfLines={1}
                  >
                    {style.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View className="mt-3 gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-ui-semibold text-[11px] leading-[15px] tracking-[2.8px] text-navy">
              HAIR COLOR
            </Text>
            <Text className="font-ui text-[12px] leading-4 text-text-secondary">Pick your color</Text>
          </View>
          <View accessibilityLabel="Hair color options" className="flex-row items-start justify-between">
            {hairColors.map((color) => {
              const isSelected = color.id === selectedHairColorId;
              const ringClassName = isSelected
                ? "border-2 border-navy"
                : color.id === "gray"
                  ? "border border-border-default"
                  : "border border-muted";

              return (
                <Pressable
                  accessibilityLabel={`Select ${color.label} hair color`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  className="min-w-0 flex-1 items-center active:opacity-80"
                  key={color.id}
                  onPress={() => handleHairColorPress(color.id)}
                >
                  <View className={`h-[46px] w-[46px] items-center justify-center rounded-full ${ringClassName}`}>
                    <View className={`h-[38px] w-[38px] items-center justify-center rounded-full ${hairColorClassNames[color.id]}`}>
                      {isSelected ? <Check color={colors.surface} size={19} strokeWidth={2.1} /> : null}
                    </View>
                  </View>
                  <Text
                    className={`mt-1 w-[42px] text-center font-ui-medium text-[9px] leading-[11px] ${
                      isSelected ? "font-ui-semibold text-navy" : "text-text-secondary"
                    }`}
                    numberOfLines={2}
                  >
                    {color.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Animated.View
          className="gap-px pt-3"
          entering={reduceMotion ? undefined : FadeInUp.delay(80).duration(220)}
        >
          <Pressable
            accessibilityRole="button"
            className="h-[53px] flex-row items-center justify-between rounded-[13px] bg-navy px-5 active:opacity-85"
            onPress={handleContinue}
          >
            <View className="w-[29px]" />
            <Text className="font-ui-medium text-[18px] leading-6 text-surface">Continue</Text>
            <ArrowRight color={colors.surface} size={29} strokeWidth={1.6} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            className="h-[39px] flex-row items-center justify-center gap-3 active:opacity-70"
            onPress={handleBack}
          >
            <ArrowLeft color={colors.navy} size={26} strokeWidth={1.65} />
            <Text className="font-ui-medium text-[17px] leading-[22px] text-navy">Back</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.canvas,
    flex: 1,
  },
});
