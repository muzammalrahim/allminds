import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';


export default class Background extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter: {
        gender:[], title:[], yearsInPractice:[], languages:[],
      },
      count: null,
      gender:['Male', 'Female', 'Non-Binary'], 
      title:['Licensed therapist', 'Associate therapist', 'Psychologist'], 
      yearsInPractice:['<5', '5-15', '15>']
     
    };
    if(this.props.location.filter){
      for(var filtersss in this.props.location.filter){
        this.state.filter[filtersss] = this.props.location.filter[filtersss];
      }
      //this.state.filter = this.props.location.filter;
    }
    if(this.props.location.search_filter){
      this.state.search_filter = this.props.location.search_filter;
    }
    
    this.isCurrent = this.isCurrent.bind(this);
    this.clear = this.clear.bind(this);
  }
  
  componentDidMount() {
    
    for(var item in this.state.filter.gender){
      document.getElementById(this.state.filter.gender[item]).className= 'button is-light';
    }
    for(var item in this.state.filter.title){
      document.getElementById(this.state.filter.title[item]).className= 'button is-light';
    }
    for(var item in this.state.filter.yearsInPractice){
      document.getElementById(this.state.filter.yearsInPractice[item]).className= 'button is-light';
    }
    for(var item in this.state.filter.languages){
      document.getElementById(this.state.filter.languages[item]).className= 'button is-light';
    }
    this.getData();
  }

  async isCurrent(key, event) {
    if(event!=null){
      if(document.getElementById(event).className === 'button is-outlined'){
        if(this.state[key]){
          for(var fTitle in this.state[key]){
            var currID = this.state[key][fTitle];
            document.getElementById(currID).className = 'button is-outlined';
          }
        }
        document.getElementById(event).className = 'button is-light';
        if(key=='languages'){
          this.state.filter[key].push(event);
        }
        else{this.state.filter[key][0]=event;}
      }
      else if(document.getElementById(event).className === 'button is-light'){
              document.getElementById(event).className= 'button is-outlined';
              var index = this.state.filter[key].indexOf(event);
              if (index !== -1){ this.state.filter[key].splice(index, 1); }
      }
    }
      this.getData();

}
clear(){
  var newClearArray = ['gender','title','yearsInPractice','languages'];
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
async getData() {    

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
  //let dat = await get("therapist/?gender="+JSON.stringify(filters.gender)+"&title="+JSON.stringify(filters.title)+"&yearsInPractice="+JSON.stringify(filters.yearsInPractice)+"&languages="+JSON.stringify(filters.languages));
  let count = dat.data.count;
  let filter = this.state.filter;

  let therapists = dat.data.results;
  this.setState({
    therapists, count, filter
  });
}

    render() {
        return (
            <div>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to={{pathname: "/", filter: this.state.filter, search_filter: this.state.search_filter  }} className="navbar-item">
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
          <Link to={{pathname: "/background", filter: this.state.filter, search_filter: this.state.search_filter }} onClick = {this.clear} className="navbar-item">
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
            <h5 className="title is-5 filter-header-add" >Therapist Background</h5>
            <p>Choose the desired background of your therapist
            </p>
            <br />
            <div className="filter-list">
              <p><strong>Gender</strong></p>
              <button id="Female" className="button is-outlined" onClick={()=>this.isCurrent("gender","Female")}>Women</button>
              <button id="Male" className="button is-outlined" onClick={()=>this.isCurrent("gender","Male")}>Men</button>
              <button id="Non-Binary" className="button is-outlined" onClick={()=>this.isCurrent("gender","Non-Binary")}>Non-binary</button>
              <br />
              <p><strong>Title</strong></p>
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <button id="Licensed therapist" className="button is-outlined" onClick={()=>this.isCurrent("title","Licensed therapist")}>Licensed therapist</button>
                  </div>
                  <div className="level-item">
                    <div className="dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <a aria-haspopup="true" aria-controls="dropdown-licensed-therapist">
                          <span className="icon"><i className="fas fa-info-circle" aria-hidden="true" /></span>
                        </a>
                      </div>
                      <div className="dropdown-menu" id="dropdown-licensed-therapist" role="menu">
                        <div className="dropdown-content">
                          <div className="dropdown-item">
                            <p>Licensed therapists commonly hold a master's degree and have completed <strong>two years of supervised practice</strong> to obtain a clinical license.</p>
                            <p>They may use a variety of therapeutic techniques, including psychodynamic therapy or cognitive-behavioral therapy.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                  <button id="Associate therapist" className="button is-outlined" onClick={()=>this.isCurrent("title","Associate therapist")}>Associate therapist</button>
                  </div>
                  <div className="level-item">
                    <div className="dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <a aria-haspopup="true" aria-controls="dropdown-licensed-therapist">
                          <span className="icon"><i className="fas fa-info-circle" aria-hidden="true" /></span>
                        </a>
                      </div>
                      <div className="dropdown-menu" id="dropdown-licensed-therapist" role="menu">
                        <div className="dropdown-content">
                          <div className="dropdown-item">
                            <p>Associate therapists commonly hold a master's degree and are <strong>currently pursuing supervised practice</strong> to obtain a clinical license.</p>
                            <p>They may use a variety of therapeutic techniques, including psychodynamic therapy or cognitive-behavioral therapy.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                  <button id="Psychologist" className="button is-outlined" onClick={()=>this.isCurrent("title","Psychologist")}>Psychologist</button>
                  </div>
                  <div className="level-item">
                    <div className="dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <a aria-haspopup="true" aria-controls="dropdown-licensed-therapist">
                          <span className="icon"><i className="fas fa-info-circle" aria-hidden="true" /></span>
                        </a>
                      </div>
                      <div className="dropdown-menu" id="dropdown-licensed-therapist" role="menu">
                        <div className="dropdown-content">
                          <div className="dropdown-item">
                            <p>Psychologists with a PhD earned their degree in four to seven years, and are fully trained in the assessment and treatment of all behavioral conditions.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <br />
              <p><strong>Years in practice</strong></p>
              <button name="yearsInPractice" id="<5" className="button is-outlined" onClick={()=>this.isCurrent("yearsInPractice","<5")}>less than 5 years</button>
              <button name="yearsInPractice" id="5-15" className="button is-outlined" onClick={()=>this.isCurrent("yearsInPractice","5-15")}>5 - 15 years</button>
              <button name="yearsInPractice" id="15>" className="button is-outlined" onClick={()=>this.isCurrent("yearsInPractice","15>")}>Over 15 years</button>
              <br />
              <p><strong>Languages</strong></p>
              <button id="Spanish" className="button is-outlined" onClick={()=>this.isCurrent("languages","Spanish")}>Spanish</button>
              <button id="French" className="button is-outlined" onClick={()=>this.isCurrent("languages","French")}>French</button>
              <button id="Mandarin" className="button is-outlined" onClick={()=>this.isCurrent("languages","Mandarin")}>Mandarin</button>
              <button id="Hindi" className="button is-outlined" onClick={()=>this.isCurrent("languages","Hindi")}>Hindi</button>
              <button id="Portuguese" className="button is-outlined" onClick={()=>this.isCurrent("languages","Portuguese")}>Portuguese</button>
              <button id="German" className="button is-outlined" onClick={()=>this.isCurrent("languages","German")}>German</button>
              <button id="Russian" className="button is-outlined" onClick={()=>this.isCurrent("languages","Russian")}>Russian</button>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
