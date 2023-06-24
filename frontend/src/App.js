import React, { useContext } from 'react';
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
import Message  from './components/layout/Message';

/**CONTEXT */
import { UserProvider } from './context/UserContext';
import { ProfessorProvider } from './context/ProfessorContext';
import { DisciplinaProvider } from './context/DisciplinaContext';
import { Context } from './context/UserContext';
import { DisciplinaContext } from './context/DisciplinaContext';



function App() {
  
  return (

    <Router>
      <UserProvider>
      <Context.Consumer>
          {({ updateUserType }) => (
            <>
     <Navbar userType="coordenador" /> {/* Incluindo o Navbar */}
        <Message/>
        <Container>
        <Route path="/cadastro-disciplinas">
          <DisciplinaForm updateUserType={updateUserType} />
        </Route>
        <Route path="/disciplinas-list">
        <DisciplineList />
        </Route>

          <Switch>
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
        <Footer /> {/* Incluindo o Footer */}
        </>
        )}
        </Context.Consumer>
      </UserProvider>
    </Router>
  );
}

export default App;
