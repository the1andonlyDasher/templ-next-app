import { useMutation } from "@tanstack/react-query";
import { axiosPost } from "./helper/axiosPost";

export const useUpdateProfile = <T>() => {
  const mutation = useMutation({
    mutationFn: ({ url, data }: { url: string; data: T }) => {
      try {
        return axiosPost({ url: url, data: data });
      } catch (error) {
        throw error;
      }
    },
    mutationKey: ["update-profile"],
  });
  return mutation;
};
