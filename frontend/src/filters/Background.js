import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';


export default class Background extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        gender:[], title:[], yearsInPractice:[], languages:[],
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
              document.getElementById(event).className= 'button is-outlined';
              var index = this.state.filter[key].indexOf(event);
              if (index !== -1) this.state.filter[key].splice(index, 1);
              }
      }
      
    
    let filters=this.state.filter;
    dat = await get("therapist/?gender="+JSON.stringify(filters.gender)+"&title="+JSON.stringify(filters.title)+"&yearsInPractice="+JSON.stringify(filters.yearsInPractice)+"&languages="+JSON.stringify(filters.languages));

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
            <h5 className="title is-5 filter-header-add" >Therapist Background</h5>
            <p>Choose the desired background of your therapist
            </p>
            <br />
            <div className="filter-list">
              <p><strong>Gender</strong></p>
              <button id="Female" className="button is-outlined" onClick={()=>this.isCurrent("gender","Female")}>Women</button>
              <button id="Male" className="button is-outlined" onClick={()=>this.isCurrent("gender","Male")}>Men</button>
              <button id="Non-binary" className="button is-outlined" onClick={()=>this.isCurrent("gender","Non-binary")}>Non-binary</button>
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
              <button id="less than 5 years" className="button is-outlined" onClick={()=>this.isCurrent("yearsInPractice","less than 5 years")}>less than 5 years</button>
              <button id="5 - 15 years" className="button is-outlined" onClick={()=>this.isCurrent("yearsInPractice","5 - 15 years")}>5 - 15 years</button>
              <button id="Over 15 years" className="button is-outlined" onClick={()=>this.isCurrent("yearsInPractice","Over 15 years")}>Over 15 years</button>
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
