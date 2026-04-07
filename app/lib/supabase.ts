import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.lglfgunwasludfksavhb!;
const supabaseAnonKey = process.env.sb_publishable_B_4z_HM8jzTCjsJChhzhJQ_xBB3C7o5!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
