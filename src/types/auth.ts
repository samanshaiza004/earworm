/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
    id: string;
    username: string;
    avatarUrl: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signInWithGithub: () => Promise<void>;
    handleGithubCallback: (code: string) => Promise<any>;
    signOut: () => Promise<void>;
  }