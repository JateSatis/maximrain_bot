import { supabase } from "../config/supabaseClient";

type UserModel = {
  first_name: string | null;
  last_name: string | null;
  telegram_user_id: number;
  username: string | null;
};

export const findOrCreateUser = async (user: UserModel) => {
  const { data, error } = await supabase
    .from("users")
    .upsert(user, { onConflict: "id" });

  if (error) throw new Error(`DB error: ${error.message}`);
  return data;
};
