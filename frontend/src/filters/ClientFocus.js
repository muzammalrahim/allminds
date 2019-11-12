import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';


export default class ClientFocus extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        gender:[], ageGroup:[], communities:[]
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
            <h5 className="title is-5 filter-header-add">Client Focus</h5>
            <p>Choose the client type your therapist works with
            </p>
            <br />
            <div className="filter-list">
              <p><strong>Gender</strong></p>
              <button id="Female" className="button is-outlined" onClick={()=>this.isCurrent("gender","Female")}>Women</button>
              <button id="Male" className="button is-outlined" onClick={()=>this.isCurrent("gender","Male")}>Men</button>
              <button id="Non-binary" className="button is-outlined" onClick={()=>this.isCurrent("gender","Non-binary")}>Non-binary</button>
              <br />
              <p><strong>Age group</strong></p>
              <button id="Adults" className="button is-outlined" onClick={()=>this.isCurrent("ageGroup","Adults")}>Adults</button>
              <button id="Elders" className="button is-outlined" onClick={()=>this.isCurrent("ageGroup","Elders")}>Elders</button>
              <button id="Teens" className="button is-outlined" onClick={()=>this.isCurrent("ageGroup","Teens")}>Teens</button>
              <br />
              <p><strong>Communities</strong></p>
              <button id="Ethnic minorites" className="button is-outlined" onClick={()=>this.isCurrent("communities","Ethnic minorites")}>Ethnic minorites</button>
              <button id="LGBQT" className="button is-outlined" onClick={()=>this.isCurrent("communities","LGBQT")}>LGBQT</button>
              <button id="Veterans" className="button is-outlined" onClick={()=>this.isCurrent("communities","Veterans")}>Veterans</button>
              <button id="Cancer survivors" className="button is-outlined" onClick={()=>this.isCurrent("communities","Cancer survivors")}>Cancer survivors</button>
              <button id="Religious / Spiritual" className="button is-outlined" onClick={()=>this.isCurrent("communities","Religious / Spiritual")}>Religious / Spiritual</button>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
