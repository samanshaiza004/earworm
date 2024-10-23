export const config = {
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID as string,
    clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET as string,
    callbackUrl:
      import.meta.env.VITE_GITHUB_CALLBACK_URL ||
      "http://localhost:5173/api/auth/callback/github",
  },
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5173",
};
