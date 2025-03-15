import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatUrl = (url: string, params: string | (string | number)[]) => {
    if (Array.isArray(params)) {
      let index = 0;
      return url.replace(/{\w+}/g, () => params[index++].toString());
    } else {
      return url.replace(/{\w+}/, params.toString());
    }
  };