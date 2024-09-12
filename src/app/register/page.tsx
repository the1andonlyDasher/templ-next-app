'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  return (
    <section>
    <div 
    className='form-wrapper'
    >
    <h2 className='font-sans font-bold text-center'>Registrieren</h2>
    <form
    className='form-container'
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
      <button className='btn__alt font-sans' type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
    </div>
    </section>
  );
}
