
import Link from 'next/link'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from '@/lib/prisma';


export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  // if (!data.session?.user) {
  //   redirect("/login");
  // }


  return (

    <section>
      {/* <h1 className="text-2xl text-center mb-8">Protected page</h1> */}
      {/* <pre>{JSON.stringify({ session: data.session }, null, 4)}</pre> */}
      {/* <div className='w-full flex flex-row justify-end gap-6 mb-auto'>
        <Link className='btn__alt' href="/login">Login</Link>
        <Link className="btn__alt" href="/registrieren">Registrieren</Link>
      </div> */}
    </section>


  );
}

