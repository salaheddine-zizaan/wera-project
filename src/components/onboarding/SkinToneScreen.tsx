import {
  getModelBaseForClothingDirection,
  getSkinToneModelAsset,
} from "@/constants/model-assets";
import { skinTones } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { SkinToneId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { Easing, FadeIn, FadeOut, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_SKIN_TONE: SkinToneId = "tone-03";

export function SkinToneScreen() {
  const router = useRouter();
  const clothingDirections = useOnboardingStore((state) => state.profile.basics.clothingDirections);
  const savedSkinTone = useOnboardingStore((state) => state.profile.model.skinTone);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const modelBase = getModelBaseForClothingDirection(clothingDirections);
  const [selectedSkinTone, setSelectedSkinTone] = useState<SkinToneId>(
    savedSkinTone ?? DEFAULT_SKIN_TONE,
  );
  const previewAsset = getSkinToneModelAsset(modelBase, selectedSkinTone);

  useEffect(() => {
    setCurrentStep("skin-tone");
  }, [setCurrentStep]);

  useEffect(() => {
    setSelectedSkinTone(savedSkinTone ?? DEFAULT_SKIN_TONE);
  }, [savedSkinTone]);

  const handleSelect = (skinTone: SkinToneId) => {
    setSelectedSkinTone(skinTone);
    updateModel({ skinTone });
  };

  const handleBack = () => {
    setCurrentStep(modelBase === "masculine" ? "facial-hair" : "hair");
    router.back();
  };

  const handleContinue = () => {
    updateModel({ skinTone: selectedSkinTone });
    markStepCompleted("skin-tone");
    setCurrentStep("model-reveal");
    router.navigate("/model-reveal");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View style={styles.screen}>
        <OnboardingProgress />

        <View style={styles.header}>
          <Text style={styles.eyebrow}>YOUR WERA MODEL</Text>
          <Text style={styles.title}>Choose your skin tone.</Text>
          <Text style={styles.helper}>Choose the tone that feels most like you.</Text>
        </View>

        <View style={styles.previewStage}>
          <View pointerEvents="none" style={styles.previewBackdrop} />
          <Animated.View
            entering={reduceMotion ? undefined : FadeIn.duration(220).easing(Easing.out(Easing.cubic))}
            exiting={reduceMotion ? undefined : FadeOut.duration(150)}
            key={`${modelBase}-${selectedSkinTone}`}
            style={styles.previewImageWrapper}
          >
            <Animated.Image
              accessibilityLabel={`${skinTones.find((tone) => tone.id === selectedSkinTone)?.label ?? "Selected"} skin tone preview`}
              resizeMode="contain"
              source={previewAsset.source}
              style={styles.previewImage}
            />
          </Animated.View>
        </View>

        <View style={styles.swatchesSection}>
          <View style={styles.swatchesHeader}>
            <Text style={styles.swatchesTitle}>SKIN TONE</Text>
            <Text style={styles.swatchesHint}>Tap to preview</Text>
          </View>
          <View accessibilityLabel="Skin tone options" style={styles.swatches}>
            {skinTones.map((tone) => {
              const isSelected = tone.id === selectedSkinTone;

              return (
                <Pressable
                  accessibilityLabel={`Select ${tone.label}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  key={tone.id}
                  onPress={() => handleSelect(tone.id)}
                  style={({ pressed }) => [
                    styles.swatchButton,
                    pressed ? styles.swatchButtonPressed : undefined,
                  ]}
                >
                  <View style={[styles.swatchRing, isSelected ? styles.swatchRingSelected : undefined]}>
                    <View style={[styles.swatch, { backgroundColor: tone.hex }]} />
                    {isSelected ? (
                      <View style={styles.swatchCheckBadge}>
                        <Check color={colors.surface} size={12} strokeWidth={2.6} />
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.swatchLabel, isSelected ? styles.swatchLabelSelected : undefined]}>
                    {tone.id.replace("tone-", "")}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={handleContinue} style={styles.continueButton}>
            <View style={styles.buttonSideSpacer} />
            <Text style={styles.continueLabel}>Continue</Text>
            <ArrowRight color={colors.surface} size={28} strokeWidth={1.6} />
          </Pressable>
          <Pressable accessibilityRole="button" onPress={handleBack} style={styles.backButton}>
            <ArrowLeft color={colors.navy} size={26} strokeWidth={1.65} />
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: { gap: 2, paddingTop: 12 },
  backButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: 13,
    height: 40,
    justifyContent: "center",
  },
  backLabel: { color: colors.navy, fontFamily: fontFamilies.uiMedium, fontSize: 17, lineHeight: 22 },
  buttonSideSpacer: { width: 28 },
  continueButton: {
    alignItems: "center",
    backgroundColor: colors.navy,
    borderRadius: 13,
    flexDirection: "row",
    height: 53,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  continueLabel: { color: colors.surface, fontFamily: fontFamilies.uiMedium, fontSize: 18, lineHeight: 24 },
  eyebrow: { color: colors.navy, fontFamily: fontFamilies.uiSemibold, fontSize: 11, letterSpacing: 3, lineHeight: 15 },
  header: { marginTop: 19 },
  helper: { color: colors.textSecondary, fontFamily: fontFamilies.ui, fontSize: 15, lineHeight: 21, marginTop: 7 },
  previewBackdrop: {
    backgroundColor: colors.surfaceSecondary,
    borderTopLeftRadius: 172,
    borderTopRightRadius: 172,
    bottom: 0,
    height: "91%",
    position: "absolute",
    width: "90%",
  },
  previewImage: { height: "100%", width: "100%" },
  previewImageWrapper: { height: "100%", width: "100%" },
  previewStage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    minHeight: 220,
    overflow: "hidden",
    paddingTop: 8,
    position: "relative",
  },
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  screen: { flex: 1, paddingBottom: 2, paddingHorizontal: 20, paddingTop: 14 },
  swatch: { borderRadius: 28, height: 56, width: 56 },
  swatchButton: {
    alignItems: "center",
    flexBasis: "25%",
    minHeight: 86,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  swatchButtonPressed: { opacity: 0.78, transform: [{ scale: 0.97 }] },
  swatchCheckBadge: {
    alignItems: "center",
    backgroundColor: colors.navy,
    borderColor: colors.canvas,
    borderRadius: 11,
    borderWidth: 2,
    bottom: -1,
    height: 22,
    justifyContent: "center",
    position: "absolute",
    right: -1,
    width: 22,
  },
  swatchLabel: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.uiMedium,
    fontSize: 10,
    letterSpacing: 0.7,
    lineHeight: 14,
    marginTop: 5,
  },
  swatchLabelSelected: { color: colors.navy, fontFamily: fontFamilies.uiSemibold },
  swatchRing: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 35,
    borderWidth: 2,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
  swatchRingSelected: { borderColor: colors.navy },
  swatches: { flexDirection: "row", flexWrap: "wrap", paddingTop: 12 },
  swatchesHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  swatchesHint: { color: colors.textSecondary, fontFamily: fontFamilies.ui, fontSize: 12, lineHeight: 16 },
  swatchesSection: { paddingTop: 12 },
  swatchesTitle: { color: colors.navy, fontFamily: fontFamilies.uiSemibold, fontSize: 11, letterSpacing: 2.8, lineHeight: 15 },
  title: { color: colors.navy, fontFamily: fontFamilies.editorialRegular, fontSize: 42, letterSpacing: -1.1, lineHeight: 47, marginTop: 4 },
});
