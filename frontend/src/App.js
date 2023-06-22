import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './components/pages/Auth/Login';

import Register from './components/pages/Auth/Register';
import ProfessorRegister from './components/pages/Auth/ProfessorRegister';
import Home from './components/pages/Home';
import Profile from './components/pages/Users/Profile';



import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message  from './components/layout/Message';

/**CONTEXT */
import { UserProvider } from './context/UserContext';
import { ProfessorProvider } from './context/ProfessorContext';



function App() {
      
  return (

    <Router>
      <UserProvider>
        <Navbar /> {/* Incluindo o Navbar */}
        <Message/>
        <Container>
      
          <Switch>
          <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
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
      </UserProvider>
    </Router>
  );
}

export default App;
