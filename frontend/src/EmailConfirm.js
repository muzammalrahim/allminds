import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { post, get } from "./api";

export default class EmailConfirm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: null,
            filter: this.props.location.filter ? this.props.location.filter : localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')) : [],
            contactData: this.props.location.contactData ? this.props.location.contactData : localStorage.getItem('contactData') ? JSON.parse(localStorage.getItem('contactData')) : [],
            therapist: [],

        };
        console.log(this.props,'location');
        console.log(this.state,'state');
        console.log(localStorage,'localStorage');
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
        if(this.props.location.contactData){
          this.state.contactData = this.props.location.contactData;
        }
      }
    async componentDidMount() {
        const id=this.props.match.params.id;
        console.log(id,'id');
        let dat = await get("therapist/"+id+"/");
        let therapist = dat.data;
        this.setState({
            id, therapist,
        });
        console.log(this.state.therapist,'therapist'); 
    }
    render() {
        return (
        <div>
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to={{pathname:"/profile/"+this.state.id, filter: this.state.filter, search_filter: this.state.search_filter, currentPage: this.state.currentPage }} className="navbar-item">
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
          <section className="section">
            <div className="container">
              <div className="content">
                <h5 className="title is-5">Your message was sent to {this.state.therapist.first_name}</h5>
                <p>{this.state.contactData ? this.state.contactData.message: ''}</p>
                <br />
                <h5 className="title is-5">What's next?</h5>
                <p>Make sure you receive a confirmation to the email address you've provided: </p>
                <p>
                  <strong>{this.state.contactData ? this.state.contactData.email: ''}</strong>
                  {/* <br>
              <a href="#">Change my email address</a> */}
                </p>
                <p>We'll be putting you in contact with Kati very shortly through that email. Good luck!</p>
                <br />
                <h5 className="title is-5">Help us make allminds better</h5>
                <p>We're trying to make it easier for anyone to start therapy. Your feedback would be hugely appreciated</p>
                <Link to="/feedback" className="button is-primary is-medium is-fullwidth" >Share feedback</Link>
              </div>
            </div>
          </section>
        </div>
         )
        }
    }
    