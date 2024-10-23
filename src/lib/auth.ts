import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      window.location.href = "/api/auth/signin/google";
    } catch (error) {
      set({ error: "Failed to sign in with Google" });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithGithub: async () => {
    set({ isLoading: true, error: null });
    try {
      window.location.href = "/api/auth/signin/github";
    } catch (error) {
      set({ error: "Failed to sign in with GitHub" });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: "Failed to sign out" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
