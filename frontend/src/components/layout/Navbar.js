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
            { userType === 'aluno' && (
               <>
              <li>
                <Link to="/home-aluno">Home</Link>
              </li>

              <li>
              <Link to="/alunos/disciplinas">Suas turmas</Link>
            </li>

            <li>
              <Link to="/alunos/historico">Histórico Escolar</Link>
            </li>
            </>
            )}


            { userType === 'professor' && (
              <>
              <li>
                <Link to="/disciplinas/professor">Suas turmas</Link>
              </li>
               
              <li>
                <Link to="/home-professor">Home</Link>
              </li>
             </>
            )}
            



            {authenticated && userType === 'coordenador' && (
              <>
              <li>
                  <Link to="/home-coordenador">Home</Link>

                </li>
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
                <li>
                <Link to="/historico-escolar">Histórico Escolar</Link>
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
