import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';


export default class Rates extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        min:0, max:0,
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
    for(var item in this.state.filter.specialties){
      console.log(item);
      document.getElementById(this.state.filter.specialties[item]).className= 'button is-light';
    }
    this.getData();
  }

  async isCurrent() {

    let min = document.getElementById("min-value").value;
    let max = document.getElementById("max-value").value;
    this.state.filter.min = min;
    this.state.filter.max = max;
    
    this.getData();
  }
  clear(){
    document.getElementById("min-value").value = null;
    document.getElementById("max-value").value = null; 
    this.isCurrent();
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
    //let dat = await get("therapist/?min="+this.state.filter.min+'&max='+this.state.filter.max);
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
          <Link to={{pathname: "/rates", filter: this.state.filter, search_filter: this.state.search_filter }} onClick = {this.clear} className="navbar-item">
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
                    {console.log(this.state.therapists.count)}
                    </span>
                    </Link>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <h5 className="title is-5 filter-header-add">Price range</h5>
            <p>The average hourly rate is $120
            </p>
            <br />
            <nav className="level">
              <div className="level-left">
                <div className="level-item price-input">
                  <div className="field">
                    <label className="label">Min</label>
                    <p className="control has-icons-left">
                      <input id="min-value" className="input" type="text" value={this.state.filter.min > 0 ? this.state.filter.min : ''} placeholder={10} onChange={()=>this.isCurrent()}/>
                      <span className="icon is-small is-left">
                        <strong>$</strong>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="level-item is-hidden-mobile"><p>-</p></div>
                <div className="level-item price-input">
                  <div className="field">
                    <label className="label">Max</label>
                    <p className="control has-icons-left">
                      <input id="max-value" className="input" type="text" value={this.state.filter.max > 0 ? this.state.filter.max : ''} placeholder={200} onChange={()=>this.isCurrent()}/>
                      <span className="icon is-small is-left">
                        <strong>$</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </nav>
            {/* <div>
                 <button id="Spanish" className="button is-primary" onClick={()=>this.isCurrent()}>Search</button>
            </div> */}
          </div></section>
      </div>
        )
    }
}
