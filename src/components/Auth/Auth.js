import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // NavLink instead of h1? Highlight if active

  // redirect if user needs to sign up instead of sign in

  // create onClick handler for auth

  return (
    <div>
      <div>
        <h1>{type}</h1>
        <input value={email} name="email" />
        <input type="password" value={password} name="password" />
        <button></button>
      </div>
    </div>
  );
}
