import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';

export default class Specialties extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        specialties:[],
      },
      count: null,
      
     
    };
    
    this.isCurrent = this.isCurrent.bind(this);
  }
  
  async isCurrent(key, event) {

    let dat=null;
    if(event!=null){
      if(document.getElementById(event).className==='button is-outlined'){
        document.getElementById(event).className= 'button is-light';
        this.state.filter[key].push(event);}
      else if(document.getElementById(event).className==='button is-light'){
              document.getElementById(event).className= 'button is-outlined';
              var index = this.state.filter[key].indexOf(event);
              if (index !== -1) this.state.filter[key].splice(index, 1);
              }
      }
      
    
    
    dat = await get("therapist/?specialties="+JSON.stringify(this.state.filter.specialties));
    let therapists = dat.data.results;
    let count = dat.data.count;
    let filter = this.state.filter;
    // let count = dat.data.count;
      this.setState({
        therapists, count, filter
         });
}
    render() {
        return (
            <div>
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <Link to={{pathname: "/", filter: this.state.filter }} className="navbar-item" >
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
                <h5 className="title is-5 filter-header-add">Specialties</h5>
                <p>Choose your therapist's specialties
                </p>
                <br />
                <div className="filter-list">
                  <button id="Addiction" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Addiction")}>Addiction</button>
                  <button id="ADHD or attention issues" className="button is-outlined" onClick={()=>this.isCurrent("specialties","ADHD or attention issues")}>ADHD or attention issues</button>
                  <button id="Anxiety or panic attacks" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Anxiety or panic attacks")}>Anxiety or panic attacks</button>
                  <button id="Depression" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Depression")}>Depression</button>
                  <button id="Eating and food issues" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Eating and food issues")}>Eating and food issues</button>
                  <button id="Grief" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Grief")}>Grief</button>
                  <button id="Relationship issues" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Relationship issues")}>Relationship issues</button>
                  <button id="Life transitions" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Life transitions")}>Life transitions</button>
                  <button id="Sex and sexuality" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Sex and sexuality")}>Sex and sexuality</button>
                  <button id="Trauma or abuse" className="button is-outlined" onClick={()=>this.isCurrent("specialties","Trauma or abuse")}>Trauma or abuse</button>
                </div>
              </div>
            </section>
          </div>
        )
    }
}
