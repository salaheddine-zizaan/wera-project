import { VerificationCodeModal } from "@/components/auth/VerificationCodeModal";
import { images } from "@/constants/images";
import { colors, fontFamilies } from "@/theme";
import { useAuth, useSignIn, useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { BlurTargetView } from "expo-blur";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
type VerificationPurpose = "sign-in-mfa" | "sign-up";

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
  disabled: boolean;
  onPress: () => void;
};

function SocialAuthButton({ disabled, label, onPress, provider }: SocialAuthButtonProps) {
  const icon = {
    apple: images.authAppleLogo,
    google: images.authGoogleLogo,
    facebook: images.authFacebookLogo,
  }[provider];

  return (
    <Pressable
      accessibilityRole="button"
      className="h-[52px] flex-row items-center rounded-medium border border-border-default bg-surface px-5 active:bg-surface-secondary disabled:opacity-60"
      disabled={disabled}
      onPress={onPress}
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

type ClerkErrorShape = {
  errors?: Array<{
    longMessage?: string;
    message?: string;
  }>;
  message?: string;
};

const socialStrategyByProvider = {
  apple: "oauth_apple",
  facebook: "oauth_facebook",
  google: "oauth_google",
} as const;

function getClerkErrorMessage(error: unknown, fallback: string) {
  if (typeof error !== "object" || error === null) {
    return fallback;
  }

  const clerkError = error as ClerkErrorShape;
  return clerkError.errors?.[0]?.longMessage ?? clerkError.errors?.[0]?.message ?? clerkError.message ?? fallback;
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();
  const blurTargetRef = useRef<View>(null);
  const [email, setEmail] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerificationVisible, setVerificationVisible] = useState(false);
  const [verificationPurpose, setVerificationPurpose] = useState<VerificationPurpose>("sign-up");
  const copy = copyByMode[mode];

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace(mode === "sign-up" ? "/profile-welcome" : "/");
    }
  }, [isLoaded, isSignedIn, mode, router]);

  const navigateToMode = (nextMode: AuthMode) => {
    router.replace(nextMode === "sign-in" ? "/sign-in" : "/sign-up");
  };

  const showError = (error: unknown, fallback: string) => {
    Alert.alert("Unable to continue", getClerkErrorMessage(error, fallback));
  };

  const handlePrimaryAction = async () => {
    const emailAddress = email.trim();

    if (!emailAddress) {
      Alert.alert("Email required", "Enter your email address to continue.");
      return;
    }

    if (!password) {
      Alert.alert("Password required", "Enter a password to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "sign-up") {
        const { error: createError } = await signUp.password({
          emailAddress,
          password,
        });

        if (createError) {
          showError(createError, "We couldn't create your account.");
          return;
        }

        const { error: emailCodeError } = await signUp.verifications.sendEmailCode();

        if (emailCodeError) {
          showError(emailCodeError, "We couldn't send your verification code.");
          return;
        }

        setVerificationPurpose("sign-up");
        setVerificationVisible(true);
        return;
      }

      const { error: passwordError } = await signIn.password({
        emailAddress,
        password,
      });

      if (passwordError) {
        showError(passwordError, "Your email address or password is incorrect.");
        return;
      }

      if (signIn.status === "needs_second_factor" || signIn.status === "needs_client_trust") {
        const supportsEmailCode = signIn.supportedSecondFactors.some(
          (factor) => factor.strategy === "email_code",
        );

        if (!supportsEmailCode) {
          Alert.alert(
            "Additional verification required",
            "This device needs a verification method that isn't available in this app yet.",
          );
          return;
        }

        const { error: emailCodeError } = await signIn.mfa.sendEmailCode();

        if (emailCodeError) {
          showError(emailCodeError, "We couldn't send your verification code.");
          return;
        }

        setVerificationPurpose("sign-in-mfa");
        setVerificationVisible(true);
        return;
      }

      if (signIn.status !== "complete") {
        Alert.alert(
          "Sign in needs more information",
          "This account needs an additional verification step before it can be signed in.",
        );
        return;
      }

      const { error: finalizeError } = await signIn.finalize();

      if (finalizeError) {
        showError(finalizeError, "We couldn't complete your sign in.");
        return;
      }

      router.replace("/");
    } catch (error) {
      showError(error, "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationComplete = async (code: string) => {
    if (verificationPurpose === "sign-in-mfa") {
      const { error: verificationError } = await signIn.mfa.verifyEmailCode({ code });

      if (verificationError) {
        showError(verificationError, "That verification code isn't valid. Please try again.");
        return;
      }

      if (signIn.status !== "complete") {
        Alert.alert(
          "Sign in needs more information",
          "This account needs an additional verification step before it can be signed in.",
        );
        return;
      }

      const { error: finalizeError } = await signIn.finalize();

      if (finalizeError) {
        showError(finalizeError, "We couldn't complete your sign in.");
        return;
      }

      setVerificationVisible(false);
      router.replace("/");
      return;
    }

    const { error: verificationError } = await signUp.verifications.verifyEmailCode({ code });

    if (verificationError) {
      showError(verificationError, "That verification code isn't valid. Please try again.");
      return;
    }

    const { error: finalizeError } = await signUp.finalize();

    if (finalizeError) {
      showError(finalizeError, "We couldn't complete your account setup.");
      return;
    }

    setVerificationVisible(false);
    router.replace("/profile-welcome");
  };

  const handleSocialAuth = async (provider: keyof typeof socialStrategyByProvider) => {
    setIsSubmitting(true);

    try {
      await startSSOFlow({ strategy: socialStrategyByProvider[provider] });
      router.replace(mode === "sign-up" ? "/profile-welcome" : "/");
    } catch (error) {
      showError(error, `We couldn't continue with ${provider}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoaded && isSignedIn) {
    return null;
  }

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

            <View className="mt-3 h-14 flex-row items-center rounded-medium border border-border-default bg-surface px-5">
              <Image
                accessibilityLabel=""
                className="h-6 w-6"
                resizeMode="contain"
                source={images.authPasswordIcon}
              />
              <TextInput
                accessibilityLabel="Password"
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
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

            <Pressable
              accessibilityRole="button"
              className="mt-4 h-14 flex-row items-center justify-between rounded-medium bg-navy px-5 active:opacity-80 disabled:opacity-60"
              disabled={isSubmitting}
              onPress={() => void handlePrimaryAction()}
            >
              <Text className="font-ui-semibold text-base text-surface">{copy.action}</Text>
              {isSubmitting ? (
                <ActivityIndicator accessibilityLabel="Processing authentication" color={colors.surface} size="small" />
              ) : (
                <ArrowRight color={colors.surface} size={23} strokeWidth={2} />
              )}
            </Pressable>

            <View className="mt-4 flex-row items-center gap-4">
              <View className="h-px flex-1 bg-border-default" />
              <Text className="font-ui text-[12px] text-text-secondary">or continue with</Text>
              <View className="h-px flex-1 bg-border-default" />
            </View>

            <View className="mt-4 gap-2">
              <SocialAuthButton
                disabled={isSubmitting}
                label="Continue with Apple"
                onPress={() => void handleSocialAuth("apple")}
                provider="apple"
              />
              <SocialAuthButton
                disabled={isSubmitting}
                label="Continue with Google"
                onPress={() => void handleSocialAuth("google")}
                provider="google"
              />
              <SocialAuthButton
                disabled={isSubmitting}
                label="Continue with Facebook"
                onPress={() => void handleSocialAuth("facebook")}
                provider="facebook"
              />
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
          onComplete={handleVerificationComplete}
          onDismiss={() => {
            setVerificationVisible(false);
            setVerificationPurpose("sign-up");
          }}
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
