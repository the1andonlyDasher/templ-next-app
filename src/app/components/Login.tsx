
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, signup } from "../login/actions";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");




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
                        type="submit"
                        formAction={login}
                    >
                        Login
                    </button>
                    <p className="text-black text-sm font-bold">oder</p>
                    <button
                        className="btn__alt"
                        type="submit"
                        formAction={signup}
                    >
                        Registrieren
                    </button>
                </form>
            </div>
        </>
    );
}