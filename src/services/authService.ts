import { LoginRequest, LoginResponse, MeResponse } from "@/interfaces/user/user.interface";
import apiClient from "@/lib/apiInterceptor";

const apiUrls = {
    login: '/authorization/login',
    me: '/authorization/user'
}
const  AuthService = {
    async login({ login, password }: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>(apiUrls.login, { login, password });
        return response.data;
    },

    async me(): Promise<MeResponse> {
        const response = await apiClient.get<MeResponse>(apiUrls.me);
        return response.data;
    }
}
export default AuthService 