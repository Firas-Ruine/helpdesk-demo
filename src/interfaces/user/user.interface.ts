export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  };
}

export interface MeResponse {
  id: number;
  is_staff: boolean;
  name?: string;
  email?: string;
}
