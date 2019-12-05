import React from 'react';
import './App.css';
import Home from './home';
import Profile from './profile';
import Specialties from './filters/Specialties';
import ClientFocus from './filters/ClientFocus';
import Background from './filters/Background';
import Insurance from './filters/Insurance';
import Availability from './filters/Availability';
import Rates from './filters/Rates';
import ContactForm from './ContactForm';
import FeedBack from './FeedBackForm';
import EmailConfirm from './EmailConfirm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import history from './history';

function App() {
  return (
    <Router history={history}> 
    {console.log(history,'appjs')}
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/therapist/?page=:page" component={Home}/>
        <Route path="/profile/:id" component={Profile}/>
        <Route path="/specialties" component={Specialties}/>
        <Route path="/clientFocus" component={ClientFocus}/>
        <Route path="/background" component={Background}/>
        <Route path="/insurance" component={Insurance}/>
       <Route path="/availability" component={Availability}/>
       <Route path="/rates" component={Rates}/>
       <Route path="/emailConfirmation/:id" component={EmailConfirm}/>
       <Route path="/contactForm/:id" component={ContactForm}/>
       <Route path="/feedback" component={FeedBack}/>
       </Switch>
   </Router>
    
  );
}

export default App;
