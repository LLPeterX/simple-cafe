import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { checkAuth } from "./http/userAPI";
import { Context } from './index'

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  //console.log('API URL=', process.env.REACT_APP_API_URL, 'user=', user);
  useEffect(() => checkAuth().then(data => {
    try {
      user.setUser(data);
      user.setAuth(true);
    } catch (e) {
      console.log('App useEffect() error:', e);
    }
  }).finally(() => {
    setLoading(false); // eslint-disable-next-line
  }), []);

  if (loading) {
    return <Spinner animation="grow" />
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
