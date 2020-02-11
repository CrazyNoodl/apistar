import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './Components/Home/Home';
import Film from './Components/Film/Film';
import Planet from './Components/Planet/Planet';
import Starship from './Components/Starship/Starship';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className='container'>
        <Link className="nav" to="/">Home</Link>

        <hr />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/films/:id" component={Film} />
          <Route path="/planets/:id" component={Planet} />
          <Route path="/starships/:id" component={Starship} />
        </Switch>
      </div>
    </Router>
  );
}

