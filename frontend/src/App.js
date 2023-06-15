import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import  Container  from './components/layout/Container';




function App() {
  return (

    <Router>
       <Navbar /> {/* Incluindo o Navbar */}
       <Container>
      <Switch>
        <Route path="/login" >
        <Login />
        </Route >
        <Route path="/register">
     
          <Register />
         
          </Route >
      </Switch>
      </Container>
      <Footer /> {/* Incluindo o Footer */}

    </Router>

  );
}

export default App;


