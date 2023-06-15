import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className='bold'>Este é o footer da aplicação.</span> &copy; 2023

        </p>
    </footer>
  );
};

export default Footer;
