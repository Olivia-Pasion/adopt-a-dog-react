import { useContext, useState } from 'react';
import { /*Redirect*/ useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { authUser } from '../../services/auth';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  // NavLink instead of h1? Highlight if active

  // redirect if user needs to sign up instead of sign in
  if (user) {
    // return <Redirect to="/"></Redirect>;
    console.log('got user', user);
  }

  // create onClick handler for auth
  const handleSubmit = async () => {
    const usersInput = await authUser(email, password, type);

    setUser(usersInput);

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div>
        <h1>{type}</h1>
        <input
          value={email}
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
