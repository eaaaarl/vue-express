import { defineStore } from "pinia";
import type {
  loginAuthPayload,
  loginAuthResponse,
  User,
} from "./auth.interface";
import { authApi } from "@/features/auth/api/auth.api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    accessToken: "",
    user: null as User | null,
  }),
  actions: {
    async establishAuth({ user, accessToken }: loginAuthResponse) {
      this.user = Object.assign({}, user);
      this.accessToken = accessToken;
      this.isAuthenticated = true;
      window.localStorage.setItem("access_token", accessToken);
      window.localStorage.setItem("user", JSON.stringify(user));
    },

    checkAuth() {
      const storedToken = window.localStorage.getItem("access_token");
      const storedUser = window.localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.user = user;
          this.accessToken = storedToken;
          this.isAuthenticated = true;
          return true;
        } catch (e) {
          this.clearAuth();
          return false;
        }
      }
      return false;
    },

    clearAuth() {
      this.user = null;
      this.accessToken = "";
      this.isAuthenticated = false;
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("user");
    },

    disabledAuth() {
      this.clearAuth(); // Use the new clearAuth method
    },

    async login(payload: loginAuthPayload) {
      try {
        const response = await authApi.login(payload);
        const { user, accessToken, message } = response;
        this.establishAuth({ user, accessToken });
        return {
          success: true,
          message: message,
          user: user,
          accessToken: accessToken,
        };
      } catch (error) {
        if (error instanceof Error) {
          return {
            success: false,
            message: error.message || "Login failed, please try again.",
          };
        }
        return {
          success: false,
          message: "An unexpected error occurred.",
        };
      }
    },
  },
});
