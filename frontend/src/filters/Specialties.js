import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Specialties extends Component {
    render() {
        return (
            <div>
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <Link to="/" className="navbar-item" >
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
                <h5 className="title is-5" style={{marginTop:"50px"}}>Specialties</h5>
                <p>Choose your therapist's specialties
                </p>
                <br />
                <div className="filter-list">
                  <button className="button is-outlined">Addiction</button>
                  <button className="button is-light">ADHD or attention issues</button>
                  <button className="button is-outlined">Anxiety or panic attacks</button>
                  <button className="button is-light">Depression</button>
                  <button className="button is-outlined">Eating and food issues</button>
                  <button className="button is-outlined">Grief</button>
                  <button className="button is-outlined">Relationship issues</button>
                  <button className="button is-outlined">Life transitions</button>
                  <button className="button is-outlined">Sex and sexuality</button>
                  <button className="button is-outlined">Trauma or abuse</button>
                </div>
              </div>
            </section>
          </div>
        )
    }
}
