import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';


export default class ClientFocus extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        genderFocus:[], ageGroup:[], communities:[]
      },
      count: null,
      
     
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
      
    
    let filters=this.state.filter;
    dat = await get("therapist/?genderFocus="+JSON.stringify(filters.genderFocus)+"&ageGroup="+JSON.stringify(filters.ageGroup)+"&communities="+JSON.stringify(filters.communities));
    let therapists = dat.data.results;
    let count = dat.data.count;
    let filter = this.state.filter;

    this.setState({
        therapists, count, filter
         });
}
    render() {
        return (
            <div>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to={{pathname: "/", filter: this.state.filter }} className="navbar-item">
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
          <Link to={{pathname: "/"}} className="navbar-item">
            <span className="icon is-medium pull-right"><b>Clear</b></span>
          </Link>
        </nav>
        <nav className="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
          <div className="navbar-menu is-active">
            <div className="navbar-start">
              <div className="navbar-item">
               <Link to={{pathname: "/", filter: this.state.filter }} className="navbar-item" >
                    <span className="button is-primary is-medium is-fullwidth">
                    Show {this.state.count} Therapists
                    {console.log(this.state.therapists.count)}
                    </span>
                </Link>
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
              <button id="Female" className="button is-outlined" onClick={()=>this.isCurrent("genderFocus","Female")}>Women</button>
              <button id="Male" className="button is-outlined" onClick={()=>this.isCurrent("genderFocus","Male")}>Men</button>
              <button id="Non-binary" className="button is-outlined" onClick={()=>this.isCurrent("genderFocus","Non-binary")}>Non-binary</button>
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
