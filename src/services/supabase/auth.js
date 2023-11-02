import { supabase } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error);
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw error;
  return null;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) throw Error("Session not found, login in again");

  await supabase.auth.getUser();

  return null;
}
