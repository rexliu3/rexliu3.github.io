import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import { SanityContentProvider } from "./sanity/ContentContext";

const App = () => (
  <SanityContentProvider>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </SanityContentProvider>
);

export default App;
