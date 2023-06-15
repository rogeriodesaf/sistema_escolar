import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

import Logo from '../../assets/img/LOGO-PARA-SITE.png'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
    <div className={styles.navbar_logo}>
          <img src={Logo} alt = 'Seminário Teológico Congregacional do Nordeste' />
        
    </div>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
