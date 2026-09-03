import {
  getFacialHairAsset,
  getModelBaseForClothingDirection,
  type FacialHairAsset,
} from "@/constants/model-assets";
import {
  facialHairOptions,
  hairColorClassNames,
  hairColors,
} from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { FacialHairId, HairColorId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_FACIAL_HAIR: FacialHairId = "none";
const DEFAULT_HAIR_COLOR: HairColorId = "black";

type FacialHairStyle = {
  id: FacialHairId;
  label: string;
  asset: FacialHairAsset;
};

const facialHairStyles: FacialHairStyle[] = facialHairOptions.map((option) => ({
  ...option,
  asset: getFacialHairAsset(option.id),
}));

export function FacialHairScreen() {
  const router = useRouter();
  const clothingDirections = useOnboardingStore((state) => state.profile.basics.clothingDirections);
  const savedFacialHair = useOnboardingStore((state) => state.profile.model.facialHair);
  const savedHairColor = useOnboardingStore((state) => state.profile.model.hairColor);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const modelBase = getModelBaseForClothingDirection(clothingDirections);
  const [selectedFacialHairId, setSelectedFacialHairId] = useState<FacialHairId>(
    savedFacialHair ?? DEFAULT_FACIAL_HAIR,
  );
  const selectedHairColorId = savedHairColor ?? DEFAULT_HAIR_COLOR;
  const selectedFacialHair =
    facialHairStyles.find((style) => style.id === selectedFacialHairId) ?? facialHairStyles[0];

  useEffect(() => {
    if (modelBase === "masculine") {
      setCurrentStep("facial-hair");
      return;
    }

    setCurrentStep("skin-tone");
    router.replace("/skin-tone");
  }, [modelBase, router, setCurrentStep]);

  useEffect(() => {
    setSelectedFacialHairId(savedFacialHair ?? DEFAULT_FACIAL_HAIR);
  }, [savedFacialHair]);

  const handleFacialHairPress = (facialHair: FacialHairId) => {
    setSelectedFacialHairId(facialHair);
    updateModel({ facialHair });
  };

  const handleHairColorPress = (hairColor: HairColorId) => {
    updateModel({ hairColor });
  };

  const handleBack = () => {
    setCurrentStep("hair");
    router.back();
  };

  const handleContinue = () => {
    updateModel({ facialHair: selectedFacialHairId });
    markStepCompleted("facial-hair");
    setCurrentStep("skin-tone");
    router.navigate("/skin-tone");
  };

  if (modelBase !== "masculine" || !selectedFacialHair) {
    return null;
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View className="flex-1 px-5 pb-[2px] pt-[14px]">
        <OnboardingProgress />

        <View className="mt-[19px]">
          <Text className="font-ui-semibold text-[11px] leading-[15px] tracking-[3.2px] text-navy">
            YOUR WERA MODEL
          </Text>
          <Text className="mt-1 font-editorial-regular text-[41px] leading-[47px] tracking-[-1.1px] text-navy">
            Choose your facial hair.
          </Text>
          <Text className="mt-[7px] font-ui text-[15px] leading-[21px] text-text-secondary">
            Pick the look that feels most like you.
          </Text>
        </View>

        <View className="relative flex-1 min-h-[150px] items-center justify-end overflow-hidden pt-[3px]">
          <View
            className="absolute bottom-0 h-[92%] w-[91%] rounded-t-[172px] bg-surface-secondary"
            pointerEvents="none"
          />
          <Image
            accessibilityLabel={`${selectedFacialHair.label} facial hair`}
            className="h-full w-full"
            resizeMode="contain"
            resizeMethod="resize"
            source={selectedFacialHair.asset.source}
          />
        </View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-ui-semibold text-[11px] leading-[15px] tracking-[2.8px] text-navy">
              FACIAL HAIR
            </Text>
            <Text className="font-ui text-[12px] leading-4 text-text-secondary">Swipe to explore</Text>
          </View>
          <FlatList
            data={facialHairStyles}
            getItemLayout={(_, index) => ({ index, length: 88, offset: 88 * index })}
            horizontal
            initialNumToRender={5}
            ItemSeparatorComponent={() => <View className="w-2.5" />}
            keyExtractor={(style) => style.id}
            ListFooterComponent={<View className="w-5" />}
            maxToRenderPerBatch={1}
            renderItem={({ item: style }) => {
              const isSelected = style.id === selectedFacialHairId;

              return (
                <Pressable
                  accessibilityLabel={`Select ${style.label} facial hair`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  className={`h-[105px] w-[78px] items-center justify-between overflow-hidden rounded-medium border-[1.5px] pb-2 pt-1 active:opacity-80 ${
                    isSelected ? "border-navy bg-surface" : "border-transparent bg-surface-secondary"
                  }`}
                  onPress={() => handleFacialHairPress(style.id)}
                >
                  <Image
                    className="-mt-[3px] h-[73px] w-[73px]"
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={style.asset.source}
                  />
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
            }}
            showsHorizontalScrollIndicator={false}
            windowSize={2}
          />
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

        <View className="gap-px pt-3">
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
        </View>
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
