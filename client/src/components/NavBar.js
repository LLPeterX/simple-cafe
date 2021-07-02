import React from "react"
import { Navbar, Nav, Button, NavLink } from 'react-bootstrap'
import { Context } from ".."
import { SHOP_ROUTE } from "../utils/constants"
import { observer } from 'mobx-react-lite'
import s from './navbar.module.css'

// чтобы MobX следил за изменением стейта user, оборачиваем JSX в observer()
const NavBar = observer(() => {
  const { user } = React.useContext(Context);
  return (
    // <Navbar bg="light" expand="lg" > // нужно "схлопывание" сделать поменьше
    <Navbar bg="light" expand="sm">
      <NavLink to={SHOP_ROUTE} className="container-fluid">Кафе Даур</NavLink>
      {
        user.isAuth ?
          <Nav className="ml-auto">
            <Button className={s.btn} onClick={() => console.log('CALL ADMIN PANEL')}>Администрирование</Button>
            <Button className={s.btn} onClick={() => user.setIsAuth(false)}>Выход</Button>
          </Nav>
          :
          <Nav className="ml-auto">
            <Button className={s.btn} onClick={() => user.setIsAuth(true)}>Вход</Button>
          </Nav>
      }
    </Navbar >
  );
});

export default NavBar;