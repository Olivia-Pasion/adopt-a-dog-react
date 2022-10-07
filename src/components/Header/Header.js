import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { supaSignOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await supaSignOut();
    setUser(null);
  };
  const currentPage = useLocation();

  return (
    <div className="header">
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
        <div className="header">
          <h2>{`Hello, ${user.email}`}</h2>
          <NavLink to="/newdog">Add New Dog</NavLink>
          <NavLink onClick={handleSignOut} to="/auth/sign-in">
            Sign Out
          </NavLink>

          {currentPage.pathname !== '/' &&
            currentPage.pathname !== '/auth/sign-in' &&
            currentPage.pathname !== '/auth/sign-up' && <NavLink to="/">Home</NavLink>}
        </div>
      )}
    </div>
  );
}
