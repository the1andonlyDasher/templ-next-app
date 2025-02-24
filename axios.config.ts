import { createClient } from "@supabase/supabase-js";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ntxrlruzyawmfwhaefwv.supabase.co/rest/v1/",
  withCredentials: false, // Supabase doesn't need this
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
});

// Add Authorization dynamically if available
axiosInstance.interceptors.request.use(async (config) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
