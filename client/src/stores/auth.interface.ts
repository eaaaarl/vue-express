export interface loginAuthPayload {
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
}

export interface loginAuthResponse {
  user: User;
  accessToken: string;
}
