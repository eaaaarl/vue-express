export interface SignInUserDto {
  email: string;
  password: string;
}

export interface SignUpUserDto {
  id: number;
  email: string;
  password: string;
  name?: string;
}
