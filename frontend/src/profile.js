import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {get} from './api';

export default class home extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          currentPage:1,
          therapist: [],
          special:[],
          communitie:[],
          id:null,
          insurance:[],
          i_also_speak:[],
          gender:[],
          title:[],
          filter:[],
          therapistTitle:'',
          availabilityAbout:['Evening','Weekend'],
        };
        console.log(this.props.location, 'this.props.location');
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
        
      }
    
      async componentDidMount() {
          const id=this.props.match.params.id;
        
        let dat = await get("therapist/"+id);
        console.log(this.state, 'this.state');
        console.log(dat, 'dat');
         let therapist = dat.data;
         let special = therapist.specialties ? therapist.specialties.split(','): ['N/A'];
         let communitie = therapist.communities.split(',');
         let insurance = therapist.accepted_insurance_plans.split(',');
         let i_also_speak = therapist.i_also_speak.split(',');
         let gender = therapist.gender.split(',');
         let title = therapist.title.split(',');
        
          this.setState({
            therapist,
            special,
            communitie,
            insurance,
            id,
            i_also_speak,
            gender,
            title,
          });
             
    }

    render() {
      const gender = this.state.gender.map((gend, index) => {
        if(gend == 'N/A' || gend == ''){
          return gend = '';
        }
        var commClass='';
        if(this.state.filter['gender'] && this.state.filter['gender'].some(item => gend === item)){
          commClass='is-light';
        }
        return <button key={index} className={"button "+commClass}>
                      {gend}
                  </button>
          
        });
        var specArray = [];
        const specialities = this.state.special.map((spec, index) => {
          var specl = '';
          var specClass='';
          if(spec == 'N/A' || spec == ''){
            specl = 'N/A';
          }
          else if(!specArray.some(item => 'Addiction' === item) && (spec == 'Addiction' || spec == 'Alcohol Abuse' || spec == 'Drug Abuse' || spec == 'Gambling' || spec == 'Internet Addiction' || spec == 'Sexual Addiction' || spec == 'Substance Abuse' || spec == 'Video Game Addiction')){
            specl = 'Addiction';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Addiction');
          }
					else if(!specArray.some(item => 'ADHD or attention issues' === item) && spec == 'ADHD'){
            specl = 'ADHD or attention issues';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('ADHD or attention issues');
          }
					else if(!specArray.some(item => 'Anxiety or panic attacks' === item) && spec == 'Anxiety'){
            specl = 'Anxiety or panic attacks';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Anxiety or panic attacks');
          }
          else if(!specArray.some(item => 'Depression' === item) && (spec == 'Depression' || spec == 'Bipolar Disorder' || spec == 'Self-Harming' || spec == 'Self Esteem' || spec == 'Suicidal Ideation')){
            specl = 'Depression';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Depression');
          }
					else if(!specArray.some(item => 'Eating and food issues' === item) && spec == 'Eating Disorders'){
            specl = 'Eating and food issues';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Eating and food issues');
          }
          else if(!specArray.some(item => 'Family Issues' === item) && (spec == 'Adoption' || spec == 'Behavioral Issues' || spec == 'Child or Adolescent' || spec == 'Family Conflict' || spec == 'Oppositional Defiance' || spec == 'Parenting')){
            specl = 'Family Issues';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Family Issues');
          }
					else if(!specArray.some(item => 'Grief' === item) && spec == 'Grief'){
            specl = 'Grief';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Grief');
          }
          else if(!specArray.some(item => 'Health Issues' === item) && (spec == "Alzheimer's" || spec == "Asperger's Syndrome" || spec == 'Autism' || spec == 'Chronic Ilness' || spec == 'Chronic Pain' || spec == 'Infertility' || spec == 'Obesity' || spec == 'Traumatic Brain Injury' || spec == 'Weight Loss')){
            specl = 'Health Issues';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Health Issues');
          }
          else if(!specArray.some(item => 'Relationship issues' === item) && (spec == 'Codependency' || spec == 'Divorce' || spec == 'Infidelity' || spec == 'Marital and Premarital' || spec == 'Relationship Issues')){
            specl = 'Relationship issues';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Relationship issues');
          }
					else if(!specArray.some(item => 'Life transitions' === item) && (spec == 'Life Transitions' || spec == 'Pregnancy, Prenatal, Postpartum')){
            specl = 'Life transitions';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Life transitions');
          }
          else if(!specArray.some(item => 'Sex and sexuality' === item) && (spec == 'Sexual Identity' || spec == 'Sex Therapy' || spec == 'Open Relationships Non-Monogamy' || spec == 'Sex-Positive, Kink Allied')){
            specl = 'Sex and sexuality';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Sex and sexuality');
          }
          else if(!specArray.some(item => 'Trauma or abuse' === item) && (spec == 'Domestic Abuse' || spec == 'Domestic Violence' || spec == 'Sexual Abuse' || spec == 'Trauma and PTSD')){
            specl = 'Trauma or abuse';
            if(this.state.filter['specialties'] && this.state.filter['specialties'].some(item => specl === item)){
              specClass='is-light';
            }
            specArray.push('Trauma or abuse');
          }
          if(specl == ''){
            return false;
          }
          return <button key={index} className={"button "+specClass}>
                        {spec}
                    </button>
            
          });
          const communities = this.state.communitie.map((comm, index) => {
            var commClass='';
            if(this.state.filter['communities'] && this.state.filter['communities'].some(item => comm === item)){
              commClass='is-light';
            }
            return <button key={index} className={"button "+commClass}>
                        {comm}
                    </button>
            
          });
          const insurance = this.state.insurance.map((insur, index) => {
            if(insur == 'N/A' || insur == ''){
              insur = 'Private pay';
            }
            var commClass='';
            if(this.state.filter['insurance'] && this.state.filter['insurance'].some(item => insur === item)){
              commClass='is-light';
            }
            return <button key={index} className={"button "+commClass}>
                    {insur}
                  </button>
            
          });
          const language = this.state.i_also_speak.map((lang, index) => {
            lang = lang.trim();
            if(lang == 'N/A' || lang == ''){
              return lang = '';
            }
            var commClass='';
            if(this.state.filter['languages'] && this.state.filter['languages'].some(item => lang === item)){
              commClass='is-light';
            }
            return <button key={index} className={"button "+commClass}>
                    {lang}
                  </button>
            
          });
          const availability = this.state.availabilityAbout.map((avail, index) => {
            console.log(avail.toLowerCase(),'avail');
            console.log(this.state.therapist.about,'this.state.therapist.about');
            if(this.state.therapist.about && (this.state.therapist.about.includes(avail) || this.state.therapist.about.includes(avail.toLowerCase())) == 1){
              var commClass = '';
              if(this.state.filter['availability'] && this.state.filter['availability'].some(item => avail+'s' === item)){
                commClass = "is-light";
              } 
              return  <button key={index} className={"button "+commClass}>
                        {avail+'s'}
                      </button>

            }
            else{
              return false
            }
          });
          const Title = this.state.title.map((title, index) => {
            var therapistTitle = title.trim();
            if(therapistTitle == 'Marriage & Family Therapist Associate'){
              therapistTitle = 'Associate therapist';
            }
            else if(therapistTitle == 'Psychologist'){
              therapistTitle = 'Psychologist';
            }
            else if(therapistTitle == 'Clinical Social Work/Therapist' || therapistTitle == 'Marriage & Family Therapist'){
              therapistTitle = 'Licensed therapist';
            }
            else{
              return false;
            }
            this.state.therapistTitle = therapistTitle;
            var commClass='';
            if(this.state.filter['title'] && this.state.filter['title'].some(item => therapistTitle === item)){
              commClass='is-light';
            }
            return <button key={index} className={"button "+commClass}>
                    {therapistTitle}
                  </button>;
          });
        return (
<div style={{textAlign:"left"}}>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to={{pathname: "/", filter: this.state.filter, search_filter: this.state.search_filter, currentPage: this.state.currentPage }}>
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
                      {this.state.therapistTitle}
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
                    {gender}
                    {Title}
                  <button className={this.state.filter['yearsInPractice'] && this.state.filter['yearsInPractice'].length>0 ? "button is-light" : "button"} >
                    {this.state.therapist.years_in_practice}
                  </button>
                    {language}
                </div>
                <h5 className="title is-5">Insurance</h5>
                <div className="buttons therapist-tags">
                  {insurance}
                </div>
                <h5 className="title is-5">Availability:</h5>
                <div className="buttons therapist-tags">
                  {availability}
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