import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Header from "./components/Header/Header";
import MainNav from "./components/MainNav/MainNav";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="app">
          <Container>
            <Switch>
              <Route path="/" exact component={Trending} />
              <Route path="/movies" exact component={Movies} />
              <Route path="/tv-series" exact component={Series} />
              <Route path="/search" exact component={Search} />
            </Switch>
          </Container>
        </div>
        <MainNav />
      </Router>
    </>
  );
}

export default App;
