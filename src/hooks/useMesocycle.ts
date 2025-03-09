import { useMutation } from "@tanstack/react-query";
import { createClient } from "../app/utils/supabase/client";

export const insertMesocycle = async ({
  mesoName,
  numMicrocycles,
}: {
  mesoName: string;
  numMicrocycles: number;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Mesocycles")
    .insert([
      {
        name: mesoName,
        num_microcycles: numMicrocycles,
        start_date: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting mesocycle:", error);
    throw new Error(error.message);
  }
  return data;
};

export const useInsertMesocycle = () => {
  return useMutation({
    mutationKey: ["mesocycle"],
    mutationFn: insertMesocycle,
  });
};
