import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
// O Supabase SDK original também funciona, mas o auth-helpers
// é mais robusto para gerenciar a autenticação em apps Next.js.

// Esta função garante que o cliente seja criado apenas uma vez (singleton)
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);