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
import { DisciplinaProvider } from './context/DisciplinaContext';
import { Context } from './context/UserContext';
import AdicionarProfessorNaDisciplina from './components/pages/AddProfessorNaDisciplina';
import AlunoDisciplinaForm from './components/forms/MatriculaAlunoForm';

import AlunosList from './components/pages/Users/Profile';

function App() {
  return (
    <Router>
      <UserProvider>
        <Context.Consumer>
          {({ authenticated, userType, updateUserType }) => (
            <>
              <Navbar authenticated={authenticated} userType={userType} />
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
                    <AlunosList  />
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
        </Context.Consumer>
      </UserProvider>
    </Router>
  );
}

export default App;
