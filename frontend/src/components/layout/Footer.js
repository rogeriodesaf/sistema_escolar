import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className='bold'>Desenvolvido por Rogério de Sá - Analista de Sistemas e Engenharia de Softwares.</span> &copy; 2023

        </p>
    </footer>
  );
};

export default Footer;
