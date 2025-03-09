import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "axios.config";

export const setupAxiosRequest = async <T>(config: AxiosRequestConfig) => {
  try {
    config.headers = {
      ...config.headers,
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service key for admin requests
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    };

    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
