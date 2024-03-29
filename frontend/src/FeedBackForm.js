import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { post, get } from "./api";
import ReCAPTCHA from "react-google-recaptcha";
import ReactDOM from 'react-dom'

export default class FeedBackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailClass:"button is-primary is-medium is-fullwidth mail-isChecked",
            recaptchaRef: React.createRef(),
            filter: this.props.location.filter ? this.props.location.filter : localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')): []
        };
        this.onSubmit = this.onSubmit.bind(this);  
        this.onChange = this.onChange.bind(this);  
        this.showHideMsg = this.showHideMsg.bind(this);
        
    }
    async onChange(value) {
      let mailClass="";
      if(value)
      {
        mailClass="button is-primary is-medium is-fullwidth"
      }
      else if(value == '')
      {
          mailClass="button is-primary is-medium is-fullwidth mail-isChecked"
      }
      this.setState({mailClass});
    }
     //Show/Hide Message
     async showHideMsg(message,type){
      if(type == "success"){
        document.getElementById("messagewrap").classList.add("success-msg").classList.remove("error-msg");
      }else if(type == "error"){
        document.getElementById("messagewrap").classList.remove("success-msg").classList.add("error-msg");
      }
      ReactDOM.render(message, document.getElementById('messagewrap'));

      /* document.getElementById("message-wrap").stop()
      .slideDown()
      .html(message)
      .delay(1500)
      .slideUp(); */
    }
    async onSubmit() {
      let name = document.getElementById('feedback-name').value;
      let email = document.getElementById('feedback-email').value;
      let message = document.getElementById('feedback-message').value;
      const recaptchaValue = this.state.recaptchaRef.current.getValue();
      if(name == ''){
        window.alert("Error: Please Enter Your Name");
        return false;
      }
      else if(email == ''){
        window.alert("Error: Please Enter Your Email");
        return false;
      }
      else if(message == ''){
        window.alert("Error: Please Enter Your Message");
        return false;
      }
      else if(recaptchaValue != ''){
        const contactData = {
          message: message,
          name: name,
          email: email,
        };
        //this.showHideMsg("Form Submitted!","success");
        //this.props.onSubmit(recaptchaValue);
        await post("feedback", contactData);
        window.alert("Thank You! We Got Your Feedback");
        // return this.state.router.history.push(`/`);
        this.props.history.push('/');
      }
      else{
        //this.state.recaptchaRef.reset();
        //this.showHideMsg("Please verify reCAPTCHA","error");
        window.alert("Error: Please verify reCAPTCHA");
        return false;
      }
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
                    <button className={this.state.mailClass} onClick={this.onSubmit}>
                      Submit Feedback 
                    </button>
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
                      <textarea id="feedback-message" className="textarea" placeholder="Your message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <div id="messagewrap" className="">
                        <span></span>
                      </div>
                      <ReCAPTCHA
                        ref={this.state.recaptchaRef}
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
