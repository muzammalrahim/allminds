import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:null,
        };
        
      }
    async componentDidMount() {
        
        const id=this.props.match.params.id;
        this.setState({
            id,
        });
           
  }
    render() {
        return (
            <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to={"/profile/"+this.state.id} className="navbar-item">
              <span className="icon is-medium"><i className="fas fa-times fa-2x" /></span>
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
                <a className="button is-primary is-medium is-fullwidth" href="emailConfirmation.html">
                  Send message
                </a>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <div className="content">
              <h5 className="title is-5">Reach out to Kati</h5>
              <p>Don't be shy. Therapists are here to help you and are pleased to hear from you.</p>
            </div>
            <div className="form">
              <div className="field">
                <div className="control">
                  <textarea className="textarea" placeholder="Your message" defaultValue={""} />
                </div>
                <p className="help">Feel free to ask for what you want... an appointment, a consultation or simply a response to a question</p> 
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input className="input" type="text" placeholder="Your name" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input className="input" type="email" placeholder="Your email" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input className="input" type="tel" placeholder="Your phone number" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone" />
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" />
                    I am not a robot
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
