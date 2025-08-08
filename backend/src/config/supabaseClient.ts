import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Database } from "../models/supabase.types";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  supabaseUrl || "",
  supabaseSecretKey || ""
);
