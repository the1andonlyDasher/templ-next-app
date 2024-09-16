

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Login from '../components/Login';
import { cookies } from 'next/headers';

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    redirect("/");
  }

  return (
    <section>
      <h1 className="text-2xl text-center mb-6">Login</h1>
      <Login />
    </section>
  );
}
