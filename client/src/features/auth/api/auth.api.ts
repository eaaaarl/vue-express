const BASE_URL = "http://localhost:3000";

interface ApiLoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
  accessToken: string;
}

export const authApi = {
  async login(payload: {
    email: string;
    password: string;
  }): Promise<ApiLoginResponse> {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errResponse = await response.json();
      throw new Error(
        errResponse.message || `Login failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  },
};
