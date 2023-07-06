import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import ProfessorRegister from './components/pages/Auth/ProfessorRegister';
import Home from './components/pages/Home';
import Profile from './components/pages/Users/Profile';
import DisciplinaForm from './components/forms/DisciplinaForm';
import DisciplineList from './components/pages/Disciplinas/DisciplineList';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';
import { UserProvider } from './context/UserContext';
import { ProfessorProvider } from './context/ProfessorContext';
import { DisciplinaProvider , DisciplinaContext} from './context/DisciplinaContext';
import { Context } from './context/UserContext';
import AdicionarProfessorNaDisciplina from './components/pages/AddProfessorNaDisciplina';
import AlunoDisciplinaForm from './components/forms/MatriculaAlunoForm';
import DisciplinasDoProfessor from './components/professores/DisciplinasDoProfessor';
import AlunosMatriculados from './components/pages/Disciplinas/AlunosMatriculadosNaDisciplina';

import RegistrarAula from './components/professores/RegistrarAula';

function App() {
  return (
    <Router>
      <UserProvider>
        <Context.Consumer>
          {({ authenticated, userType, updateUserType }) => (
             <DisciplinaProvider>
              {/* Use o contexto da disciplina para acessar o ID da disciplina */}
              <DisciplinaContext.Consumer>
              {({ disciplinaId }) => (
                <>
                  <Navbar authenticated={authenticated} userType={userType} disciplinaId={disciplinaId} />
           
             
              <Message />
              <Container>
                <Switch>
                  <Route path="/cadastro-disciplinas">
                    <DisciplinaForm updateUserType={updateUserType} />
                  </Route>
                  <Route path="/adicionar-professor-na-disciplina">
                    <AdicionarProfessorNaDisciplina updateUserType={updateUserType} />
                  </Route>
                  <Route path="/matricular-alunos">
                    <AlunoDisciplinaForm updateUserType={updateUserType} />
                  </Route>

                  <Route path="/alunos-list">
                    <Profile />
                  </Route>

                  <Route path="/disciplinas-list">
                    <DisciplineList />
                  </Route>
                  <Route path="/home">
                    <Home />
                  </Route>
                  <Route path="/login">
                    <Login updateUserType={updateUserType} />
                  </Route>
                  <Route path="/register">
                    <Register />
                  </Route>
                  <Route path="/user/profile">
                    <Profile />
                  </Route>
                  <Route path="/disciplinas/professor">
                    <DisciplinasDoProfessor />
                  </Route>
                  <Route path="/disciplinas/:disciplinaId" component={AlunosMatriculados} />

              


                  <ProfessorProvider>
                    <Route path="/professor/register">
                      <ProfessorRegister />
                    </Route>

                  </ProfessorProvider>

                </Switch>
              </Container>
              <Footer />
            </>
            )}
            </DisciplinaContext.Consumer>
            </DisciplinaProvider>
          )}
          
        </Context.Consumer>
      </UserProvider>
    </Router>
  );
}

export default App;
