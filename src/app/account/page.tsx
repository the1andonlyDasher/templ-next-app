import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import AccountForm from '../components/user/AccountForm'
import TrainingInfo from './training/TrainingInfo'



export default async function PrivatePage() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        console.log(error);
        redirect('/login')
    }


    const { data: trainingInfo } = await supabase
        .from("mesocycles")
        .select("*")
        .eq("id", data?.user.id);

    console.log(trainingInfo)

    return (
        <section>
            <AccountForm user={data.user} />
            <TrainingInfo user={data.user} />
        </section>)
}