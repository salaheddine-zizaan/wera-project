import {
  bodyAssetDimensions,
  getModelBaseForClothingDirection,
  modelAssets,
} from "@/constants/model-assets";
import { bodyBuilds } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { BodyBuildId } from "@/types/onboarding";

import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  type LayoutChangeEvent,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeInRight,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useReducedMotion,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const DEFAULT_BUILD_ID: BodyBuildId = "average";
const BODY_ASPECT_RATIO = bodyAssetDimensions.width / bodyAssetDimensions.height;
const CAROUSEL_ITEM_WIDTH_RATIO = 0.31;
const BUILD_LABEL_HEIGHT = 30;
const SELECTED_MODEL_SCALE = 1.1;
const NEIGHBOUR_MODEL_SCALE = 0.86;
const OUTER_MODEL_SCALE = 0.66;
const SELECTED_MODEL_OPACITY = 1;
const NEIGHBOUR_MODEL_OPACITY = 0.6;
const OUTER_MODEL_OPACITY = 0.24;

type BuildCarouselItemProps = {
  index: number;
  modelStageHeight: number;
  itemWidth: number;
  item: (typeof bodyBuilds)[number];
  modelBase: keyof typeof modelAssets;
  onPress: () => void;
  scrollX: SharedValue<number>;
};

