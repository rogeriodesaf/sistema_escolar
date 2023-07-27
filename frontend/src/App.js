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

import HomeCoordenador from './components/coordenadores/PaginaCoordenador'
import VisualizarAlunos from './components/coordenadores/VisualizarAluno';


import { ProfessorProvider } from './context/ProfessorContext';
import { DisciplinaProvider, DisciplinaContext } from './context/DisciplinaContext';
import { Context } from './context/UserContext';
import AdicionarProfessorNaDisciplina from './components/pages/AddProfessorNaDisciplina';
import HomeProfessor from './components/professores/PaginaProfessores'


import AlunoDisciplinaForm from './components/forms/MatriculaAlunoForm';
import DisciplinasDoProfessor from './components/professores/DisciplinasDoProfessor';
import AlunosMatriculados from './components/pages/Disciplinas/AlunosMatriculadosNaDisciplina';

import RegistrarAula from './components/professores/RegistrarAula';
import PresencasFaltas from '../src/components/alunos/PresencasFaltas'

import LancarNotas from './components/professores/LancarNotas'

import MediaAlunos from '../src/components/professores/MediaAlunos'
import DetalhesAluno from '../src/components/alunos/DetalhesAluno'
import EditarNota from './components/professores/EditarNota';

import Alunos from './components/alunos/Alunos';
import DetalhesDisciplinaAluno from './components/alunos/DetalhesDisciplinaAluno'
import PaginaAluno from './components/alunos/PaginaAluno';
import HomeAluno from './components/alunos/PaginaAluno'
import HistoricoAluno from './components/alunos/HistoricoAluno';
import DirecionamentoHistorico from './components/alunos/DirecionamentoAoHistorico';

function App() {
  return (
    <Router>

      <UserProvider>
        <Context.Consumer>
          {({ authenticated, userType, updateUserType }) => (
            <DisciplinaProvider>
              {/* Use o contexto da disciplina para acessar o ID da disciplina */}
              <DisciplinaContext.Consumer>
                {({ disciplinaId ,alunoId}) => (
                  <>

                    <Navbar authenticated={authenticated} userType={userType} disciplinaId={disciplinaId} alunoId={alunoId}/>

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

                        <Route path="/aluno">
                          <PaginaAluno alunoId={alunoId}/>
                        </Route>
                       

                       
                        <Route path="/alunos/historico"  component={DirecionamentoHistorico} />
                        <Route path="/alunos/disciplinas" component={Alunos} /> {/* Rota para a página de disciplinas matriculadas dos alunos */}
                        <Route exact path="/disciplinas/:disciplinaId/alunos/:alunoId/detalhes" component={DetalhesDisciplinaAluno} />
                        <Route path="/aluno/historico">
                          <HistoricoAluno alunoId = {alunoId}/>
                        </Route>
                        <Route path="/aluno/historico/direcionamento">
                          <DirecionamentoHistorico alunoId = {alunoId}/>
                        </Route>
                        <Route path="/historico-escolar"  component={VisualizarAlunos} /> 
                        <Route path="/historico/:alunoId" alunoId = {alunoId} component={HistoricoAluno} /> {/* Rota para o histórico do aluno */}

                        <Route path="/disciplinas-list">
                          <DisciplineList />
                        </Route>
                        <Route path="/home">
                          <Home />
                          </Route>
                          <Route path="/home-aluno">
                          <HomeAluno />
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

                        <Route path="/home-coordenador">
                          <HomeCoordenador />
                        </Route>
                       {/* <Route path="/professor/profile">
                          <HomeProfessor />  */}

                          <Route path="/home-professor">
                          <HomeProfessor />
                        </Route>
                       
                        <Route path="/disciplinas/professor">
                          <DisciplinasDoProfessor />
                        </Route>
                        <Route path="/disciplinas/:disciplinaId" component={AlunosMatriculados} />


                        <Route path="/lancar-nota" component={LancarNotas} />
                        <Route path="/mostrar-media" component={MediaAlunos} />
                        <Route exact path="/disciplina/:disciplinaId/alunos/:alunoId/detalhes" component={DetalhesAluno} />
                        <Route path="/disciplina/:disciplinaId/aluno/:alunoId/editar-nota/:notaId" component={EditarNota} />

                        <ProfessorProvider>
                          <Route path="/professor/register">
                            <ProfessorRegister />
                          </Route>
                          <Route path="/disciplinas/:disciplinaId" component={PresencasFaltas} />

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
