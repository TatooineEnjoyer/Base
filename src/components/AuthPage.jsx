import React, { useState } from 'react';
import { logIn, signUp } from '../firebase';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth-wrapper">
      <h2>Авторизация</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <button onClick={() => logIn(email, password)}>Log in</button>
        <button onClick={() => signUp(email, password)}>Sign up</button>
      </div>
    </div>
  );
};

export default AuthPage;
