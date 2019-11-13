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
      
     
    };
    
    this.isCurrent = this.isCurrent.bind(this);
  }
  
  async isCurrent(key, event) {

    let dat=null;
    if(event!=null){
      this.state.filter[key].push(event);
    }
    dat = await get("therapist/?min="+JSON.stringify(this.state.filter.min)+"&max"+JSON.stringify(this.state.filter.max));
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
                  Show 23 Therapists
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
                      <input id="min-value" className="input" type="text" placeholder={10} defaultValue={10} onChange={()=>this.isCurrent("min",document.getElementById("min-value").value)} />
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
                      <input id="max-value" className="input" type="text" placeholder={200} defaultValue={200} onChange={()=>this.isCurrent("max",document.getElementById("max-value").value)} />
                      <span className="icon is-small is-left">
                        <strong>$</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </div></section>
      </div>
        )
    }
}
