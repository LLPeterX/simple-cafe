import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { checkAuth } from "./http/userAPI";
import { Context } from './index'

const App = observer(() => {
  const user = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => checkAuth().then(data => {
    user.setUser(true);
    user.setAuth(true);
  }).finally(() => {
    setLoading(false);
  }),
    []);

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
