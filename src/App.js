import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Home from './Components/Home/Home';
import Film from './Components/Film/Film';
import Planet from './Components/Planet/Planet';
import Starship from './Components/Starship/Starship';
import NotFound from './Components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <NavLink className="nav" to="/">Home</NavLink>

          <hr />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/films/:id" component={Film} />
            <Route path="/planets/:id" component={Planet} />
            <Route path="/starships/:id" component={Starship} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;