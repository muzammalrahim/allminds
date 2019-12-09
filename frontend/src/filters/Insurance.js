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
      count: null,
      
     
    };
    
    if(this.props.location.filter){
      for(var filtersss in this.props.location.filter){
        this.state.filter[filtersss] = this.props.location.filter[filtersss];
      }
    }
    if(this.props.location.search_filter){
      this.state.search_filter = this.props.location.search_filter;
    }
    this.isCurrent = this.isCurrent.bind(this);
    this.clear = this.clear.bind(this);
  }
  
  componentDidMount() {
    for(var item in this.state.filter.insurance){
      document.getElementById(this.state.filter.insurance[item]).className= 'button is-light';
    }
    this.getData();
  }
  
  async isCurrent(key, event) {
    if(event!=null){
      if(document.getElementById(event).className==='button is-outlined'){
        document.getElementById(event).className= 'button is-light';
        this.state.filter[key].push(event);
      }
      else if(document.getElementById(event).className==='button is-light'){
        document.getElementById(event).className= 'button is-outlined';
        var index = this.state.filter[key].indexOf(event);
        if (index !== -1) this.state.filter[key].splice(index, 1);
      }
    }
    this.getData();
    
  }
  clear(){
    var newClearArray = ['insurance'];
    for(var key in newClearArray){
      key = newClearArray[key];
      for(var index in this.state.filter[key]){
        var currID = this.state.filter[key][index];
        document.getElementById(currID).className = 'button is-outlined';
      }
      this.state.filter[key]=[];
    }

    this.getData();
  }
  async getData(){

    let url = 'therapist/?';
    if('specialties' in this.state.filter && this.state.filter.specialties.length>0){
      url += 'specialties='+JSON.stringify(this.state.filter.specialties)+'&';
    }
    if('availability' in this.state.filter && this.state.filter.availability.length>0){
      url += 'availability='+JSON.stringify(this.state.filter.availability)+'&';
    }
    if('insurance' in this.state.filter && this.state.filter.insurance.length>0){
      url += 'insurance='+JSON.stringify(this.state.filter.insurance)+'&';
    }
    if('genderFocus' in this.state.filter && this.state.filter.genderFocus.length>0){
      url += 'genderFocus='+JSON.stringify(this.state.filter.genderFocus)+'&';
    }
    if('ageGroup' in this.state.filter && this.state.filter.ageGroup.length>0){
      url += 'ageGroup='+JSON.stringify(this.state.filter.ageGroup)+'&';
    }
    if('communities' in this.state.filter && this.state.filter.communities.length>0){
      url += 'communities='+JSON.stringify(this.state.filter.communities)+'&';
    }
    if('gender' in this.state.filter && this.state.filter.gender.length>0){
      url += 'gender='+JSON.stringify(this.state.filter.gender)+'&';
    }
    if('title' in this.state.filter && this.state.filter.title.length>0){
      url += 'title='+JSON.stringify(this.state.filter.title)+'&';
    }
    if('yearsInPractice' in this.state.filter && this.state.filter.yearsInPractice.length>0){
      url += 'yearsInPractice='+JSON.stringify(this.state.filter.yearsInPractice)+'&';
    }
    if('languages' in this.state.filter && this.state.filter.languages.length>0){
      url += 'languages='+JSON.stringify(this.state.filter.languages)+'&';
    }
    if('min' in this.state.filter && this.state.filter.min.length>0){
      url += 'min='+this.state.filter.min+'&';
    }
    if('max' in this.state.filter && this.state.filter.max.length>0){
      url += 'max='+this.state.filter.max+'&';
    }
    if(this.state.search_filter && this.state.search_filter != null){
      url += 'search='+this.state.search_filter;
    }

    let dat = await get(url);
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
            <Link to={{pathname: "/", filter: this.state.filter, search_filter: this.state.search_filter }} className="navbar-item">
              <span className="icon is-medium"><i className="fas fa-times fa-2x" /></span>
            </Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-start">
            </div>
          </div>
          <Link to={{pathname: "/insurance", filter: this.state.filter, search_filter: this.state.search_filter }} onClick = {this.clear} className="navbar-item">
            <span className="icon is-medium pull-right"><b>Clear</b></span>
          </Link>
        </nav>
        <nav className="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
          <div className="navbar-menu is-active">
            <div className="navbar-start">
              <div className="navbar-item">
              
                <Link to={{pathname: "/", filter: this.state.filter, search_filter: this.state.search_filter }} className="navbar-item" >
                    <span className="button is-primary is-medium is-fullwidth">
                    Show {this.state.count} Therapists
                    </span>
                    </Link>
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
              <button id="Out-of-network" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Out-of-network")}>Any insurance (out of network) </button>
              {/* <button id="Any insurance" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Any insurance")}>Any insurance</button> */}
              <button id="ACI Specialty Benefits" className="button is-outlined" onClick={()=>this.isCurrent("insurance","ACI Specialty Benefits")}>ACI Specialty Benefits</button>
              <button id="APS Healthcare" className="button is-outlined" onClick={()=>this.isCurrent("insurance","APS Healthcare")}>APS Healthcare</button>
              <button id="Aetna" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Aetna")}>Aetna</button>
              <button id="Alliance" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Alliance")}>Alliance</button>
              <button id="AmeriHealth" className="button is-outlined" onClick={()=>this.isCurrent("insurance","AmeriHealth")}>AmeriHealth</button>
              <button id="American Behavioral" className="button is-outlined" onClick={()=>this.isCurrent("insurance","American Behavioral")}>American Behavioral</button>
              <button id="Anthem" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Anthem")}>Anthem</button>
              <button id="Beacon" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Beacon")}>Beacon</button>
              <button id="Beech Street" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Beech Street")}>Beech Street</button>
              <button id="Behavioral Health Systems" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Behavioral Health Systems")}>Behavioral Health Systems</button>
              <button id="Blue Care Network" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Blue Care Network")}>Blue Care Network</button>
              <button id="Blue Cross" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Blue Cross")}>Blue Cross</button>
              <button id="Blue Shield" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Blue Shield")}>Blue Shield</button>
              <button id="BlueCross and BlueShield" className="button is-outlined" onClick={()=>this.isCurrent("insurance","BlueCross and BlueShield")}>BlueCross and BlueShield</button>
              <button id="Ceridian" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Ceridian")}>Ceridian</button>
              <button id="ChoiceCare" className="button is-outlined" onClick={()=>this.isCurrent("insurance","ChoiceCare")}>ChoiceCare</button>
              <button id="Cigna" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Cigna")}>Cigna</button>
              <button id="Great-West Life" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Great-West Life")}>Great-West Life</button>
              <button id="Hawaii Medical Services Association" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Hawaii Medical Services Association")}>Hawaii Medical Services Association</button>
              <button id="Health Net" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Health Net")}>Health Net</button>
              <button id="Humana" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Humana")}>Humana</button>
              <button id="Medicaid" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Medicaid")}>Medicaid</button>
              <button id="Medicare" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Medicare")}>Medicare</button>
              <button id="Military OneSource" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Military OneSource")}>Military OneSource</button>
              <button id="Molina" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Molina")}>Molina</button>
              <button id="MultiPlan" className="button is-outlined" onClick={()=>this.isCurrent("insurance","MultiPlan")}>MultiPlan</button>
              <button id="Network Health" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Network Health")}>Network Health</button>
              <button id="New Directions" className="button is-outlined" onClick={()=>this.isCurrent("insurance","New Directions")}>New Directions</button>
              <button id="Optum" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Optum")}>Optum</button>
              <button id="PHCS" className="button is-outlined" onClick={()=>this.isCurrent("insurance","PHCS")}>PHCS</button>
              <button id="PreferredOne" className="button is-outlined" onClick={()=>this.isCurrent("insurance","PreferredOne")}>PreferredOne</button>
              <button id="Premera" className="button is-outlined" onClick={()=>this.isCurrent("insurance","Premera")}>Premera</button>
              <button id="TRICARE" className="button is-outlined" onClick={()=>this.isCurrent("insurance","TRICARE")}>TRICARE</button>
              <button id="TriWest" className="button is-outlined" onClick={()=>this.isCurrent("insurance","TriWest")}>TriWest</button>
              <button id="UMR" className="button is-outlined" onClick={()=>this.isCurrent("insurance","UMR")}>UMR</button>
              <button id="UnitedHealthcare" className="button is-outlined" onClick={()=>this.isCurrent("insurance","UnitedHealthcare")}>UnitedHealthcare</button>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
