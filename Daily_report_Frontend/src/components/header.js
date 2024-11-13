import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../utils/news2.jpeg";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";


function Header({profile}) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  console.log(profile)
 
  return (
    <div className='nav__container'>
      <Link to="/article" className='nav__logo'>
        <img src={logo} alt='nav_logo' />
      </Link>
      
      <div className={`nav__menu ${menuOpen ? 'active' : ''}`}>
        <div><Link to={`/profile`}>{profile.userName}</Link></div>
        <div><Link to="/create">Create Post</Link></div>
        <div><Link to="/authors">Authors</Link></div>
        <div><Link to="/login">Logout</Link></div>
      </div>

      <button className='nav__toggle-btn' onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
    </div>
  );
}

export default Header;
