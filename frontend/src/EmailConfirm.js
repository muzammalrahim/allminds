import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { post, get } from "./api";

export default class EmailConfirm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:null,
            filter:[],

        };
        if(this.props.location.filter){
          for(var filtersss in this.props.location.filter){
            this.state.filter[filtersss] = this.props.location.filter[filtersss];
          }
          console.log(this.props.location,'localllll');
        }
        if(this.props.location.search_filter){
          this.state.search_filter = this.props.location.search_filter;
        }
        if(this.props.location.currentPage){
          this.state.currentPage = this.props.location.currentPage;
        }
      }
    async componentDidMount() {
        const id=this.props.match.params.id;
        let dat = await get("therapist/"+id);
        let therapist = dat.data;
        this.setState({
            id, therapist,
        });
           
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
                <h5 className="title is-5">Your message was sent to Kati</h5>
                <p>We're so stoked that you took this first step</p>
                <br />
                <h5 className="title is-5">What's next?</h5>
                <p>Make sure you receive a confirmation to the email address you've provided: </p>
                <p>
                  <strong>user@email.com</strong>
                  {/* <br>
              <a href="#">Change my email address</a> */}
                </p>
                <p>We'll be putting you in contact with Kati very shortly through that email. Good luck!</p>
                <br />
                <h5 className="title is-5">Help us make allminds better</h5>
                <p>We're trying to make it easier for anyone to start therapy. Your feedback would be hugely appreciated</p>
                <a className="button is-primary is-medium is-fullwidth" href="feedbackForm.html">
                  Share feedback
                </a>
              </div>
            </div>
          </section>
        </div>
         )
        }
    }
    