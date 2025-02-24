import { AxiosError, AxiosRequestConfig } from "axios";
import { setupAxiosRequest } from "./setupAxiosRequest";

export const axiosPost = async <T>({
  url,
  data,
}: {
  url: string;
  data: T;
}): Promise<T | AxiosError> => {
  const config: AxiosRequestConfig = {
    url,
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Add Supabase API key
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`, // Auth header
    },
  };
  return setupAxiosRequest<T>(config);
};
