import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from './api';

export default class home extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          therapist: [],
          special:[],
          communitie:[],
          insurance:[],
          id:null,
        };
        
      }
    
      async componentDidMount() {
          const id=this.props.match.params.id;
        
        let dat = await get("therapist/"+id);
         let therapist = dat.data;
         let special = therapist.specialties.split(',');
         let communitie = therapist.communities.split(',');
         let insurance = therapist.accepted_insurance_plans.split(',');
        
          this.setState({
            therapist,
            special,
            communitie,
            insurance,
            id,
             });
             
    }

    render() {
        const specialities = this.state.special.map((spec, index) => {
            return <button key={index} className="button is-light">
                        {spec}
                    </button>
            
          });
          const communities = this.state.communitie.map((comm, index) => {
            return <button key={index} className="button is-light">
                        {comm}
                    </button>
            
          });
          const insurance = this.state.insurance.map((insur, index) => {
            return <button key={index} className="button is-light">
                    {insur}
                  </button>
            
          });
        return (
<div style={{textAlign:"left"}}>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <h1 className="title is-5">allminds</h1>
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
            {/* Therapist summary */}
            <div className="columns">
              <div className="column is-half">
                <article className="media">
                  <div className="media-content">
                    <div className="content">       
                      <h1 className="title is-3">Hi, I'm {this.state.therapist.first_name}</h1>
                      {this.state.therapist.title}
                      <br />
                      <strong>{this.state.therapist.cost_per_session}</strong> / session
                      {/* Ratings summary for future release */}
                      {/* <nav class="level is-mobile">
                    <br>
                    <div class="level-left">
                      <div class="star-rating">
                        <span class="icon"><i class="fas fa-star"></i></span>
                        <span class="icon"><i class="fas fa-star"></i></span>
                        <span class="icon"><i class="fas fa-star"></i></span>
                        <span class="icon"><i class="fas fa-star"></i></span>
                        <span class="icon"><i class="fas fa-star-half-alt"></i></span>
                        (23)
                      </div>
                    </div>
                  </nav> */}
                      {/* Ratings summary for future release */}
                    </div>
                  </div>
                  <div className="media-right has-text-centered">
                    <figure className="image is-128x128">
                      <img src={this.state.therapist.profile_image_url} alt=''/>
                    </figure>
                  </div>
                </article>
                <br />
                <Link to={"/contactForm/"+this.state.id} className="button is-primary is-medium is-fullwidth">
                  Message me
                </Link>
              </div>
            </div>
            <hr />
            {/* Therapist summary */}
            {/* About me and Soecialties  */}
            <div className="columns">
              <div className="column is-half">
                <h5 className="title is-5">About</h5>
                <p>{this.state.therapist.about}</p>
              </div>
              <hr className="is-hidden-tablet" />
              <div className="column is-half">
                <h5 className="title is-5">Specialties</h5>
                <div className="buttons therapist-tags">
                  {specialities}
                </div>
                <h5 className="title is-5">Client Focus</h5>
                <div className="buttons therapist-tags">
                {communities}
                 </div>
                <h5 className="title is-5">Background</h5>
                <div className="buttons therapist-tags">
                  <button className="button is-outlined">
                    {this.state.therapist.gender}
                  </button>
                  <button className="button is-outlined">
                    Licensed therapist
                  </button>
                  <button className="button is-outlined">
                  {this.state.therapist.years_in_practice}
                  </button>
                </div>
                <h5 className="title is-5">Insurance</h5>
                <div className="buttons therapist-tags">
                  {insurance}
                </div>
                <h5 className="title is-5">Availability:</h5>
                <div className="buttons therapist-tags">
                  <button className="button is-outlined">
                    Evenings
                  </button>
                  <button className="button is-outlined">
                    Weekend
                  </button>
                </div>
              </div>
            </div>
            {/* About me and Soecialties  */}
            {/* Review sections, for future release */}
            {/* <hr>
        <div class="columns">
          <div class="column">
            <h5 class="title is-5">23 reviews</h5>

            <article class="media">
              <figure class="media-left">
                <p class="image is-48x48">
                  <img class="is-rounded has-background-primary" src="icons/Chinchilla.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>Anonymous Chinchilla</strong> 
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                  </p>
                </div>
              </div>
            </article>

            <article class="media">
              <figure class="media-left">
                <p class="image is-48x48">
                  <img class="is-rounded has-background-primary" src="icons/Axolotl.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>Anonymous Axolotl</strong> 
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                  </p>
                </div>
              </div>
            </article>

            <br>
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="levl-item">
                  <a href="#">Read all 23 reviews</a>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <div class="star-rating">
                    <span class="icon"><i class="fas fa-star"></i></span>
                    <span class="icon"><i class="fas fa-star"></i></span>
                    <span class="icon"><i class="fas fa-star"></i></span>
                    <span class="icon"><i class="fas fa-star"></i></span>
                    <span class="icon"><i class="fas fa-star-half-alt"></i></span>
                    (23)
                  </div>
                </div>
              </div>
            </nav>

          </div>
        </div> */}
            {/* Review sections, for future release */}
          </div>
        </section> 
      </div>

)
}
}