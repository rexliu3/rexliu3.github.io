import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MainPage from './components/pages/MainPage';
import NotFoundPage from './components/pages/NotFoundPage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Langar&display=swap" rel="stylesheet"/>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