function BuildCarouselItem({
  index,
  item,
  modelBase,
  modelStageHeight,
  itemWidth,
  onPress,
  scrollX,
}: BuildCarouselItemProps) {
  const asset = modelAssets[modelBase][item.id];
  const imageStyle = useAnimatedStyle(() => {
    const distance = Math.min(Math.abs((scrollX.value - index * itemWidth) / itemWidth), 2);
    const visualScale = interpolate(
      distance,
      [0, 1, 2],
      [SELECTED_MODEL_SCALE, NEIGHBOUR_MODEL_SCALE, OUTER_MODEL_SCALE],
    );
    const imageHeight = modelStageHeight * 0.9 * visualScale;

    return {
      bottom: (imageHeight * asset.bottomInset) / bodyAssetDimensions.height,
      height: imageHeight,
      opacity: interpolate(
        distance,
        [0, 1, 2],
        [SELECTED_MODEL_OPACITY, NEIGHBOUR_MODEL_OPACITY, OUTER_MODEL_OPACITY],
      ),
      width: imageHeight * BODY_ASPECT_RATIO,
    };
  });
  const labelStyle = useAnimatedStyle(() => {
    const distance = Math.min(Math.abs((scrollX.value - index * itemWidth) / itemWidth), 2);

    return {
      opacity: interpolate(
        distance,
        [0, 1, 2],
        [SELECTED_MODEL_OPACITY, NEIGHBOUR_MODEL_OPACITY, OUTER_MODEL_OPACITY],
      ),
      transform: [{ scale: interpolate(distance, [0, 1, 2], [1, 0.94, 0.86]) }],
    };
  });
  const itemStyle = useAnimatedStyle(() => {
    const distance = Math.min(Math.abs((scrollX.value - index * itemWidth) / itemWidth), 2);

    return {
      zIndex: Math.round(interpolate(distance, [0, 1, 2], [30, 20, 10])),
    };
  });

  return (
    <Animated.View style={[styles.carouselItem, { width: itemWidth }, itemStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Select ${item.label} build`}
        onPress={onPress}
        style={styles.carouselPressable}
      >
        <View style={[styles.modelStage, { height: modelStageHeight }]}>
          <Animated.Image
            accessibilityLabel={item.label}
            resizeMode="contain"
            source={asset.source}
            style={[styles.modelImage, imageStyle]}
          />
        </View>
        <Animated.Text style={[styles.modelLabel, labelStyle]}>{item.label}</Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export function BuildScreen() {
  const router = useRouter();
  const carouselRef = useRef<FlatList<(typeof bodyBuilds)[number]>>(null);
  const { height: windowHeight } = useWindowDimensions();
  const [carouselWidth, setCarouselWidth] = useState(0);
  const basics = useOnboardingStore((state) => state.profile.basics);
  const savedBuild = useOnboardingStore((state) => state.profile.model.build);
  const suggestedBuild = useOnboardingStore((state) => state.profile.model.suggestedBuild);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const modelBase = getModelBaseForClothingDirection(basics.clothingDirections);
  const defaultBuildIndex = useMemo(() => {
    const initialBuild = savedBuild ?? suggestedBuild ?? DEFAULT_BUILD_ID;
    const savedIndex = bodyBuilds.findIndex((build) => build.id === initialBuild);

    return savedIndex >= 0 ? savedIndex : bodyBuilds.findIndex((build) => build.id === DEFAULT_BUILD_ID);
  }, [savedBuild, suggestedBuild]);
  const [selectedBuildId, setSelectedBuildId] = useState<BodyBuildId>(
    bodyBuilds[defaultBuildIndex].id,
  );
  const hasUserInteractedWithBuildRef = useRef(false);
  const carouselHeight = windowHeight < 720 ? 334 : 406;
  const modelStageHeight = carouselHeight - BUILD_LABEL_HEIGHT;
  const itemWidth = carouselWidth * CAROUSEL_ITEM_WIDTH_RATIO;
  const sideInset = (carouselWidth - itemWidth) / 2;
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    setCurrentStep("build");
  }, [setCurrentStep]);

  useEffect(() => {
    if (itemWidth > 0) {
      scrollX.value = defaultBuildIndex * itemWidth;
    }
  }, [defaultBuildIndex, itemWidth, scrollX]);

  const handleBuildChange = (index: number) => {
    const build = bodyBuilds[index];

    if (!build) {
      return;
    }

    const buildId = build.id;
    setSelectedBuildId(buildId);
    updateModel({ build: buildId, suggestedBuild: undefined });
  };

  const handleBuildPress = (index: number) => {
    hasUserInteractedWithBuildRef.current = true;

    if (bodyBuilds[index]?.id === selectedBuildId) {
      handleBuildChange(index);
      return;
    }

    carouselRef.current?.scrollToIndex({ animated: true, index, viewPosition: 0.5 });
  };

  const handleMomentumScrollEnd = ({ nativeEvent }: { nativeEvent: { contentOffset: { x: number } } }) => {
    if (!hasUserInteractedWithBuildRef.current) {
      return;
    }

    handleBuildChange(Math.round(nativeEvent.contentOffset.x / itemWidth));
  };

  const handleCarouselLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const nextWidth = nativeEvent.layout.width;

    setCarouselWidth((currentWidth) => (currentWidth === nextWidth ? currentWidth : nextWidth));
  };

  const handleContinue = () => {
    updateModel({ build: selectedBuildId, suggestedBuild: undefined });
    markStepCompleted("build");
    setCurrentStep("body-shape");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View style={styles.screen}>
        <OnboardingProgress />

        <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)} style={styles.header}>
          <Text style={styles.eyebrow}>YOUR WERA MODEL</Text>
          <Text style={styles.title}>Choose your build.</Text>
          <Text style={styles.supportingText}>Pick the closest overall shape.</Text>
        </Animated.View>

        <Animated.View
          entering={reduceMotion ? undefined : FadeInUp.delay(90).duration(320).easing(Easing.out(Easing.cubic))}
          style={styles.carouselSection}
        >
          <View
            onLayout={handleCarouselLayout}
            style={[styles.carouselViewport, { height: carouselHeight, width: "100%" }]}
          >
            {carouselWidth > 0 ? (
              <Animated.FlatList
                ref={carouselRef}
                contentContainerStyle={{ paddingHorizontal: sideInset }}
                data={[...bodyBuilds]}
                decelerationRate="fast"
                disableIntervalMomentum
                getItemLayout={(_, index) => ({ length: itemWidth, offset: itemWidth * index, index })}
                horizontal
                initialScrollIndex={defaultBuildIndex}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                onScroll={scrollHandler}
                onScrollBeginDrag={() => {
                  hasUserInteractedWithBuildRef.current = true;
                }}
                removeClippedSubviews={false}
                renderItem={({ index, item }) => (
                  <BuildCarouselItem
                    index={index}
                    item={item}
                    itemWidth={itemWidth}
                    modelBase={modelBase}
                    modelStageHeight={modelStageHeight}
                    onPress={() => handleBuildPress(index)}
                    scrollX={scrollX}
                  />
                )}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                snapToInterval={itemWidth}
                style={styles.carousel}
              />
            ) : null}
          </View>
        </Animated.View>

        <Animated.View
          entering={reduceMotion ? undefined : FadeInUp.delay(170).duration(240)}
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
              setCurrentStep("usual-sizes");
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
  actions: { gap: 2, paddingTop: 12 },
  backButton: { alignItems: "center", flexDirection: "row", gap: 14, height: 44, justifyContent: "center" },
  backLabel: { color: colors.navy, fontFamily: fontFamilies.uiMedium, fontSize: 16, lineHeight: 22 },
  buttonSideSpacer: { width: 28 },
  carousel: { alignSelf: "center", height: "100%", width: "100%" },
  carouselItem: { alignItems: "center", overflow: "visible" },
  carouselPressable: { alignItems: "center", width: "100%" },
  carouselSection: { alignItems: "center", flex: 1, justifyContent: "center", minHeight: 320 },
  carouselViewport: { alignSelf: "center" },
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
  modelImage: { position: "absolute" },
  modelLabel: { color: colors.navy, fontFamily: fontFamilies.uiMedium, fontSize: 15, lineHeight: BUILD_LABEL_HEIGHT, textAlign: "center" },
  modelStage: { alignItems: "center", overflow: "visible", position: "relative", width: "100%" },
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  screen: { flex: 1, paddingBottom: 2, paddingHorizontal: 20, paddingTop: 16 },
  supportingText: { color: colors.textSecondary, fontFamily: fontFamilies.ui, fontSize: 14, lineHeight: 19, marginTop: 5 },
  title: { color: colors.navy, fontFamily: fontFamilies.editorialRegular, fontSize: 48, letterSpacing: -1, lineHeight: 50, marginTop: 3 },
});
