'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useAnimate, useAnimation, usePresence } from "framer-motion"
import Link from 'next/link';

const wrapperVariants = {
  initial: { opacity: 0, display: "none" },
  enter: { opacity: 1, display: "flex" },
  exit: { opacity: 0, transitionEnd: { display: "none" } },
}

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const formControls = useAnimation()
  const modalControls = useAnimation()
  // const [form, animateForm] = useAnimate()
  // const [isPresent, safeToRemove] = usePresence()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registration successful');
    } else {
      setError(data.message);
    }
  };

  const testForm = () => {
    formControls.start("exit").then(() => {
      modalControls.start("enter")
    })
  }

  useEffect(() => {
    formControls.start("enter")
  }, []);

  // useEffect(() => {
  //   if (isPresent) {
  //     const enterAnimation = async () => {
  //       await animate(form.current, { opacity: 1 })
  //       await animate("input", { opacity: 1, x: 0 })
  //       await animate("button", { opacity: 1, x: 0 })
  //     }
  //     enterAnimation()

  //   } else {
  //     const exitAnimation = async () => {
  //       await animate("input", { opacity: 0, x: -100 })
  //       await animate("button", { opacity: 0, x: -100 })
  //       await animate(form.current, { opacity: 0 })
  //       safeToRemove()
  //     }

  //     exitAnimation()
  //   }
  // }, [isPresent])

  return (
    <section>
      <motion.div
        initial="initial"
        animate={formControls}
        exit="exit"
        variants={wrapperVariants}
        className='form-wrapper'
      >
        <h2 className='font-sans font-bold text-center'>Registrieren</h2>
        <form

          className='form-container'
          // WARNING! TEST FUNCTION ACTIVE
          onSubmit={handleRegister}>
          <input
            className='font-sans font-normal'

            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='font-sans font-normal'

            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='font-sans font-normal'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='btn__alt font-sans' type="submit">Registrieren</button>
          {/* <button onClick={testForm} type="button" className='btn__alt font-sans'>TEst</button> */}

          {error && <p>{error}</p>}
        </form>
      </motion.div>
      <motion.div
        className='flex flex-wrap gap-4 p-10 m-auto rounded-md h-30 bg-white border border-[#eeeeee] shadow-sm'
        variants={wrapperVariants}
        initial="initial"
        animate={modalControls}
        exit="exit"
      >
        <h2>Registrierung erfolgreich!</h2>
        <Link className='btn__alt' href="/login">Login</Link>
        <Link className='btn__outline' href="/">Home</Link>
      </motion.div>
    </section>
  );
}
