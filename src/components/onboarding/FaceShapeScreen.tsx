import {
  faceShapeModelAssets,
  getModelBaseForClothingDirection,
} from "@/constants/model-assets";
import { faceShapes } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { FaceShapeId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useReducedMotion,
} from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_FACE_SHAPE_ID: FaceShapeId = "oval";

export function FaceShapeScreen() {
  const router = useRouter();
  const clothingDirections = useOnboardingStore((state) => state.profile.basics.clothingDirections);
  const savedFaceShape = useOnboardingStore((state) => state.profile.model.faceShape);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const modelBase = getModelBaseForClothingDirection(clothingDirections);
  const [selectedFaceShapeId, setSelectedFaceShapeId] = useState<FaceShapeId>(
    savedFaceShape ?? DEFAULT_FACE_SHAPE_ID,
  );
  const previewAsset = faceShapeModelAssets[modelBase][selectedFaceShapeId];

  useEffect(() => {
    setCurrentStep("face-shape");
  }, [setCurrentStep]);

  useEffect(() => {
    if (savedFaceShape) {
      setSelectedFaceShapeId(savedFaceShape);
    }
  }, [savedFaceShape]);

  const handleFaceShapePress = (faceShapeId: FaceShapeId) => {
    setSelectedFaceShapeId(faceShapeId);
    updateModel({ faceShape: faceShapeId });
  };

  const handleBack = () => {
    setCurrentStep("body-shape");
    router.back();
  };

  const handleContinue = () => {
    updateModel({ faceShape: selectedFaceShapeId });
    markStepCompleted("face-shape");
    setCurrentStep("hair");
    router.navigate("/hair");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 px-5 pb-[2px] pt-[14px]">
        <OnboardingProgress />

        <Animated.View
          className="mt-[19px]"
          entering={reduceMotion ? undefined : FadeIn.duration(220)}
        >
          <Text className="font-ui-semibold text-[11px] leading-[15px] tracking-[3.2px] text-navy">
            YOUR WERA MODEL
          </Text>
          <Text className="mt-1 font-editorial-regular text-[44px] leading-[47px] tracking-[-1.1px] text-navy">
            Choose your face shape.
          </Text>
          <Text className="mt-[7px] font-ui text-[15px] leading-[21px] text-text-secondary">
            Choose the shape that feels most like you.
          </Text>
        </Animated.View>

        <View className="relative flex-1 min-h-[180px] items-center justify-end overflow-hidden pt-[3px]">
          <View
            className="absolute bottom-0 h-[92%] w-[91%] rounded-t-[172px] bg-surface-secondary"
            pointerEvents="none"
          />
          <Animated.View
            className="h-full w-full items-center justify-end"
            entering={reduceMotion ? undefined : FadeIn.duration(190).easing(Easing.out(Easing.cubic))}
            exiting={reduceMotion ? undefined : FadeOut.duration(120)}
            key={selectedFaceShapeId}
          >
            <Animated.Image
              accessibilityLabel={`${faceShapes.find((faceShape) => faceShape.id === selectedFaceShapeId)?.label ?? "Selected"} face shape`}
              className="h-full w-full"
              resizeMode="contain"
              source={previewAsset.source}
            />
          </Animated.View>
        </View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-ui-semibold text-[11px] leading-[15px] tracking-[2.8px] text-navy">
              FACE SHAPE
            </Text>
            <Text className="font-ui text-[12px] leading-4 text-text-secondary">Swipe to explore</Text>
          </View>
          <ScrollView
            contentContainerClassName="gap-2.5 pr-5"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {faceShapes.map((faceShape) => {
              const isSelected = faceShape.id === selectedFaceShapeId;
              const asset = faceShapeModelAssets[modelBase][faceShape.id];

              return (
                <Pressable
                  accessibilityLabel={`Select ${faceShape.label} face shape`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  className={`h-[105px] w-[78px] items-center justify-between overflow-hidden rounded-medium border-[1.5px] pb-2 pt-1 active:opacity-80 ${
                    isSelected ? "border-navy bg-surface" : "border-transparent bg-surface-secondary"
                  }`}
                  key={faceShape.id}
                  onPress={() => handleFaceShapePress(faceShape.id)}
                >
                  <Animated.Image
                    className="-mt-[3px] h-[73px] w-[73px]"
                    resizeMode="contain"
                    source={asset.source}
                  />
                  <Text
                    className={`w-full text-center font-ui-medium text-[12px] leading-4 ${
                      isSelected ? "font-ui-semibold text-navy" : "text-text-secondary"
                    }`}
                    numberOfLines={1}
                  >
                    {faceShape.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <Animated.View
          className="gap-px pt-3"
          entering={reduceMotion ? undefined : FadeIn.delay(80).duration(200)}
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
