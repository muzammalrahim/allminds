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
    
    this.isCurrent = this.isCurrent.bind(this);
  }
  
  async isCurrent() {

    let dat=null;
    let min = document.getElementById("min-value").value;
    let max = document.getElementById("max-value").value;
    this.state.filter.min = min;
    this.state.filter.max = max;
    
    dat = await get("therapist/?min="+min+'&max='+max);
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
                 <button id="Spanish" className="button is-primary" onClick={()=>this.isCurrent()}>Search</button>
            </div>
          </div></section>
      </div>
        )
    }
}
