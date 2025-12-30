import { clsx, type ClassValue } from "clsx"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const showErrMsg = (err:any)=>{
  toast.error(err.response?.data?.message||"Something went wrong!")
}
