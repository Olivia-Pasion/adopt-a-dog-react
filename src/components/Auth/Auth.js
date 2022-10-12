import { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { authUser } from '../../services/auth';
import './Auth.css';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  if (user) {
    return <Redirect to="/"></Redirect>;
  }

  // onClick handler for auth
  const handleSubmit = async () => {
    const usersInput = await authUser(email, password, type);

    setUser(usersInput);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-form-container">
      <div>
        <h1>{type}</h1>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            value={email}
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            placeholder="password"
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
