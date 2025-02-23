

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { login, signup } from './actions'
import { cookies } from 'next/headers';
import Login from '../components/Login';

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



