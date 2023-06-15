import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Login() {
  return (
    <Container>
      <h1>Login</h1>
      <Form>
        <FormGroup>
          <Label for="username">Usuário</Label>
          <Input type="text" name="username" id="username" placeholder="Digite seu usuário" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Senha</Label>
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
        </FormGroup>
        <Button color="primary">Entrar</Button>
      </Form>
    </Container>
  );
}

export default Login;
