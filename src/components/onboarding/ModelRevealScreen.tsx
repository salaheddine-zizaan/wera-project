import {
  getModelBaseForClothingDirection,
  getSkinToneModelAsset,
} from "@/constants/model-assets";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { SkinToneId } from "@/types/onboarding";

import { useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_SKIN_TONE: SkinToneId = "tone-03";

export function ModelRevealScreen() {
  const clothingDirections = useOnboardingStore((state) => state.profile.basics.clothingDirections);
  const skinTone = useOnboardingStore((state) => state.profile.model.skinTone) ?? DEFAULT_SKIN_TONE;
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const modelBase = getModelBaseForClothingDirection(clothingDirections);
  const previewAsset = getSkinToneModelAsset(modelBase, skinTone);

  useEffect(() => {
    setCurrentStep("model-reveal");
  }, [setCurrentStep]);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.navy} barStyle="light-content" />
      <View style={styles.screen}>
        <Text style={styles.eyebrow}>WERA MODEL</Text>
        <Text style={styles.title}>This is your{"\n"}Wera Model.</Text>
        <Text style={styles.subtitle}>Made for your style.</Text>
        <View style={styles.previewStage}>
          <View pointerEvents="none" style={styles.previewGlow} />
          <Image resizeMode="contain" source={previewAsset.source} style={styles.previewImage} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: colors.surface,
    fontFamily: fontFamilies.uiSemibold,
    fontSize: 11,
    letterSpacing: 2.8,
    lineHeight: 15,
  },
  previewGlow: {
    backgroundColor: "#2C3B5B",
    borderRadius: 999,
    bottom: -120,
    height: 350,
    opacity: 0.55,
    position: "absolute",
    width: 350,
  },
  previewImage: { height: "100%", width: "100%" },
  previewStage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 12,
    overflow: "hidden",
  },
  safeArea: { backgroundColor: colors.navy, flex: 1 },
  screen: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
  subtitle: {
    color: colors.surface,
    fontFamily: fontFamilies.editorial,
    fontSize: 29,
    lineHeight: 36,
    marginTop: 10,
  },
  title: {
    color: colors.surface,
    fontFamily: fontFamilies.display,
    fontSize: 38,
    letterSpacing: -1.3,
    lineHeight: 40,
    marginTop: 18,
    textTransform: "uppercase",
  },
});
