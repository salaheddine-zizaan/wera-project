import {
  faceShapeModelAssets,
  getModelBaseForClothingDirection,
} from "@/constants/model-assets";
import { faceShapes } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { FaceShapeId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Ellipse, Path, Polygon, Rect } from "react-native-svg";
import Animated, {
  Easing,
  FadeIn,
  FadeInRight,
  FadeInUp,
  FadeOut,
  useReducedMotion,
} from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_FACE_SHAPE_ID: FaceShapeId = "oval";

type FaceShapeOutlineProps = {
  color: string;
  shape: FaceShapeId;
};

function FaceShapeOutline({ color, shape }: FaceShapeOutlineProps) {
  const commonProps = { fill: "none", stroke: color, strokeWidth: 1.8 };

  return (
    <Svg accessibilityElementsHidden height={31} viewBox="0 0 32 32" width={31}>
      {shape === "oval" ? <Ellipse {...commonProps} cx={16} cy={16} rx={9} ry={12} /> : null}
      {shape === "round" ? <Circle {...commonProps} cx={16} cy={16} r={10} /> : null}
      {shape === "square" ? <Rect {...commonProps} height={20} rx={3} width={20} x={6} y={6} /> : null}
      {shape === "heart" ? (
        <Path
          {...commonProps}
          d="M16 26.5 6.3 17.3A6.4 6.4 0 0 1 15.4 8l.6.7.6-.7a6.4 6.4 0 0 1 9.1 9.3Z"
        />
      ) : null}
      {shape === "diamond" ? <Polygon {...commonProps} points="16,4.5 26,16 16,27.5 6,16" /> : null}
    </Svg>
  );
}

export function FaceShapeScreen() {
  const router = useRouter();
  const basics = useOnboardingStore((state) => state.profile.basics);
  const savedFaceShape = useOnboardingStore((state) => state.profile.model.faceShape);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const modelBase = getModelBaseForClothingDirection(basics.clothingDirections);
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

  const handleContinue = () => {
    updateModel({ faceShape: selectedFaceShapeId });
    markStepCompleted("face-shape");
    setCurrentStep("hair");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View style={styles.screen}>
        <OnboardingProgress />

        <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)} style={styles.header}>
          <Text style={styles.eyebrow}>YOUR WERA MODEL</Text>
          <Text style={styles.title}>Choose your face shape.</Text>
        </Animated.View>

        <Animated.View
          entering={reduceMotion ? undefined : FadeInUp.delay(90).duration(280).easing(Easing.out(Easing.cubic))}
          style={styles.previewStage}
        >
          <Animated.View
            entering={reduceMotion ? undefined : FadeIn.duration(180)}
            exiting={reduceMotion ? undefined : FadeOut.duration(120)}
            key={selectedFaceShapeId}
            style={styles.previewAsset}
          >
            <Animated.Image
              accessibilityLabel={`${faceShapes.find((faceShape) => faceShape.id === selectedFaceShapeId)?.label ?? "Selected"} face shape`}
              resizeMode="contain"
              source={previewAsset.source}
              style={styles.previewImage}
            />
          </Animated.View>
        </Animated.View>

        <View accessibilityLabel="Face shape options" style={styles.optionRow}>
          {faceShapes.map((faceShape) => {
            const isSelected = faceShape.id === selectedFaceShapeId;
            const optionColor = isSelected ? colors.navy : colors.textSecondary;

            return (
              <Pressable
                accessibilityLabel={`Select ${faceShape.label} face shape`}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                key={faceShape.id}
                onPress={() => handleFaceShapePress(faceShape.id)}
                style={styles.optionButton}
              >
                <View style={isSelected ? styles.selectedIconWrap : undefined}>
                  <FaceShapeOutline color={optionColor} shape={faceShape.id} />
                </View>
                <Text style={[styles.optionLabel, isSelected ? styles.selectedOptionLabel : undefined]}>
                  {faceShape.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Animated.View
          entering={reduceMotion ? undefined : FadeInUp.delay(160).duration(220)}
          style={styles.actions}
        >
          <Pressable accessibilityRole="button" onPress={handleContinue} style={styles.continueButton}>
            <View style={styles.buttonSideSpacer} />
            <Text style={styles.continueLabel}>Continue</Text>
            <ArrowRight color={colors.surface} size={28} strokeWidth={1.55} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setCurrentStep("body-shape");
              router.back();
            }}
            style={styles.backButton}
          >
            <ArrowLeft color={colors.navy} size={27} strokeWidth={1.55} />
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: { gap: 2, paddingTop: 14 },
  backButton: { alignItems: "center", flexDirection: "row", gap: 14, height: 44, justifyContent: "center" },
  backLabel: { color: colors.navy, fontFamily: fontFamilies.uiMedium, fontSize: 16, lineHeight: 22 },
  buttonSideSpacer: { width: 28 },
  continueButton: {
    alignItems: "center",
    backgroundColor: colors.navy,
    borderRadius: 10,
    flexDirection: "row",
    height: 54,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  continueLabel: { color: colors.surface, fontFamily: fontFamilies.uiMedium, fontSize: 17, lineHeight: 24 },
  eyebrow: { color: colors.navy, fontFamily: fontFamilies.uiSemibold, fontSize: 11, letterSpacing: 3, lineHeight: 14 },
  header: { marginTop: 20 },
  optionButton: { alignItems: "center", flex: 1, gap: 3, justifyContent: "center", minHeight: 64, paddingHorizontal: 1, paddingVertical: 4 },
  optionLabel: { color: colors.textSecondary, fontFamily: fontFamilies.ui, fontSize: 11, lineHeight: 14, textAlign: "center" },
  optionRow: { alignItems: "flex-start", flexDirection: "row", marginHorizontal: -4, paddingTop: 4 },
  previewAsset: { alignItems: "center", justifyContent: "center" },
  previewImage: { height: 264, width: 264 },
  previewStage: { alignItems: "center", flex: 1, justifyContent: "center", minHeight: 220, paddingVertical: 10 },
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  screen: { flex: 1, paddingBottom: 2, paddingHorizontal: 20, paddingTop: 16 },
  selectedIconWrap: { borderColor: colors.navy, borderRadius: 14, borderWidth: 1, padding: 4 },
  selectedOptionLabel: { color: colors.navy, fontFamily: fontFamilies.uiSemibold },
  title: { color: colors.navy, fontFamily: fontFamilies.editorialRegular, fontSize: 48, letterSpacing: -1, lineHeight: 50, marginTop: 3 },
});
