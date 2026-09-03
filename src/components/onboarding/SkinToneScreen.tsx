import { skinTones } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { SkinToneId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_SKIN_TONE: SkinToneId = "tone-03";

export function SkinToneScreen() {
  const router = useRouter();
  const savedSkinTone = useOnboardingStore((state) => state.profile.model.skinTone);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const [selectedSkinTone, setSelectedSkinTone] = useState<SkinToneId>(
    savedSkinTone ?? DEFAULT_SKIN_TONE,
  );

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

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View style={styles.screen}>
        <OnboardingProgress />
        <Text style={styles.title}>Choose your skin tone.</Text>
        <Text style={styles.helper}>This only helps Wera render your Model.</Text>
        <View accessibilityLabel="Skin tone options" style={styles.options}>
          {skinTones.map((tone) => {
            const isSelected = tone.id === selectedSkinTone;

            return (
              <Pressable
                accessibilityLabel={`Select ${tone.label}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                key={tone.id}
                onPress={() => handleSelect(tone.id)}
                style={[styles.swatchButton, isSelected ? styles.swatchButtonSelected : undefined]}
              >
                <View style={[styles.swatch, { backgroundColor: tone.hex }]} />
              </Pressable>
            );
          })}
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.navy} size={25} strokeWidth={1.6} />
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: { alignItems: "center", flexDirection: "row", gap: 12, height: 44, justifyContent: "center", marginTop: "auto" },
  backLabel: { color: colors.navy, fontFamily: fontFamilies.uiMedium, fontSize: 16 },
  helper: { color: colors.textSecondary, fontFamily: fontFamilies.ui, fontSize: 14, lineHeight: 20, marginTop: 10 },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 14, justifyContent: "space-between", marginTop: 36 },
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  screen: { flex: 1, paddingBottom: 2, paddingHorizontal: 20, paddingTop: 16 },
  swatch: { borderRadius: 30, height: 58, width: 58 },
  swatchButton: { alignItems: "center", borderColor: "transparent", borderRadius: 34, borderWidth: 2, height: 68, justifyContent: "center", width: 68 },
  swatchButtonSelected: { borderColor: colors.navy },
  title: { color: colors.navy, fontFamily: fontFamilies.editorialRegular, fontSize: 40, letterSpacing: -0.9, lineHeight: 44, marginTop: 22 },
});
