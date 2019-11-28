import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { post, get } from "./api";
import ReCAPTCHA from "react-google-recaptcha";

export default class FeedBackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailClass:"button is-primary is-medium is-fullwidth mail-isChecked",
        };
        this.onSubmit = this.onSubmit.bind(this);  
        this.onChange = this.onChange.bind(this);  
        this.buttonChecked = this.buttonChecked.bind(this);   
        const recaptchaRef = React.createRef();
    }
    async onChange(value) {
      console.log("Captcha value:", value);
    }
    async onSubmit() {

      const contactData = {

        
        name:document.getElementById('feedback-name').value,
        email:document.getElementById('feedback-email').value,
        message:document.getElementById('feedback-message').value,
      };
      const recaptchaValue = recaptchaRef.current.getValue();
      console.log(recaptchaValue);
      //this.props.onSubmit(recaptchaValue);
      //await post("feedback", contactData);
      window.alert("Thank You! We Got Your Feedback");
    }
    buttonChecked(){
      let mailClass="";
      if(document.getElementById("feedback-message").value)
      {
        mailClass="button is-primary is-medium is-fullwidth"
      }
      else if(!document.getElementById("feed-back").value)
      {
          mailClass="button is-primary is-medium is-fullwidth mail-isChecked"
      }
      this.setState({mailClass});
    }
    render() {
        return (
            <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
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
                    <Link to="/" className={this.state.mailClass} onClick={this.onSubmit}>
                      Submit Feedback 
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
            <section className="section">
              <div className="container">
                <div className="content">
                  <h5 className="title is-5">How can we make allminds better?</h5>
                  <p>How did we do in helping you find the right therapist for you? What is missing? All feedback and requests are welcome.  Thank you!</p>
                </div>
                <div className="form">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input id="feedback-name" className="input" type="text" placeholder="Your name" />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                </div>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input id="feedback-email" className="input" type="email" placeholder="Your email" />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <textarea id="feedback-message" onChange={this.buttonChecked} className="textarea" placeholder="Your message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LcACcUUAAAAAA1uxR-z-BZF9oUcXrDmk9pSbUHA"
                        onChange={this.onChange}
                      />
                      </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
    }
}
