import { VerificationCodeModal } from "@/components/auth/VerificationCodeModal";
import { images } from "@/constants/images";
import { colors, fontFamilies } from "@/theme";
import { BlurTargetView } from "expo-blur";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthMode = "sign-in" | "sign-up";

type AuthScreenProps = {
  mode: AuthMode;
};

const copyByMode = {
  "sign-in": {
    action: "Log in",
    description: "Log in to continue your style journey.",
    title: "Welcome back",
  },
  "sign-up": {
    action: "Create account",
    description: "Start your personal style journey.",
    title: "Create account",
  },
} as const;

type SocialAuthButtonProps = {
  label: string;
  provider: "apple" | "google" | "facebook";
};

function SocialAuthButton({ label, provider }: SocialAuthButtonProps) {
  const icon = {
    apple: images.authAppleLogo,
    google: images.authGoogleLogo,
    facebook: images.authFacebookLogo,
  }[provider];

  return (
    <Pressable
      accessibilityRole="button"
      className="h-[52px] flex-row items-center rounded-medium border border-border-default bg-surface px-5 active:bg-surface-secondary"
    >
      <View className="w-11 items-start">
        <Image
          accessibilityLabel=""
          className="h-6 w-6"
          resizeMode="contain"
          source={icon}
        />
      </View>
      <Text className="flex-1 pr-11 text-center font-ui-semibold text-[14px] text-text-primary">
        {label}
      </Text>
    </Pressable>
  );
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const blurTargetRef = useRef<View>(null);
  const [email, setEmail] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isVerificationVisible, setVerificationVisible] = useState(false);
  const copy = copyByMode[mode];

  const navigateToMode = (nextMode: AuthMode) => {
    router.replace(nextMode === "sign-in" ? "/sign-in" : "/sign-up");
  };

  return (
    <BlurTargetView ref={blurTargetRef} style={styles.screen}>
      <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <StatusBar backgroundColor={colors.canvas} barStyle="dark-content" />

      <ScrollView
        bounces={false}
        contentContainerClassName="min-h-full px-6 pb-5 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-start">
          <Image
            accessibilityLabel="Wera"
            className="h-10 w-28"
            resizeMode="contain"
            source={images.weraLogoWithName}
          />
        </View>

        <View className="mt-1">
          <View className="h-[2px] w-12 bg-navy" />
          <Text className="mt-4 font-ui text-[15px] leading-[22px] text-text-secondary">
            Your personal stylist.{"\n"}Built around you.
          </Text>
        </View>

        <View style={styles.authSurface}>
          <View className="flex-row border-b border-border-default">
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: mode === "sign-in" }}
              className="h-14 flex-1 items-center justify-center"
              onPress={() => navigateToMode("sign-in")}
            >
              <Text className={mode === "sign-in" ? "font-ui-semibold text-[14px] text-text-primary" : "font-ui text-[14px] text-text-secondary"}>
                Log in
              </Text>
              {mode === "sign-in" && <View className="absolute bottom-0 h-[3px] w-full bg-navy" />}
            </Pressable>

            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: mode === "sign-up" }}
              className="h-14 flex-1 items-center justify-center"
              onPress={() => navigateToMode("sign-up")}
            >
              <Text className={mode === "sign-up" ? "font-ui-semibold text-[14px] text-text-primary" : "font-ui text-[14px] text-text-secondary"}>
                Create account
              </Text>
              {mode === "sign-up" && <View className="absolute bottom-0 h-[3px] w-full bg-navy" />}
            </Pressable>
          </View>

          <View className="px-5 pb-5 pt-5">
            <Text style={styles.title}>{copy.title}</Text>
            <Text className="mt-1 font-ui text-[14px] leading-5 text-text-secondary">
              {copy.description}
            </Text>

            <View className="mt-4 h-14 flex-row items-center rounded-medium border border-border-default bg-surface px-5">
              <Image
                accessibilityLabel=""
                className="h-6 w-6"
                resizeMode="contain"
                source={images.authMailIcon}
              />
              <TextInput
                accessibilityLabel="Email address"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor={colors.textSecondary}
                returnKeyType="done"
                selectionColor={colors.navy}
                value={email}
                className="ml-4 flex-1 font-ui text-[15px] text-text-primary"
              />
            </View>

            {mode === "sign-in" && (
              <View className="mt-3 h-14 flex-row items-center rounded-medium border border-border-default bg-surface px-5">
                <Image
                  accessibilityLabel=""
                  className="h-6 w-6"
                  resizeMode="contain"
                  source={images.authPasswordIcon}
                />
                <TextInput
                  accessibilityLabel="Password"
                  autoComplete="current-password"
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!isPasswordVisible}
                  selectionColor={colors.navy}
                  value={password}
                  className="ml-4 flex-1 font-ui text-[15px] text-text-primary"
                />
                <Pressable
                  accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
                  className="h-11 w-11 items-end justify-center"
                  onPress={() => setPasswordVisible((visible) => !visible)}
                >
                  {isPasswordVisible ? (
                    <EyeOff color={colors.textPrimary} size={23} strokeWidth={1.7} />
                  ) : (
                    <Eye color={colors.textPrimary} size={23} strokeWidth={1.7} />
                  )}
                </Pressable>
              </View>
            )}

            <Pressable
              accessibilityRole="button"
              className="mt-4 h-14 flex-row items-center justify-between rounded-medium bg-navy px-5 active:opacity-80"
              onPress={() => setVerificationVisible(true)}
            >
              <Text className="font-ui-semibold text-base text-surface">{copy.action}</Text>
              <ArrowRight color={colors.surface} size={23} strokeWidth={2} />
            </Pressable>

            <View className="mt-4 flex-row items-center gap-4">
              <View className="h-px flex-1 bg-border-default" />
              <Text className="font-ui text-[12px] text-text-secondary">or continue with</Text>
              <View className="h-px flex-1 bg-border-default" />
            </View>

            <View className="mt-4 gap-2">
              <SocialAuthButton label="Continue with Apple" provider="apple" />
              <SocialAuthButton label="Continue with Google" provider="google" />
              <SocialAuthButton label="Continue with Facebook" provider="facebook" />
            </View>

            <Text className="mt-4 text-center font-ui text-[12px] leading-5 text-text-secondary">
              By continuing, you agree to our{"\n"}
              <Text style={styles.legalLink}>Terms of Use</Text> and <Text style={styles.legalLink}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>

        <VerificationCodeModal
          blurTarget={blurTargetRef}
          email={email}
          onComplete={() => {
            setVerificationVisible(false);
            router.replace("/");
          }}
          onDismiss={() => setVerificationVisible(false)}
          visible={isVerificationVisible}
        />
      </SafeAreaView>
    </BlurTargetView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authSurface: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginTop: 28,
    overflow: "hidden",
    shadowColor: "#6B6258",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 4,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.editorialRegular,
    fontSize: 34,
    lineHeight: 38,
  },
  legalLink: {
    color: colors.textPrimary,
    textDecorationLine: "underline",
  },
});
