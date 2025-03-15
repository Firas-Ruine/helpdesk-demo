import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Cookies from 'js-cookie';
import { routesName } from "../../interfaces/routeName.interface";
export const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    Cookies.set('token', '', { expires: new Date(0) });
    router.push(routesName.login); 
  }, [router]);

  return { logout };
};