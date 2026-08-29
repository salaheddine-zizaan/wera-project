import { images } from "@/constants/images";
import { colors } from "@/theme";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { View } from "react-native";

import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const HOLD_DURATION = 3500;
const TRANSITION_DURATION = 1000;

export function WelcomeHero() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withDelay(
          HOLD_DURATION,
          withTiming(1, {
            duration: TRANSITION_DURATION,
            easing: Easing.inOut(Easing.cubic),
          })
        ),

        withDelay(
          HOLD_DURATION,
          withTiming(0, {
            duration: TRANSITION_DURATION,
            easing: Easing.inOut(Easing.cubic),
          })
        )
      ),
      -1,
      false
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [progress]);

  const womenStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),

    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [1, 1.025]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [0, -6]),
      },
    ],
  }));

  const menStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),

    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [1.025, 1]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [6, 0]),
      },
    ],
  }));

  return (
    <View className="relative mt-2 flex-1 overflow-hidden">
      <Animated.Image
        accessibilityLabel="Women wearing different Wera styles"
        source={images.onboardingWelcomeWomen}
        resizeMode="contain"
        className="absolute inset-0 h-full w-full"
        style={womenStyle}
      />

      <Animated.Image
        accessibilityLabel="Men wearing different Wera styles"
        source={images.onboardingWelcomeMen}
        resizeMode="contain"
        className="absolute inset-0 h-full w-full"
        style={menStyle}
      />

      <LinearGradient
        pointerEvents="none"
        colors={[
          "transparent",
          colors.canvas,
          colors.canvas,
        ]}
        locations={[0, 0.78, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 176,
        }}
      />
    </View>
  );
}