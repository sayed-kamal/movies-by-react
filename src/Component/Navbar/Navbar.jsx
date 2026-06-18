import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HandelNavpar } from '../../Context/HandelNavpar';
import { FavoritesContext } from '../../Context/FavoritesContext';

export default function Navbar() {
  let { handelNavpar, setHandelNavpar } = useContext(HandelNavpar);
  let { clearFavorites } = useContext(FavoritesContext);
  let navigate = useNavigate();

  function logOut() {
    clearFavorites();
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail'); // ✅ امسح الـ email وقت logout
    setHandelNavpar(false);
    navigate('/login');
  }

  return (
    <div className="d-flex justify-content-between bg-secondary-subtle p-2">
      {handelNavpar ? (
        <>
          <ul className="d-flex list-unstyled gap-3 m-0">
            <li><Link to={'home'}>Home</Link></li>
            <li><Link to={'favorites'}>Favorites</Link></li>
          </ul>
          <ul className="list-unstyled m-0">
            <li><Link onClick={logOut}>LogOut</Link></li>
          </ul>
        </>
      ) : (
        <ul className="d-flex list-unstyled gap-3 m-0">
          <li><Link to={'login'}>Login</Link></li>
          <li><Link to={'register'}>Register</Link></li>
        </ul>
      )}
    </div>
  );
}