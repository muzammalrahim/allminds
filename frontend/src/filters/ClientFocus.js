import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class ClientFocus extends Component {
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
            <h5 className="title is-5">Client Focus</h5>
            <p>Choose the client type your therapist works with
            </p>
            <br />
            <div className="filter-list">
              <p><strong>Gender</strong></p>
              <button className="button is-outlined">Women</button>
              <button className="button is-light">Men</button>
              <button className="button is-outlined">Non-binary</button>
              <br />
              <p><strong>Age group</strong></p>
              <button className="button is-outlined">Adults</button>
              <button className="button is-outlined">Elders</button>
              <button className="button is-outlined">Teens</button>
              <br />
              <p><strong>Communities</strong></p>
              <button className="button is-light">Ethnic minorites</button>
              <button className="button is-outlined">LGBQT</button>
              <button className="button is-outlined">Veterans</button>
              <button className="button is-outlined">Cancer survivors</button>
              <button className="button is-light">Religious / Spiritual</button>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
