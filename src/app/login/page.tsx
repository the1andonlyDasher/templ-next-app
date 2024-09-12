'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful');
    } else {
      setError(data.message);
    }
  };

  return (
    <section>
    <div 
    className='form-wrapper'
    >
    <h2 className='font-sans font-bold text-center'>Login</h2>
    <form
    className='form-container'
    onSubmit={handleLogin}>
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
      <button className='font-sans btn__alt' type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
    </div>
    </section>
  );
}
