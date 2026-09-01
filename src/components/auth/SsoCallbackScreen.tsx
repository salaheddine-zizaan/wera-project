import { colors } from "@/theme";

import { useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function SsoCallbackScreen() {
  const loadingWidth = useSharedValue(48);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!reduceMotion) {
      loadingWidth.value = withRepeat(
        withSequence(
          withTiming(144, {
            duration: 1100,
          }),
          withTiming(48, {
            duration: 900,
          }),
        ),
        -1,
        false,
      );
    }

    return () => {
      cancelAnimation(loadingWidth);
    };
  }, [loadingWidth, reduceMotion]);

  const loadingStyle = useAnimatedStyle(() => ({
    width: reduceMotion ? 72 : loadingWidth.value,
  }));

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom"]}
    >
      <StatusBar
        backgroundColor={colors.canvas}
        barStyle="dark-content"
      />

      <View
        accessibilityLiveRegion="polite"
        accessibilityState={{ busy: true }}
        accessibilityLabel="Just a moment"
        className="flex-1 items-center justify-center px-6"
      >
        <Text className="font-editorial text-[40px] leading-[48px] text-navy">
          Just a moment.
        </Text>

        <View className="mt-7 h-px w-36 overflow-hidden bg-navy/10">
          <Animated.View
            className="h-full bg-navy"
            style={loadingStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});