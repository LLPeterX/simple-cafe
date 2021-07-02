/* 
AppRouter: Навигация по страницам из pages
*/
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/constants';

const AppRouter = () => {
  //const isAuth = true;
  const { user } = React.useContext(Context);
  console.log(user);
  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => <Route exact key={path} path={path} component={Component} />)
      }
      {
        publicRoutes.map(({ path, Component }) => <Route exact key={path} path={path} component={Component} />)
      }
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
}

export default AppRouter;