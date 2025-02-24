import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // persistSession: true, // 🔥 Keeps user session in local storage
        autoRefreshToken: true, // 🔥 Automatically refreshes tokens
      },
    }
  );
}
