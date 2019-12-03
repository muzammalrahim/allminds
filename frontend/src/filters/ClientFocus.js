import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';


export default class ClientFocus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      therapists: [],
      filter: {
        genderFocus:[], ageGroup:[], communities:[]
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
    
    for(var item in this.state.filter.genderFocus){
      document.getElementById(this.state.filter.genderFocus[item]).className= 'button is-light';
    }
    for(var item in this.state.filter.ageGroup){
      document.getElementById(this.state.filter.ageGroup[item]).className= 'button is-light';
    }
    for(var item in this.state.filter.communities){
      document.getElementById(this.state.filter.communities[item]).className= 'button is-light';
    }
    this.getData();
  }
  
  async isCurrent(key, event) {
    if(event!=null){
      if(document.getElementById(event).className === 'button is-outlined'){
        document.getElementById(event).className = 'button is-light';
        this.state.filter[key].push(event);
      }
      else if(document.getElementById(event).className === 'button is-light'){
              document.getElementById(event).className = 'button is-outlined';
              var index = this.state.filter[key].indexOf(event);
              if (index !== -1) this.state.filter[key].splice(index, 1);
      }
      
    }
    localStorage.setItem('filter', JSON.stringify(this.state.filter));
    this.getData();
  }
  clear(){
    var newClearArray = ['genderFocus','ageGroup','communities'];
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
    let filters=this.state.filter;
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
          <Link to={{pathname: "/clientFocus", filter: this.state.filter, search_filter: this.state.search_filter }} onClick = {this.clear} className="navbar-item">
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
              <button id="LGBTQ" className="button is-outlined" onClick={()=>this.isCurrent("communities","LGBTQ")}>LGBTQ</button>
              <button id="Veterans" className="button is-outlined" onClick={()=>this.isCurrent("communities","Veterans")}>Veterans</button>
              <button id="Cancer survivors" className="button is-outlined" onClick={()=>this.isCurrent("communities","Cancer survivors")}>Cancer Survivors</button>
              <button id="Religious / Spiritual" className="button is-outlined" onClick={()=>this.isCurrent("communities","Religious / Spiritual")}>Religious & Spiritual</button>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
