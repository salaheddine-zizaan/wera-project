import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const AUTH_SESSION_STORAGE_KEY = "wera:auth-session";

type AuthSession = {
  username: string;
};

type AuthSessionStore = {
  session?: AuthSession;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
};

export const useAuthSessionStore = create<AuthSessionStore>()(
  persist(
    (set) => ({
      session: undefined,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: undefined }),
    }),
    {
      name: AUTH_SESSION_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
