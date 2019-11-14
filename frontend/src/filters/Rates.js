import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from '../api';


export default class Rates extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      therapists: [],
      filter:{
        min:[], max:[],
      },
      count: null,
      
     
    };
    
    this.isCurrent = this.isCurrent.bind(this);
  }
  
  async isCurrent(event) {

    let dat=null;
    
    dat = await get("therapist/?"+event);
    let therapists = dat.data.results;
    let count = dat.data.count;

    this.setState({
      therapists, count,
    });
}

    render() {
        return (
            <div>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <span className="icon is-medium"><i className="fas fa-times fa-2x" /></span>
            </Link>
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
                Show {this.state.count} Therapists
                </a>
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
                      <input id="min-value" className="input" type="text" placeholder={10} defaultValue={10}/>
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
                      <input id="max-value" className="input" type="text" placeholder={200} defaultValue={200}/>
                      <span className="icon is-small is-left">
                        <strong>$</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </nav>
            <div>
                 <button id="Spanish" className="button is-primary" onClick={()=>this.isCurrent(("min="+JSON.stringify(document.getElementById("min-value").value))+"&max="+JSON.stringify(document.getElementById("max-value").value))}>Search</button>
            </div>
          </div></section>
      </div>
        )
    }
}
