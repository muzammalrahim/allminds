import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';

export default class Availability extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        availability:[],
      },
      
     
    };
    
    this.isCurrent = this.isCurrent.bind(this);
  }
  
  async isCurrent(key, event) {

    let dat=null;
    if(event!=null){
      if(document.getElementById(event).className === 'button is-outlined'){
        document.getElementById(event).className = 'button is-light';
        this.state.filter[key].push(event);}
      else if(document.getElementById(event).className === 'button is-light'){
              document.getElementById(event).className = 'button is-outlined';
              var index = this.state.filter[key].indexOf(event);
              if (index !== -1) this.state.filter[key].splice(index, 1);
              }
      }
      
    
    let filters=JSON.stringify(this.state.filter);
    dat = await get("therapist/?gender="+filters);
    let therapists = dat.data.results;
    
      this.setState({
        therapists, 
         });
}
    render() {
        return (
            <div>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <span className="icon is-medium"><i className="fas fa-times fa-2x" /></span>
              {/* <a class="delete is-large"></a> */}
            </Link>
            {/* <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-start">
            </div>
          </div>
        </nav>
        <nav className="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
          <div className="navbar-menu is-active">
            <div className="navbar-start">
              <div className="navbar-item">
                <a className="button is-primary is-medium is-fullwidth" href="index.html">
                  Show 23 Therapists
                </a>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <h5 className="title is-5 filter-header-add">Availability</h5>
            <p>Choose if you need appointments outside traditional business hours
            </p>
            <br />
            <div className="filter-list">
            <button id="Evenings" className="button is-outlined" onClick={()=>this.isCurrent("availability","Evenings")}>Evenings</button>
              <button id="Weekends" className="button is-outlined" onClick={()=>this.isCurrent("availability","Weekends")}>Weekends</button>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
