import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';

export default class Insurance extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        insurance:[],
      },
      
     
    };
    
    this.isCurrent = this.isCurrent.bind(this);
  }
  
  async isCurrent(key, event) {

    let dat=null;
    if(event!=null){
      if(document.getElementById(event).className=='button is-outlined'){
        document.getElementById(event).className= 'button is-light';
        this.state.filter[key].push(event);}
      else if(document.getElementById(event).className=='button is-light'){
              document.getElementById(event).className= 'button is-outlined';
              var index = this.state.filter[key].indexOf(event);
              if (index !== -1) this.state.filter[key].splice(index, 1);
              }
      }
      
    
    console.log(this.state.filter);
    let filters=JSON.stringify(this.state.filter);
    console.log(filters);
    dat = await get("therapist/?gender="+filters);
    let therapists = dat.data.results;
    // let count = dat.data.count;
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
            <h5 className="title is-5 filter-header-add">Insurance</h5>
            <p>Choose your insurance options
            </p>
            <br />
            <div className="filter-list">
           <button id="Out-of-network" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Out-of-network")}>Out-of-network</button>
              <button id="Any insurance" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Any insurance")}>Any insurance</button>
              <button id="Aetna" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Aetna")}>Aetna</button>
              <button id="Alliance" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Alliance")}>Alliance</button>
              <button id="Anthem" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Anthem")}>Anthem</button>
              <button id="Beacon" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Beacon")}>Beacon</button>
              <button id="Behavioral Health Systems" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Behavioral Health Systems")}>Behavioral Health Systems</button>
              <button id="Blue Cross" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Blue Cross")}>Blue Cross</button>
              <button id="Blue Shield" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Blue Shield")}>Blue Shield</button>
              <button id="Cigna" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Cigna")}>Cigna</button>
              <button id="HMC Healthworks" className="button is-outlined" onClick={()=>this.isCurrent("insurance","HMC Healthworks")}>HMC Healthworks</button>
              <button id="Health Net" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Health Net")}>Health Net</button>
              <button id="Humana" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Humana")}>Humana</button>
              <button id="Kaiser" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Kaiser")}>Kaiser</button>
              <button id="MHN" className="button is-outlined" onClick={()=>this.isCurrent("insurance","MHN")}>MHN</button>
              <button id="MHNet Behavioral Health" className="button is-outlined" onClick={()=>this.isCurrent("insurance","MHNet Behavioral Health")}>MHNet Behavioral Health</button>
              <button id="Magellan" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Magellan")}>Magellan</button>
              <button id="Network Health" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Network Health")}>Network Health</button>
              <button id="Optum" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Optum")}>Optum</button>
              <button id="United Healthcare" className="button is-outlined" onClick={()=>this.isCurrent("insurance","United Healthcare")}>United Healthcare</button>
              <button id="WellCare" className="button is-outlined" onClick={()=>this.isCurrent("insurance","WellCare")}>WellCare</button>
            </div>
          </div>
        </section>
      </div>
        )
    }
}