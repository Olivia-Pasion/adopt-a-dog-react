import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div>
      {!user && (
        <div>
          <NavLink className="sign-in" to="/auth/sign-in">
            Sign-In
          </NavLink>
          <NavLink className="sign-up" to="/auth/sign-up">
            Sign Up
          </NavLink>
        </div>
      )}
      {user && (
        <div>
          <h2>{user.email}</h2>
          <div>Sign Out</div>
        </div>
      )}
    </div>
  );
}

//Change Signout to a nav link?
