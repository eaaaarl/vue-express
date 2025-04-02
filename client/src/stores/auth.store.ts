import { defineStore } from "pinia";
import type { loginAuthPayload, User } from "./types";
import { authApi } from "@/features/auth/api/auth.api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
  }),
  actions: {
    async establishAuth({ user }: any) {
      console.log("establishAuth :", user);
      this.user = Object.assign({}, user);
      this.isAuthenticated = true;

      console.log(this.isAuthenticated);
    },

    clearAuth() {
      this.user = null;
      this.isAuthenticated = false;
    },

    async login(payload: loginAuthPayload) {
      try {
        const response = await authApi.login(payload);
        const { message, user } = response;
        await this.establishAuth({ user });
        return {
          success: true,
          message: message,
          user: user,
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

    async logout() {
      try {
        await authApi.logout();
        this.clearAuth();
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : "Logout failed",
        };
      }
    },

    async verifyAuth() {
      try {
        const response = await authApi.getCurrentUser();

        if (response && response.user) {
          await this.establishAuth({ user: response.user });
          return true;
        }
        return false;
      } catch (error) {
        console.log("verifyAuth error:", error);

        if (error instanceof Error && error.message === "Not authenticated") {
          this.clearAuth();
        }

        return false;
      }
    },
  },
  persist: true,
});
