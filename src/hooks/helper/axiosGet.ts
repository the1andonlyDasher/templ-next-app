import { AxiosError, AxiosRequestConfig } from "axios";
import { setupAxiosRequest } from "./setupAxiosRequest";

export const axiosGet = async <T>({
  url,
}: {
  url: string;
}): Promise<T | AxiosError> => {
  const config: AxiosRequestConfig = {
    url,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
    },
  };
  return setupAxiosRequest<T>(config);
};
