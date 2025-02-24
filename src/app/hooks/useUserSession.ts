import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/app/utils/supabase/client";

// Fetch user session
const fetchUserSession = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const useUserSession = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-session"],
    queryFn: fetchUserSession,
    staleTime: 5 * 60 * 1000, // Cache the session data for 5 minutes
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};
