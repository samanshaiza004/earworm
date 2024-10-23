import { create } from 'zustand';
import { config } from '../config/env';
import type { AuthState, User } from '../types/auth';

interface AuthResponse {
  user: User;
  accessToken: string;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signInWithGithub: async () => {
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams({
        client_id: config.github.clientId,
        redirect_uri: config.github.callbackUrl,
        scope: 'read:user user:email',
      });

      window.location.href = `https://github.com/login/oauth/authorize?${params}`;
    } catch (error) {
      set({ error: 'Failed to sign in with GitHub' });
    } finally {
      set({ isLoading: false });
    }
  },

  handleGithubCallback: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${config.baseUrl}/api/auth/github/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data: AuthResponse = await response.json();
      set({ user: data.user, isAuthenticated: true });

      // Store the access token securely
      localStorage.setItem('auth_token', data.accessToken);
      
      return data;
    } catch (error) {
      set({ error: 'Failed to complete GitHub authentication' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      localStorage.removeItem('auth_token');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: 'Failed to sign out' });
    } finally {
      set({ isLoading: false });
    }
  },
}));