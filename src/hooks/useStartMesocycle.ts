import { useMutation } from "@tanstack/react-query";
import { axiosPost } from "./helper/axiosPost";
import { createClient } from "@/app/utils/supabase/client";
import { User } from "@prisma/client";

const updateFn = async <T>({ data }: { data: T }) => {
  const supabase = createClient();
  try {
    const { data: mutationData, error } = await supabase
      .from("profiles")
      .upsert({ data })
      .select();
    console.log(mutationData);
  } catch (error) {
    console.log(error);
  }
};

export const useUpdateProfile = <T>() => {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: T }) => updateFn({ data }),
    mutationKey: ["update-profile"],
  });
  return mutation;
};
