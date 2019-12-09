import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { post, get } from "./api";
import ReCAPTCHA from "react-google-recaptcha";

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:null,
            contactData:[],
            mailClass:"button is-primary is-medium is-fullwidth mail-isChecked",
            // mailClass: '',
            recaptchaRef: React.createRef(),
            therapist: [],
            filter: this.props.location.filter ? this.props.location.filter : localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')): [],

        };
        if(this.props.location.filter){
          for(var filtersss in this.props.location.filter){
            this.state.filter[filtersss] = this.props.location.filter[filtersss];
          }
        }
        if(this.props.location.search_filter){
          this.state.search_filter = this.props.location.search_filter;
        }
        if(this.props.location.currentPage){
          this.state.currentPage = this.props.location.currentPage;
        }
        this.onSubmit = this.onSubmit.bind(this);  
        this.onChange = this.onChange.bind(this);

      }
    async componentDidMount() {
        const id=this.props.match.params.id;
        let dat = await get("therapist/"+id+"/");
        let therapist = dat.data;
        this.setState({
            id, therapist,
        });
           
    }

    async onSubmit() {
      let message = document.getElementById('mail-message').value;
      let name = document.getElementById('mail-name').value;
      let email = document.getElementById('mail-email').value;
      let phoneNumber = document.getElementById('mail-phoneNumber').value;
      const recaptchaValue = this.state.recaptchaRef.current.getValue();
      // const recaptchaValue = 1;
      if(message == ''){
        window.alert("Error: Please Enter Your Message");
        return false;
      }
      else if(name == ''){
        window.alert("Error: Please Enter Your Name");
        return false;
      }
      else if(email == ''){
        window.alert("Error: Please Enter Your Email");
        return false;
      }
      else if(phoneNumber == ''){
        window.alert("Error: Please Enter Your Phone number");
        return false;
      }
      else if(recaptchaValue !== ''){
        const contactData = {
          message: message,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
        };
        await post("sendEmail", contactData);
        //window.alert("Thank You! I Got Your Message, I Will Contact You Soon");
        localStorage.setItem('contactData', JSON.stringify(contactData));
        localStorage.setItem('id', JSON.stringify(this.state.id));
        this.props.history.push({
          contactData: contactData,
          pathname: "/emailConfirmation/"+this.state.id,
          id: this.state.id,
          filter: this.state.filter,
          search_filter: this.state.search_filter,
          currentPage: this.state.currentPage,
        });
      }
      else{
        window.alert("Error: Please verify reCAPTCHA");
        return false;
      }

    }

    async onChange(value) {
      let mailClass="";
      if(value)
      {
        mailClass="button is-primary is-medium is-fullwidth"
      }
      else if(value === '')
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
            <Link to={{pathname:"/profile/"+this.state.id, filter: this.state.filter, search_filter: this.state.search_filter, currentPage: this.state.currentPage }} className="navbar-item">
              <span className="icon is-medium"><i className="fas fa-times fa-2x" /></span>
            </Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-start">
            </div>
          </div>
        </nav>
        <nav className="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
          <div id="mail-button" className="navbar-menu is-active">
            <div className="navbar-start">
              <div className="navbar-item">
                <button className={this.state.mailClass} onClick={this.onSubmit}>
                  Send message
                </button>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <div className="content">
              <h5 className="title is-5">Reach out to {this.state.therapist.first_name}</h5>
              <p>Don't be shy. Therapists are here to help you and are pleased to hear from you.</p>
            </div>
            <div className="form">
              <div className="field">
                <div className="control">
                  <textarea id="mail-message" className="textarea" placeholder="Your message" defaultValue={""} />
                </div>
                <p className="help">Feel free to ask for what you want... an appointment, a consultation or simply a response to a question</p> 
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input id="mail-name" className="input" type="text" placeholder="Your name" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input id="mail-email" className="input" type="email" placeholder="Your email" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input id="mail-phoneNumber" className="input" type="tel" placeholder="Your phone number" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone" />
                  </span>
                </div>
              </div>
              {/* <div className="field">
                <div className="control">
                  <label className="checkbox">
                   
                     <input type='checkbox' id="mail-checked" onChange={this.buttonChecked}/>
                     I am not a robot
                     
                  </label>
                </div> 
              </div>*/}
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
