import { createClient } from '@supabase/supabase-js';

declare global {
  var supabase: typeof createClient | undefined;
}

export const supabase =
  global.supabase ||
  createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
  );
