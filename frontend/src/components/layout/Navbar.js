import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'



import Logo from '../../assets/img/LOGO-PARA-SITE.png'

/* context */
import { Context } from '../../context/UserContext';


const Navbar = () => {
  const { authenticated, logout, userType } = useContext(Context)

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt='Seminário Teológico Congregacional do Nordeste' />

      </div>
      <ul>

        {authenticated ? (
          <>
            {authenticated && userType === 'aluno' && (
              <li>
                <Link to="/user/profile">Perfil Aluno</Link>
              </li>
            )}


            {authenticated && userType === 'professor' && (
              <>
              <li>
                <Link to="/disciplinas/professor">Suas turmas</Link>
              </li>
               <li>
               <Link to="/disciplinas/alunos">Sua turma</Link>
             </li>
             </>
            )}




            {authenticated && userType === 'coordenador' && (
              <>
                <li>
                  <Link to="/cadastro-disciplinas">Cadastro de Disciplinas</Link>

                </li>
                <li>
                  <Link to="/disciplinas-list">Listagem de disciplinas</Link>
                </li>
                <li>
                  <Link to="/adicionar-professor-na-disciplina">Adicionar Professor à Disciplina</Link>
                </li>
                <li>
                  <Link to="/matricular-alunos">Matricular Alunos</Link>
                </li>
                <li>
                  <Link to="/alunos-list">Listagem de Alunos</Link>
                </li>
              </>
            )}



            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar Aluno</Link>
            </li>
            <li>
              <Link to="/professor/register">Cadastrar Professor/Coordenador</Link>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
};

export default Navbar;
