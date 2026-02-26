// src/utils/supabase/server.ts

import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../lib/database.types'; // Caminho relativo correto

export const createSupabaseServerClient = async () => {
  // No Next.js 15, o cookies() é uma Promise. Você DEVE usar o await.
  const cookieStore = await cookies(); 

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          // O Try/Catch previne erros em Server Components onde setar cookies é restrito
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Pode ignorar se for apenas leitura
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Pode ignorar
          }
        },
      },
    }
  );
};