import { useContext } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { supaSignOut } from '../../../services/auth';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await supaSignOut();
    setUser(null);
  };

  const currentPage = useLocation();
  console.log(currentPage);

  const id = useParams();
  console.log(id);

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
          <NavLink to="/newdog">Add New Dog</NavLink>
          <NavLink onClick={handleSignOut} to="/auth/sign-in">
            Sign Out
          </NavLink>

          {/* TODO: Figure out why id path does not yield correct pathname here. */}
          {/* {(currentPage.pathname === '/newdog' || currentPage.pathname === `/updatedog/:${id}`) && (
            <NavLink to="/">Home</NavLink>
          )} */}
        </div>
      )}
    </div>
  );
}

//Change Signout to a nav link?
