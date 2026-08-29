import { colors, fontFamilies } from "@/theme";
import { BlurView } from "expo-blur";
import { Check, X } from "lucide-react-native";
import { type RefObject, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type VerificationCodeModalProps = {
  blurTarget: RefObject<View | null>;
  email: string;
  onComplete: () => void;
  onDismiss: () => void;
  visible: boolean;
};

const CODE_LENGTH = 6;

export function VerificationCodeModal({
  blurTarget,
  email,
  onComplete,
  onDismiss,
  visible,
}: VerificationCodeModalProps) {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!visible) {
      setCode("");
    }
  }, [visible]);

  const focusCodeInput = () => inputRef.current?.focus();

  const handleCodeChange = (value: string) => {
    const nextCode = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(nextCode);

    if (nextCode.length === CODE_LENGTH) {
      Keyboard.dismiss();
      onComplete();
    }
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    onDismiss();
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => undefined}
      presentationStyle="overFullScreen"
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalRoot}
      >
        <BlurView
          blurMethod="dimezisBlurViewSdk31Plus"
          blurTarget={blurTarget}
          intensity={60}
          pointerEvents="none"
          style={styles.backdrop}
          tint="systemUltraThinMaterialLight"
        />

        <View pointerEvents="none" style={styles.dimmer} />

        <Pressable
          accessibilityLabel="Enter verification code"
          style={styles.dialog}
          onPress={focusCodeInput}
        >
          <View className="flex-row items-start justify-between">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-surface-secondary">
              <Check color={colors.navy} size={24} strokeWidth={2.25} />
            </View>

            <Pressable
              accessibilityLabel="Close verification dialog"
              className="h-11 w-11 items-center justify-center rounded-full active:bg-surface-secondary"
              onPress={handleDismiss}
            >
              <X color={colors.textPrimary} size={22} strokeWidth={1.75} />
            </Pressable>
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.description}>
            We&apos;ve sent a verification code to{"\n"}
            <Text style={styles.email}>{email || "your email address"}</Text>.
          </Text>

          <Pressable
            accessibilityLabel="Enter verification code"
            className="mt-8 flex-row justify-between"
            onPressIn={focusCodeInput}
          >
            {Array.from({ length: CODE_LENGTH }, (_, index) => (
              <View
                className="h-14 w-11 items-center justify-center rounded-small border border-border-default bg-canvas"
                key={index}
              >
                <Text style={styles.codeDigit}>{code[index] ?? ""}</Text>
              </View>
            ))}
          </Pressable>

          <TextInput
            ref={inputRef}
            accessibilityLabel="Six digit verification code"
            autoComplete="one-time-code"
            caretHidden
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            onChangeText={handleCodeChange}
            style={styles.hiddenInput}
            textContentType="oneTimeCode"
            value={code}
          />

          <Text className="mt-6 text-center font-ui text-[12px] leading-5 text-text-secondary">
            Enter the six-digit code to continue.
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  backdrop: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  dimmer: {
    backgroundColor: "rgba(250, 249, 246, 0.16)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    maxWidth: 360,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 34,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 20,
    width: "100%",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.editorialRegular,
    fontSize: 32,
    lineHeight: 37,
    marginTop: 18,
  },
  description: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.ui,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  email: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.uiSemibold,
  },
  codeDigit: {
    color: colors.navy,
    fontFamily: fontFamilies.uiSemibold,
    fontSize: 20,
  },
  hiddenInput: {
    height: 1,
    opacity: 0,
    position: "absolute",
    width: 1,
  },
});
