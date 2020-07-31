import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import MainPage from './components/pages/MainPage';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
  );
}

export default App;
