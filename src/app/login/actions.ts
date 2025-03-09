"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

// Utility function to safely get form data as a string
function getFormValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value === "string") {
    return value;
  }
  return null;
}

// Define the Yup validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export async function login(formData: FormData) {
  const supabase = createClient();

  // Use the utility to safely extract string values
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  // Check for missing values before proceeding
  if (!email || !password) {
    return redirect("/error");
  }

  const data = { email, password };

  // Validate inputs using Yup
  try {
    await loginSchema.validate(data, { abortEarly: false });
  } catch (validationError) {
    // Handle validation error
    return redirect("/error");
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  // Use the utility to safely extract string values
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  // Check for missing values
  if (!email || !password) {
    return redirect("/error");
  }

  const data = { email, password };

  // Validate inputs using Yup
  try {
    await loginSchema.validate(data, { abortEarly: false });
  } catch (validationError) {
    return redirect("/error");
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    return redirect("/error");
  }

  queryClient.invalidateQueries({ queryKey: ["user-session"] });
  revalidatePath("/", "layout");
  redirect("/account");
}
