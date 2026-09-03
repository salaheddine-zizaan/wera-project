import { images } from "@/constants/images";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";

import { BlurTargetView, BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { styled } from "nativewind";
import { type ComponentType, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  type ViewProps,
  View,
} from "react-native";
import { Image } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInRight, FadeInUp, useReducedMotion } from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";
import { LinearGradient } from "expo-linear-gradient";

const StyledBlurTargetView = styled<ComponentType<ViewProps>, { className: "style" }>(BlurTargetView);

const SIZE_SECTIONS = [
  {
    id: "top" as const,
    image: images.onboardingModelCreationTopWear,
    label: "Top size",
    options: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    supportingText: "Shirts, tees, knitwear, hoodies, jackets",
  },
  {
    id: "bottom" as const,
    image: images.onboardingModelCreationBottomWear,
    label: "Bottom size",
    options: ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50"],
    supportingText: "Pants, jeans, chinos, joggers, cargos",
  },
  {
    id: "shoe" as const,
    image: images.onboardingModelCreationShoes,
    label: "Shoe size",
    options: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    supportingText: "Sneakers, boots, loafers, sporty, casual",
  },
] as const;

type SizeSection = (typeof SIZE_SECTIONS)[number];

type SizeCardProps = {
  section: SizeSection;
  selectedSize: string;
  onSelect: (size: string) => void;
};

function SizeCard({ onSelect, section, selectedSize }: SizeCardProps) {
  const blurTargetRef = useRef<View>(null);

  return (
    <View className="flex-1 overflow-hidden rounded-medium ">
      <StyledBlurTargetView className="absolute inset-0 z-0" ref={blurTargetRef}>
        <Image className="h-full w-full bg-text-primary object-contain " source={section.image} />
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.62)",
            "rgba(0,0,0,0.25)",
            "rgba(0,0,0,0.05)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />
      </StyledBlurTargetView>

      <View className="relative z-20 px-3.5 pt-2.5 bg-black/25">
        <Text className="font-editorial-regular text-[27px] leading-[29px] text-surface">{section.label}</Text>
        <Text className="mt-[3px] max-w-[220px] font-ui text-[11px] leading-[14px] text-surface">
          {section.supportingText}
        </Text>
      </View>

      <View className="absolute bottom-2 left-2.5 right-2.5 z-20 overflow-hidden rounded-[12px] border border-white/50 bg-white/30">
        <BlurView
          blurMethod="dimezisBlurView"
          blurReductionFactor={1}
          blurTarget={blurTargetRef}
          intensity={6}
          tint="light"
        >
          <ScrollView
            contentContainerClassName="min-w-full flex-row justify-between px-1 py-0.5 bg-white/35"
            directionalLockEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {section.options.map((size) => {
              const selected = size === selectedSize;

              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  key={size}
                  onPress={() => onSelect(size)}
                  className={selected ? "h-11 w-11 items-center justify-center rounded-small bg-navy" : "h-11 w-11 items-center justify-center rounded-small"}
                >
                  <Text className={selected ? "font-ui-medium text-[13px] leading-4 text-surface" : "font-ui-medium text-[13px] leading-4 text-text-primary"}>
                    {size}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </BlurView>
      </View>
    </View>
  );
}

export function UsualSizesScreen() {
  const router = useRouter();
  const storedSizes = useOnboardingStore((state) => state.profile.sizesAndFit);
  const updateSizesAndFit = useOnboardingStore((state) => state.updateSizesAndFit);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const [topSize, setTopSize] = useState(storedSizes.topSize ?? "M");
  const [bottomSize, setBottomSize] = useState(storedSizes.bottomSize ?? "42");
  const [shoeSize, setShoeSize] = useState(storedSizes.shoeSize ?? "41");

  useEffect(() => {
    setCurrentStep("usual-sizes");
  }, [setCurrentStep]);

  const handleContinue = () => {
    updateSizesAndFit({ bottomSize, shoeSize, topSize });
    markStepCompleted("usual-sizes");
    setCurrentStep("build");
    router.navigate("/build");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" className="bg-canvas" />
      <View className="flex-1 px-5 pb-0.5 pt-2">
        <OnboardingProgress />

        <Animated.View className="flex-1" entering={reduceMotion ? undefined : FadeInRight.duration(260)}>
          <View className="mt-3.5">
            <Text className="font-ui-semibold text-[11px] leading-[13px] tracking-[3px] text-navy">YOUR WERA MODEL</Text>
            <Text className="mt-[3px] font-editorial-regular text-[48px] leading-[50px] tracking-[-1px] text-navy">your sizes.</Text>
            <Text className="mt-[5px] font-ui text-[14px] leading-[19px] text-text-secondary">
              Choose the sizes you usually wear.{"\n"}You can update them later.
            </Text>
          </View>

          <View className="mt-3 gap-2 ">
            <Animated.View className="aspect-[2.49]" entering={reduceMotion ? undefined : FadeInUp.delay(100).duration(240)}>
              <SizeCard onSelect={setTopSize} section={SIZE_SECTIONS[0]} selectedSize={topSize} />
            </Animated.View>
            <Animated.View className="aspect-[2.49]" entering={reduceMotion ? undefined : FadeInUp.delay(145).duration(240)}>
              <SizeCard onSelect={setBottomSize} section={SIZE_SECTIONS[1]} selectedSize={bottomSize} />
            </Animated.View>
            <Animated.View className="aspect-[2.49]" entering={reduceMotion ? undefined : FadeInUp.delay(190).duration(240)}>
              <SizeCard onSelect={setShoeSize} section={SIZE_SECTIONS[2]} selectedSize={shoeSize} />
            </Animated.View>
          </View>
        </Animated.View>

        <Animated.View className="pt-3" entering={reduceMotion ? undefined : FadeInUp.delay(210).duration(240)}>
          <Pressable
            accessibilityRole="button"
            className="h-[54px] flex-row items-center justify-between rounded-small bg-navy px-5"
            onPress={handleContinue}
          >
            <View className="w-7" />
            <Text className="font-ui-medium text-[17px] leading-6 text-surface">Continue</Text>
            <ArrowRight color={colors.surface} size={28} strokeWidth={1.55} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            className="mt-0.5 h-11 flex-row items-center justify-center gap-[14px]"
            onPress={() => {
              setCurrentStep("measurements");
              router.back();
            }}
          >
            <ArrowLeft color={colors.navy} size={27} strokeWidth={1.55} />
            <Text className="font-ui-medium text-[16px] leading-[22px] text-navy">Back</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
});
