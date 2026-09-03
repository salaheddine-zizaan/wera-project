import { suggestBuildFromMeasurements } from "@/lib/model-build-suggestion";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { LengthMeasurement, WeightMeasurement } from "@/types/profile";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Ruler, Weight } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeInRight,
  FadeInUp,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { Carousel, type CarouselItemAnimation } from "react-native-reanimated-carousel";

import { OnboardingProgress } from "./OnboardingProgress";

const HEIGHT_RANGE = { min: 150, max: 210, defaultValue: 175 } as const;
const WEIGHT_RANGE = { min: 40, max: 150, defaultValue: 68 } as const;
const PICKER_HEIGHT = 68;
const PICKER_ITEM_SIZE = 52;

type MeasurementRange = {
  min: number;
  max: number;
  defaultValue: number;
};

type MeasurementPickerProps = {
  Icon: typeof Ruler;
  label: string;
  range: MeasurementRange;
  unit: "cm" | "kg";
  value: number;
  onChange: (value: number) => void;
};

type AnimatedPickerValueProps = {
  relativeProgress: SharedValue<number>;
  value: number;
};

function initialHeightValue(measurement?: LengthMeasurement) {
  return measurement?.unit === "cm" ? measurement.value : HEIGHT_RANGE.defaultValue;
}

function initialWeightValue(measurement?: WeightMeasurement) {
  return measurement?.unit === "kg" ? measurement.value : WEIGHT_RANGE.defaultValue;
}

function AnimatedPickerValue({ relativeProgress, value }: AnimatedPickerValueProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.min(Math.abs(relativeProgress.value), 3);

    return {
      color: interpolateColor(distance, [0, 1], [colors.navy, colors.textSecondary]),
      opacity: interpolate(distance, [0, 1, 2, 3], [1, 0.58, 0.28, 0.1]),
      transform: [{ scale: interpolate(distance, [0, 1, 2, 3], [1, 0.8, 0.7, 0.64]) }],
    };
  });

  return <Animated.Text style={[styles.pickerValue, animatedStyle]}>{value}</Animated.Text>;
}

function MeasurementPicker({ Icon, label, onChange, range, unit, value }: MeasurementPickerProps) {
  const values = useMemo(
    () => Array.from({ length: range.max - range.min + 1 }, (_, index) => range.min + index),
    [range.max, range.min],
  );
  const [pickerWidth, setPickerWidth] = useState(0);
  const itemAnimation = useMemo<CarouselItemAnimation>(
    () => (relativeProgress) => {
      "worklet";

      return {
        transform: [
          {
            translateX: pickerWidth / 2 - PICKER_ITEM_SIZE / 2 + relativeProgress * PICKER_ITEM_SIZE,
          },
        ],
      };
    },
    [pickerWidth],
  );

  return (
    <View>
      <Text className="font-ui-semibold text-[16px] leading-5 text-navy">Your {label.toLowerCase()}</Text>
      <View className="mt-2.5 h-32 overflow-hidden rounded-large border border-border-default bg-surface">
        <View className="flex-row items-center justify-between px-3.5 pt-3.5">
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-secondary">
              <Icon color={colors.textPrimary} size={23} strokeWidth={1.55} />
            </View>
            <Text className="ml-3 font-ui-medium text-[16px] leading-5 text-text-primary">{label}</Text>
            <Text className="ml-2 font-ui text-[14px] leading-5 text-text-secondary">{unit}</Text>
          </View>
          <View className="rounded-full bg-surface-secondary px-3 py-1.5">
            <Text className="font-ui text-[12px] leading-4 text-text-secondary">
              {range.min} - {range.max} {unit}
            </Text>
          </View>
        </View>

        <GestureHandlerRootView
          accessibilityLabel={`${label}, ${value} ${unit}. Swipe horizontally to adjust.`}
          onLayout={({ nativeEvent }) => setPickerWidth(nativeEvent.layout.width)}
          style={styles.pickerViewport}
        >
          {pickerWidth > 0 ? (
            <Carousel
              animation={{ duration: 190, type: "timing" }}
              data={values}
              defaultIndex={value - range.min}
              itemAnimation={itemAnimation}
              itemSize={PICKER_ITEM_SIZE}
              keyExtractor={(pickerValue) => String(pickerValue)}
              loop={false}
              onSnapToItem={(index) => onChange(values[index])}
              overscrollEnabled
              renderItem={({ item, relativeProgress }) => (
                <View style={styles.carouselItem}>
                  <AnimatedPickerValue relativeProgress={relativeProgress} value={item} />
                </View>
              )}
              renderWindowSize={7}
              snapMode="page"
              style={[styles.carousel, { width: pickerWidth }]}
            />
          ) : null}
          <View pointerEvents="none" style={styles.selectionMarker} />
        </GestureHandlerRootView>
      </View>
    </View>
  );
}

