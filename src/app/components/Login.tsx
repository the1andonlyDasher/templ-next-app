
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignUp = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
            router.refresh();
        }
    };

    const handleSignIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
            router.refresh();
        }
    };

    return (
        <>
            <div className="form-wrapper max-w-[400px] mx-auto">
                {errorMessage && <p className="bg-red-700 p-4">{errorMessage}</p>}
                <form className="form-container login">
                    <label aria-label="email">
                        Email
                        <input
                            placeholder="alex@beispielperson.de"
                            name="email"
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </label>

                    <label aria-label="password">
                        Passwort
                        <input
                            placeholder="Passwort..."
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </label>

                    <button
                        className="btn__outline"
                        type="button"
                        onClick={handleSignIn}
                    >
                        Login
                    </button>
                    <p className="text-black text-sm font-bold">oder</p>
                    <button
                        className="btn__alt"
                        type="button"
                        onClick={handleSignUp}
                    >
                        Registrieren
                    </button>
                </form>
            </div>
        </>
    );
}