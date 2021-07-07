import React, { useState } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { registration, login } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'


const Auth = observer(() => {
  const { user } = React.useContext(Context);
  // Определяем по URL, где мы находимся.
  // Если "/login", то это вход, иначе - регистрация
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE; // true/false
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      //      let data;
      if (isLogin) {
        await login(email, password);
      } else {
        await registration(email, password);
      }
      user.setUser(user);
      user.setAuth(true);
      history.push(SHOP_ROUTE);
    } catch (e) {
      console.log('error:', e);
      //alert(e.response.data.message);
    }


  }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="success" className="mt-3" onClick={handleLogin}>{isLogin ? "Войти" : "Зарегистрироваться"}</Button>
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
});

export default Auth;
