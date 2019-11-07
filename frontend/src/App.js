import React from 'react';
import './App.css';
import Home from './home';
import Profile from './profile';
import Specialties from './filters/Specialties';
import ClientFocus from './filters/ClientFocus';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/therapist/?page=:page" component={Home}/>
        <Route path="/profile/:id" component={Profile}/>
        <Route path="/specialties" component={Specialties}/>
        <Route path="/clientFocus" component={ClientFocus}/>
      </Switch>
   </Router>
    
  );
}

export default App;
