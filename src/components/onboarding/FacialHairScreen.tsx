import { facialHairOptions } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { FacialHairId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_FACIAL_HAIR: FacialHairId = "none";

export function FacialHairScreen() {
  const router = useRouter();
  const savedFacialHair = useOnboardingStore((state) => state.profile.model.facialHair);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const [selectedFacialHair, setSelectedFacialHair] = useState<FacialHairId>(
    savedFacialHair ?? DEFAULT_FACIAL_HAIR,
  );

  useEffect(() => {
    setCurrentStep("facial-hair");
  }, [setCurrentStep]);

  useEffect(() => {
    setSelectedFacialHair(savedFacialHair ?? DEFAULT_FACIAL_HAIR);
  }, [savedFacialHair]);

  const handleSelect = (facialHair: FacialHairId) => {
    setSelectedFacialHair(facialHair);
    updateModel({ facialHair });
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View style={styles.screen}>
        <OnboardingProgress />
        <Text style={styles.title}>Choose your facial hair.</Text>
        <View style={styles.options}>
          {facialHairOptions.map((option) => {
            const isSelected = option.id === selectedFacialHair;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                key={option.id}
                onPress={() => handleSelect(option.id)}
                style={[styles.option, isSelected ? styles.optionSelected : undefined]}
              >
                <Text style={[styles.optionLabel, isSelected ? styles.optionLabelSelected : undefined]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              updateModel({ facialHair: selectedFacialHair });
              markStepCompleted("facial-hair");
              setCurrentStep("skin-tone");
              router.navigate("/skin-tone");
            }}
            style={styles.continueButton}
          >
            <View style={styles.buttonSideSpacer} />
            <Text style={styles.continueLabel}>Continue</Text>
            <ArrowRight color={colors.surface} size={26} strokeWidth={1.6} />
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={colors.navy} size={25} strokeWidth={1.6} />
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: { gap: 2, marginTop: "auto", paddingTop: 20 },
  backButton: { alignItems: "center", flexDirection: "row", gap: 12, height: 44, justifyContent: "center" },
  backLabel: { color: colors.navy, fontFamily: fontFamilies.uiMedium, fontSize: 16 },
  buttonSideSpacer: { width: 26 },
  continueButton: { alignItems: "center", backgroundColor: colors.navy, borderRadius: 10, flexDirection: "row", height: 52, justifyContent: "space-between", paddingHorizontal: 20 },
  continueLabel: { color: colors.surface, fontFamily: fontFamilies.uiMedium, fontSize: 17 },
  option: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.muted, borderRadius: 10, borderWidth: 1, height: 54, justifyContent: "center" },
  optionLabel: { color: colors.textPrimary, fontFamily: fontFamilies.uiMedium, fontSize: 15 },
  optionLabelSelected: { color: colors.surface },
  optionSelected: { backgroundColor: colors.navy, borderColor: colors.navy },
  options: { gap: 10, marginTop: 32 },
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  screen: { flex: 1, paddingBottom: 2, paddingHorizontal: 20, paddingTop: 16 },
  title: { color: colors.navy, fontFamily: fontFamilies.editorialRegular, fontSize: 40, letterSpacing: -0.9, lineHeight: 44, marginTop: 22 },
});
