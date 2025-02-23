import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import AccountForm from '../components/user/AccountForm'



export default async function PrivatePage() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <AccountForm user={data.user} />
}