function ContinueButton({ onPress }: { onPress: () => void }) {
  const reduceMotion = useReducedMotion();
  const pressScale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const updatePressScale = (nextValue: number) => {
    pressScale.value = reduceMotion
      ? nextValue
      : withTiming(nextValue, { duration: 130, easing: Easing.out(Easing.cubic) });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        className="h-[54px] flex-row items-center justify-between rounded-small bg-navy px-5"
        onPress={onPress}
        onPressIn={() => updatePressScale(0.985)}
        onPressOut={() => updatePressScale(1)}
      >
        <View className="w-7" />
        <Text className="font-ui-medium text-[17px] leading-6 text-surface">Continue</Text>
        <ArrowRight color={colors.surface} size={28} strokeWidth={1.55} />
      </Pressable>
    </Animated.View>
  );
}

export function MeasurementsScreen() {
  const router = useRouter();
  const sizesAndFit = useOnboardingStore((state) => state.profile.sizesAndFit);
  const savedBuild = useOnboardingStore((state) => state.profile.model.build);
  const updateSizesAndFit = useOnboardingStore((state) => state.updateSizesAndFit);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const [height, setHeight] = useState(() => initialHeightValue(sizesAndFit.measurements.height));
  const [weight, setWeight] = useState(() => initialWeightValue(sizesAndFit.measurements.weight));

  useEffect(() => {
    setCurrentStep("measurements");
  }, [setCurrentStep]);

  const handleContinue = () => {
    const measurements = {
      height: { unit: "cm" as const, value: height },
      weight: { unit: "kg" as const, value: weight },
    };

    updateSizesAndFit({
      measurementSystem: "metric",
      measurements,
    });

    if (!savedBuild) {
      updateModel({ suggestedBuild: suggestBuildFromMeasurements(measurements) });
    }

    markStepCompleted("measurements");
    router.navigate("/usual-sizes");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-6 pt-4">
          <OnboardingProgress />

          <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)}>
            <View className="mt-[30px]">
              <Text className="font-ui-semibold text-[12px] leading-[14px] tracking-[3.1px] text-navy">
                YOUR WERA MODEL
              </Text>
              <Text className="mt-[7px] pb-0.5 font-editorial-regular text-[46px] leading-[50px] tracking-[-1.1px] text-navy">
                the basics first.
              </Text>
              <Text className="mt-3 max-w-[330px] font-ui text-[14px] leading-5 text-text-secondary">
                These two details give your virtual Model a useful starting point. You can refine it later.
              </Text>
            </View>

            <View className="mt-9 gap-5">
              <Animated.View entering={reduceMotion ? undefined : FadeInUp.delay(90).duration(240)}>
                <MeasurementPicker
                  Icon={Ruler}
                  label="Height"
                  onChange={setHeight}
                  range={HEIGHT_RANGE}
                  unit="cm"
                  value={height}
                />
              </Animated.View>
              <Animated.View entering={reduceMotion ? undefined : FadeInUp.delay(150).duration(240)}>
                <MeasurementPicker
                  Icon={Weight}
                  label="Weight"
                  onChange={setWeight}
                  range={WEIGHT_RANGE}
                  unit="kg"
                  value={weight}
                />
              </Animated.View>
            </View>
          </Animated.View>

          <Animated.View
            entering={reduceMotion ? undefined : FadeInUp.delay(210).duration(240)}
            className="mt-8"
          >
            <ContinueButton onPress={handleContinue} />
            <Pressable
              accessibilityRole="button"
              className="mt-1.5 h-11 flex-row items-center justify-center gap-[14px]"
              onPress={() => {
                setCurrentStep("model-method");
                router.back();
              }}
            >
              <ArrowLeft color={colors.navy} size={27} strokeWidth={1.55} />
              <Text className="font-ui-medium text-[16px] leading-[22px] text-navy">Back</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  carousel: { height: PICKER_HEIGHT },
  carouselItem: { alignItems: "center", flex: 1, justifyContent: "center" },
  pickerValue: { fontFamily: fontFamilies.uiSemibold, fontSize: 28, lineHeight: 34 },
  pickerViewport: { height: PICKER_HEIGHT, marginTop: 3 },
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  scrollContent: { flexGrow: 1 },
  selectionMarker: {
    backgroundColor: colors.navy,
    bottom: 5,
    height: 2,
    left: "50%",
    marginLeft: -13,
    position: "absolute",
    width: 26,
  },
});
