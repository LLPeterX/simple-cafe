import React from "react"
import { Navbar, Nav, Button, NavLink } from 'react-bootstrap'
import { Context } from ".."
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/constants"
import { observer } from 'mobx-react-lite'
import { useHistory } from "react-router-dom"
import s from './navbar.module.css'

// чтобы MobX следил за изменением стейта user, оборачиваем JSX в observer()
const NavBar = observer(() => {
  const { user } = React.useContext(Context);
  const history = useHistory();

  const logOut = () => {
    user.setUser({});
    user.setAuth(false);
    history.push(LOGIN_ROUTE);
    console.log('LOGOUT');
  }

  return (
    <Navbar bg="light" expand="sm">
      <NavLink to={SHOP_ROUTE} className="container-fluid">Кафе Даур</NavLink>
      {
        user.isAuth ?
          <Nav className="ml-auto">
            <Button className={s.btn} onClick={() => {
              history.push(ADMIN_ROUTE);
            }}>Администрирование</Button>
            <Button className={s.btn} onClick={logOut}>Выход</Button>
          </Nav>
          :
          <Nav className="ml-auto">
            {/* <Button className={s.btn} onClick={() => user.setAuth(true)}>Вход</Button> */}
            <Button className={s.btn} onClick={() => history.push(LOGIN_ROUTE)}>Вход</Button>
          </Nav>
      }
    </Navbar >
  );
});

export default NavBar;