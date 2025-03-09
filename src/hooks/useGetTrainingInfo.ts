import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "./helper/axiosGet";
import { API_ROUTE_TRAINING_INFO } from "../app/constants";
import { User } from "@supabase/supabase-js";
import { createClient } from "../app/utils/supabase/client";

interface TrainingInfosProps {
  user: User;
}

const fetchTrainingInfo = async ({ user }: { user: User }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("mesocycles")
    .select("*")
    .eq("id", user.id);
  return data;
};

export const useGetTrainingInfos = ({ user }: TrainingInfosProps) => {
  const url = `${API_ROUTE_TRAINING_INFO}?select=*&id=eq.${user.id}`;
  const shouldFetch = !url.includes("undefined");
  const { data, isLoading, error } = useQuery({
    queryKey: ["training-info", user?.id], // Ensure query key is valid
    queryFn: async () => fetchTrainingInfo({ user }),
    enabled: !!user?.id, // Prevent execution if user.id is not available
  });

  return { data, isLoading, error };
};
