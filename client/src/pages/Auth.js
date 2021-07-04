import React from 'react'
import { Container, Form, Card, Button, Row } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../utils/constants'

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE; // true/false

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-2"
            placeholder="e-mail"
          />
          <Form.Control
            className="mt-3"
            placeholder="пароль"
          />
          <Button variant="success" className="mt-3">{isLogin ? "Войти" : "Зарегистрироваться"}</Button>
          {isLogin ?
            <div className="mt-3 align-self-center">
              Нет аккаунта?
              <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
            </div>
            :
            <div className="mt-3 align-self-center">
              Есть аккаунт?
              <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
            </div>
          }
        </Form>
      </Card>

    </Container>
  );
};

export default Auth;
