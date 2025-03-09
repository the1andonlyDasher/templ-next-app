'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/app/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { useUpdateProfile } from '@/hooks/useStartMesocycle'
import { useForm } from 'react-hook-form'

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)
    const formSetup = useForm()
    const { clearErrors, setValue, handleSubmit } = formSetup
    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError || !userData?.user) {
                throw new Error("User not authenticated");
            }


            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userData.user.id) // Ensure correct ID format
                .single();

            if (error) {
                console.error("Profile fetch error:", error);
                throw error;
            }

            if (profile) {
                setFullname(profile.full_name);
                setUsername(profile.username);
                setWebsite(profile.website);
                setAvatarUrl(profile.avatar_url);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    const { mutate, isPending, error } = useUpdateProfile()


    useEffect(() => {
        getProfile()
    }, [user, getProfile])



    const onSubmit = () => {
        mutate({ data: { fullname: "", username, website, avatar_url } })
    }

    return (<>
        <div className="flex max-w-min flex-col border-black gap-6 border backdrop-blur-md rounded-xl p-10">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap gap-10">
                    <label htmlFor="email">Email</label>
                    <input className='bg-black p-2 rounded-sm text-white' id="email" type="text" value={user?.email} disabled />
                </div>
                <div className="flex flex-wrap gap-10">
                    <label htmlFor="fullName">Full Name</label>
                    <input className='bg-black p-2 rounded-sm text-white'
                        id="fullName"
                        type="text"
                        value={fullname || ''}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-10">
                    <label htmlFor="username">Username</label>
                    <input className='bg-black p-2 rounded-sm text-white'
                        id="username"
                        type="text"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-10">
                    <label htmlFor="website">Website</label>
                    <input
                        className='bg-black p-2 rounded-sm text-white'
                        id="website"
                        type="url"
                        value={website || ''}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap gap-10">
                    <button
                        className="button primary block text-black p-2 border borde-black"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
        <div className="flex flex-wrap gap-10">
            <form action="/auth/signout" method="post">
                <button className="button block text-black p-2" type="submit">
                    Sign out
                </button>
            </form>
        </div>
    </>
    )
}