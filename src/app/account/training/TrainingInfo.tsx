"use client"
import { useGetTrainingInfos } from "@/hooks/useGetTrainingInfo";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";





const TrainingInfo = ({ user }: { user: User }) => {
    if (!user) {
        redirect('/login')
    }

    const { data, isLoading, error } = useGetTrainingInfos({ user })

    if (isLoading) {
        return <div>...loading</div>
    }

    if (error) {
        return <div>...Error</div>
    }

    console.log(data)

    return (
        <section>
            <>
            </>
        </section>
    );
}

export default TrainingInfo;