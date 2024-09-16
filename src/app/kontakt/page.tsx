
import Link from 'next/link'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from '@/lib/prisma';
import ContactForm from '../components/ContactForm';


export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    // if (!data.session?.user) {
    //   redirect("/login");
    // }


    return (

        <section>
            <ContactForm props={{
                title: "Kontakt",
                subtitle: "Haben Sie eine Frage? Lassen Sie uns wissen wie wir Ihnen behilflich sein können:",
                sectionName: "contact",
                id: undefined
            }} />
        </section>


    );
}

