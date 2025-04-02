const BASE_URL = "http://localhost:3000";

export const authApi = {
  async login(payload: { email: string; password: string }): Promise<{
    message: string;
    user: { id: number; email: string; name?: string; password: string };
  }> {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (!response.ok) {
      const errResponse = await response.json();
      throw new Error(
        errResponse.message || `Login failed with status: ${response.status}`
      );
    }
    return response.json();
  },

  async getCurrentUser() {
    const response = await fetch(`${BASE_URL}/api/user/profile`, {
      credentials: "include",
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Not authenticated");
    }

    return response.json();
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Not authenticated");
    }

    return response.json();
  },
};
