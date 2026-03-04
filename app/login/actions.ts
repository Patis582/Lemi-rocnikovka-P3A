"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { create } from "node:domain";

export type AuthState = {
  error: string | null;
};


export async function login(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Vyplňte jméno a heslo" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function signUp(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
        return { error: "Vyplňte jméno a heslo" };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect("/");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate with Google");
  }

  if (data.url) {
    redirect(data.url);
  }
}
