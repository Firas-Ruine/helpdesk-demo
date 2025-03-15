import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "@/interfaces/user/user.interface";
import AuthService from "@/services/authService";
import * as Yup from "yup"
import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { routesName } from "../../interfaces/routeName.interface";

export const useLogin = () => {
    const router = useRouter()
    
  const [showPassword, setShowPassword] = useState(false)

    const initialValues :LoginRequest = {
        login: "",
        password: "",
    } 
    
    const validationSchema = Yup.object().shape({
        login: Yup.string().required("Login is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })

  const { mutate, isPending, isError, error, data } = useMutation<
    LoginResponse,
    Error,
    LoginRequest
  >({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
      onSuccess: async (response) => {
          Cookies.set("token", response.data.access_token, { expires: new Date(Date.now() + response.data.expires_in * 1000) })
          router.push(routesName.dashboard)
    },
    onError: (err) => {
      console.error("Login failed:", err.message);
    },
  });

  return {
    login: mutate,
    data,        
    isLoading: isPending, 
    isError,      
      error: error?.message || null, 
      initialValues,
      validationSchema,
      showPassword,setShowPassword
  };
};