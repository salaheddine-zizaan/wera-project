import {
  bodyAssetDimensions,
  getBodyShapeAsset,
  getModelBaseForClothingDirection,
  type BodyShapeAsset,
} from "@/constants/model-assets";
import { feminineBodyShapes, masculineBodyShapes } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import { colors, fontFamilies } from "@/theme";
import type { BodyShapeId } from "@/types/onboarding";

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
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

import { OnboardingProgress } from "./OnboardingProgress";

const BODY_ASPECT_RATIO = bodyAssetDimensions.width / bodyAssetDimensions.height;
const CAROUSEL_ITEM_WIDTH_RATIO = 0.31;
const SHAPE_LABEL_HEIGHT = 30;
const SELECTED_MODEL_SCALE = 1.1;
const NEIGHBOUR_MODEL_SCALE = 0.86;
const OUTER_MODEL_SCALE = 0.66;
const SELECTED_MODEL_OPACITY = 1;
const NEIGHBOUR_MODEL_OPACITY = 0.6;
const OUTER_MODEL_OPACITY = 0.24;

type BodyShapeOption =
  | (typeof masculineBodyShapes)[number]
  | (typeof feminineBodyShapes)[number];

type BodyShapeCarouselItemProps = {
  asset: BodyShapeAsset;
  index: number;
  item: BodyShapeOption;
  itemWidth: number;
  modelStageHeight: number;
  onPress: () => void;
  scrollX: SharedValue<number>;
};

function BodyShapeCarouselItem({
  asset,
  index,
  item,
  itemWidth,
  modelStageHeight,
  onPress,
  scrollX,
}: BodyShapeCarouselItemProps) {
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
        accessibilityLabel={`Select ${item.label} body shape`}
        accessibilityRole="button"
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

export function BodyShapeScreen() {
  const router = useRouter();
  const carouselRef = useRef<FlatList<BodyShapeOption>>(null);
  const { height: windowHeight } = useWindowDimensions();
  const [carouselWidth, setCarouselWidth] = useState(0);
  const basics = useOnboardingStore((state) => state.profile.basics);
  const build = useOnboardingStore((state) => state.profile.model.build);
  const savedBodyShape = useOnboardingStore((state) => state.profile.model.bodyShape);
  const updateModel = useOnboardingStore((state) => state.updateModel);
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const markStepCompleted = useOnboardingStore((state) => state.markStepCompleted);
  const reduceMotion = useReducedMotion();
  const modelBase = getModelBaseForClothingDirection(basics.clothingDirections);
  const bodyShapes = modelBase === "masculine" ? masculineBodyShapes : feminineBodyShapes;
  const defaultBodyShapeIndex = useMemo(() => {
    const savedIndex = bodyShapes.findIndex((bodyShape) => bodyShape.id === savedBodyShape);

    return savedIndex >= 0 ? savedIndex : 0;
  }, [bodyShapes, savedBodyShape]);
  const [selectedBodyShapeId, setSelectedBodyShapeId] = useState<BodyShapeId>(
    bodyShapes[defaultBodyShapeIndex].id,
  );
  const hasUserInteractedWithShapeRef = useRef(false);
  const carouselHeight = windowHeight < 720 ? 334 : 406;
  const modelStageHeight = carouselHeight - SHAPE_LABEL_HEIGHT;
  const itemWidth = carouselWidth * CAROUSEL_ITEM_WIDTH_RATIO;
  const sideInset = (carouselWidth - itemWidth) / 2;
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    setCurrentStep("body-shape");
  }, [setCurrentStep]);

  useEffect(() => {
    const initialBodyShape = bodyShapes[defaultBodyShapeIndex];

    if (!initialBodyShape) {
      return;
    }

    setSelectedBodyShapeId(initialBodyShape.id);
  }, [bodyShapes, defaultBodyShapeIndex]);

  useEffect(() => {
    if (itemWidth > 0) {
      scrollX.value = defaultBodyShapeIndex * itemWidth;
    }
  }, [defaultBodyShapeIndex, itemWidth, scrollX]);

  const handleBodyShapeChange = (index: number) => {
    const bodyShape = bodyShapes[index];

    if (!bodyShape) {
      return;
    }

    setSelectedBodyShapeId(bodyShape.id);
    updateModel({ bodyShape: bodyShape.id });
  };

  const handleBodyShapePress = (index: number) => {
    hasUserInteractedWithShapeRef.current = true;

    if (bodyShapes[index]?.id === selectedBodyShapeId) {
      handleBodyShapeChange(index);
      return;
    }

    carouselRef.current?.scrollToIndex({ animated: true, index, viewPosition: 0.5 });
  };

  const handleMomentumScrollEnd = ({ nativeEvent }: { nativeEvent: { contentOffset: { x: number } } }) => {
    if (!hasUserInteractedWithShapeRef.current) {
      return;
    }

    handleBodyShapeChange(Math.round(nativeEvent.contentOffset.x / itemWidth));
  };

  const handleCarouselLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const nextWidth = nativeEvent.layout.width;

    setCarouselWidth((currentWidth) => (currentWidth === nextWidth ? currentWidth : nextWidth));
  };

  const handleContinue = () => {
    updateModel({ bodyShape: selectedBodyShapeId });
    markStepCompleted("body-shape");
    setCurrentStep("face-shape");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />
      <View style={styles.screen}>
        <OnboardingProgress />

        <Animated.View entering={reduceMotion ? undefined : FadeInRight.duration(260)} style={styles.header}>
          <Text style={styles.eyebrow}>YOUR WERA MODEL</Text>
          <Text style={styles.title}>Choose your shape.</Text>
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
                data={[...bodyShapes]}
                decelerationRate="fast"
                disableIntervalMomentum
                getItemLayout={(_, index) => ({ length: itemWidth, offset: itemWidth * index, index })}
                horizontal
                initialScrollIndex={defaultBodyShapeIndex}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                onScroll={scrollHandler}
                onScrollBeginDrag={() => {
                  hasUserInteractedWithShapeRef.current = true;
                }}
                removeClippedSubviews={false}
                renderItem={({ index, item }) => {
                  const asset = getBodyShapeAsset(modelBase, build ?? "average", item.id);

                  return asset ? (
                    <BodyShapeCarouselItem
                      asset={asset}
                      index={index}
                      item={item}
                      itemWidth={itemWidth}
                      modelStageHeight={modelStageHeight}
                      onPress={() => handleBodyShapePress(index)}
                      scrollX={scrollX}
                    />
                  ) : null;
                }}
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
              setCurrentStep("build");
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
  modelLabel: { color: colors.navy, fontFamily: fontFamilies.uiMedium, fontSize: 15, lineHeight: SHAPE_LABEL_HEIGHT, textAlign: "center" },
  modelStage: { alignItems: "center", overflow: "visible", position: "relative", width: "100%" },
  safeArea: { backgroundColor: colors.canvas, flex: 1 },
  screen: { flex: 1, paddingBottom: 2, paddingHorizontal: 20, paddingTop: 16 },
  supportingText: { color: colors.textSecondary, fontFamily: fontFamilies.ui, fontSize: 14, lineHeight: 19, marginTop: 5 },
  title: { color: colors.navy, fontFamily: fontFamilies.editorialRegular, fontSize: 48, letterSpacing: -1, lineHeight: 50, marginTop: 3 },
});
