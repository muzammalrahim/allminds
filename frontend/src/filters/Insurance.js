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
    this.isCurrent = this.isCurrent.bind(this);
  }
  
  componentDidMount() {
    for(var item in this.state.filter.specialties){
      console.log(item);
      document.getElementById(this.state.filter.specialties[item]).className= 'button is-light';
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

    let dat = await get(url);
    //let dat = await get("therapist/?insurance="+JSON.stringify(this.state.filter.insurance));
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
