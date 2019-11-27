import React, { Component } from 'react';
import {get} from './api';
import {Link} from 'react-router-dom';


export default class home extends Component {

    constructor(props) {
    super(props);
    this.state = {
      therapists: [],
      count: null,
      currentPage: 1,
      todosPerPage: 3,
      perPage:1,
      filter: this.props.location.filter ? this.props.location.filter : {
        specialties:[], genderFocus:[], ageGroup:[], communities:[], gender:[], title:[], yearsInPractice:[], languages:[], insurance:[], availability:[], min:0, max:0,
      },
      search_filter: null,
      totalPages: 1,
      fromTherapist:1,
      toTherapist:1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.isCurrent = this.isCurrent.bind(this);
    this.search_filter = this.search_filter.bind(this);
  }
  componentDidMount() {
      this.isCurrent();
  }
  handleClick(event) {
    document.getElementById(this.state.currentPage).className = 'pagination-link';
    let numb=event.target.id.split('-')
    this.state.currentPage = Number(numb[1]);
    this.isCurrent(this.state.currentPage);
  }

  async search_filter(){
    this.state.search_filter=document.getElementById('search_bar').value;
    console.log(this.state.search_filter);
    let url = 'therapist/?';
    if(this.state.search_filter && this.state.search_filter != null){
      url += 'search='+this.state.search_filter;
    }
    let dat = await get(url);
    //let dat = await get("therapist/?availability="+JSON.stringify(this.state.filter.availability));
    let therapists = dat.data.results;
    let count = dat.data.count;
    let filter = this.state.filter;
    let search_filter = this.state.search_filter;

    this.setState({
      therapists, count, filter, search_filter
    });
  }

  async isCurrent(event) {
    document.getElementById('loadingSpinner').classList.remove('hide');
    let dat=null;
    let url = 'therapist/?';
    var perPage = this.state.perPage;
    if(event==null)
    { 
      document.getElementById(1).className += ' is-current';
    }
    else if(event!=null)
    { 
     
      document.getElementById(this.state.currentPage).className = 'pagination-link';
      console.log(event, 'event');
      perPage = event;
      this.state.currentPage = event;
      url += "page="+event+'&';
    }
    if('specialties' in this.state.filter && this.state.filter.specialties.length>0){
      document.getElementById("Specialties").className = 'button is-light';
      url += 'specialties='+JSON.stringify(this.state.filter.specialties)+'&';
    }
    if('availability' in this.state.filter && this.state.filter.availability.length>0){
      document.getElementById("Availability").className = 'button is-light';
      url += 'availability='+JSON.stringify(this.state.filter.availability)+'&';
    }
    if('insurance' in this.state.filter && this.state.filter.insurance.length>0){
      document.getElementById("Insurance").className = 'button is-light';
      url += 'insurance='+JSON.stringify(this.state.filter.insurance)+'&';
    }
    if('genderFocus' in this.state.filter && this.state.filter.genderFocus.length>0){
      document.getElementById("Client Focus").className = 'button is-light';
      url += 'genderFocus='+JSON.stringify(this.state.filter.genderFocus)+'&';
    }
    if('ageGroup' in this.state.filter && this.state.filter.ageGroup.length>0){
      document.getElementById("Client Focus").className = 'button is-light';
      url += 'ageGroup='+JSON.stringify(this.state.filter.ageGroup)+'&';
    }
    if('communities' in this.state.filter && this.state.filter.communities.length>0){
      document.getElementById("Client Focus").className = 'button is-light';
      url += 'communities='+JSON.stringify(this.state.filter.communities)+'&';
    }
    if('gender' in this.state.filter && this.state.filter.gender.length>0){
      document.getElementById("Background").className = 'button is-light';
      url += 'gender='+JSON.stringify(this.state.filter.gender)+'&';
    }
    if('title' in this.state.filter && this.state.filter.title.length>0){
      document.getElementById("Background").className = 'button is-light';
      url += 'title='+JSON.stringify(this.state.filter.title)+'&';
    }
    if('yearsInPractice' in this.state.filter && this.state.filter.yearsInPractice.length>0){
      document.getElementById("Background").className = 'button is-light';
      url += 'yearsInPractice='+JSON.stringify(this.state.filter.yearsInPractice)+'&';
    }
    if('languages' in this.state.filter && this.state.filter.languages.length>0){
      document.getElementById("Background").className = 'button is-light';
      url += 'languages='+JSON.stringify(this.state.filter.languages)+'&';
    }
    if('min' in this.state.filter && this.state.filter.min.length>0){
      document.getElementById("Rates").className = 'button is-light';
      url += 'min='+this.state.filter.min+'&';
    }
    if('max' in this.state.filter && this.state.filter.max.length>0){
      document.getElementById("Rates").className = 'button is-light';
      url += 'max='+this.state.filter.max+'&';
    }
    if(this.state.search_filter && this.state.search_filter != null){
      document.getElementById("search_bar").className = 'button is-light';
      url += 'search='+this.state.search_filter+'&';
    }

    dat = await get(url);
    
    document.getElementById(this.state.currentPage).className += ' is-current';
    let therapists = dat.data.results;
    let count = dat.data.count;
    if(count > 0){
      this.state.fromTherapist = this.state.currentPage * 9 - 8;
      if(this.state.currentPage * 9 < count){
        this.state.toTherapist = this.state.currentPage * 9;
      }
      else{
        this.state.toTherapist = count;
      }
    }
    else{
      this.state.fromTherapist = 0;
    }
    if(window.total_therapist == undefined) {
      window.total_therapist = count;
    }
    let total = window.total_therapist;

    this.setState({
      therapists, count, perPage, total 
    });
    document.getElementById('loadingSpinner').classList.add('hide');

}


    render() {
      let spec=[];
    if(this.props.location.specialities){
      spec =this.props.location.specialities.specialities;
    }
    console.log(spec,"spec00");
      const {currentPage, todosPerPage } = this.state;
      let totalPages = pageCount(this.state.count);
      this.state.totalPages = totalPages;
      let lastPage = rightCount(totalPages);
      function pageCount(val){
        let value = 1;
        if(val%9==0){
          value = val/9;
          if(value == 0) 
            value = 1;
        }
        else{
          value = val/9+1;
        }
        return value | 0;
      }
      function rightCount(val){
        if(val%9==0){
          return val/9 |0;
        }
        else{
          return val/9+1 | 0;
        }
      }
      let isLeft = 'pagination-previous';
      let isRight = 'pagination-next'
      if (currentPage<2) {
        isLeft += ' is-first-page';
      }
      if (currentPage>=totalPages) {
        isRight += ' is-first-page';
      }
    
      let pages = [];
        for(let i=0; i<totalPages; i++){
          pages.push(i+1);
        }
      const currentTodos = pages;


      const renderTodos = currentTodos.map((page, i) => {

        if((page == totalPages || (page >= currentPage -1 && page <= currentPage + 1)) || (page == 1 && this.state.count > 0)) {
          var currClassname = 'dat-nlast';
          if(page == totalPages || page + 1 == totalPages ) {
            currClassname = '';
          }
          return <li className={currClassname} key={i}>
                  <a name={"therapist/?page="+page} id={page} className={'pagination-link'} onClick={()=>this.isCurrent(page)} aria-label={"Page "+page} aria-current="page">{page}</a>
                </li> 
        }
        else if((currentPage + 2 == page) || (currentPage - 2 == page)) {
          var currClassname = '';
          if(currentPage - 2 == page && currentPage + 2 != totalPages) {
            currClassname = 'dat-class';
          }
          return <li className={currClassname} key={i}>
                  <a className={'pagination-link'} aria-current="page">...</a>
                </li> 
        } 
        
      });

      const therapistTitleF = this.state.therapists.map((therapist, i) => {
        var therapistTitle = therapist.title;
        if(therapistTitle.search('Marriage & Family Therapist Associate') == 1){
          therapistTitle = 'Associate therapist';
        }
        else if(therapistTitle.search('Psychologist') == 1){
          therapistTitle = 'Psychologist';
        }
        else if(therapistTitle.search('Clinical Social Work/Therapist') == 1 || therapistTitle.search('Marriage & Family Therapist') == 1){
          therapistTitle = 'Licensed therapist';
        }
        else{
          return false;
        }
        return  <div key={i} className="column is-half is-one-third-fullhd">
                  <Link to={"/profile/"+therapist.id} className="box therapist-card">
                    <article className="media">
                      <figure className="media-left">
                        <p className="image is-128x160">
                          <img alt='' src={therapist.profile_image_url} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <div className="therapist-title">{therapistTitle}</div>
                          <h4 className="title is-4">{therapist.first_name+" "+therapist.last_name}</h4>
                          <small><strong>{therapist.cost_per_session}</strong>/session</small>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
      });

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(pages.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      console.log(this.props,"spec");

        return (
            <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <h1 className="title is-5">allminds</h1>
            </Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-start navbar-search">
              <div className="navbar-item">
                <input className="input" type="text" id="search_bar" value={this.state.search_filter} placeholder="Look for a specific therapist" onChange={this.search_filter}/>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <div className="home-intro">
              <span className="icon is-medium">
                <i className="far fa-grin fa-2x" />
              </span>
              <p>Over {this.state.total} online therapists available to talk with you from the comfort of your home. Find the one that fits your needs and we'll help you reach them.</p>
            </div>
            <div className="search-filters">
              <div className="buttons">
                <Link to={{pathname: "/specialties", filter: this.state.filter }} className="button is-outlined" id="Specialties" >
                  Specialties
                </Link>
                <Link to={{pathname: "/clientFocus", filter: this.state.filter }} className="button is-outlined" id="Client Focus">
                  Client Focus
                </Link>
                <Link to={{pathname: "/background", filter: this.state.filter }} className="button is-outlined" id="Background">
                  Background
                </Link>
                <Link to={{pathname: "/insurance", filter: this.state.filter }} className="button is-outlined" id="Insurance">
                  Insurance
                </Link>
                <Link to={{pathname: "/availability", filter: this.state.filter }} className="button is-outlined" id="Availability">
                  Availability
                </Link>
                <Link to={{pathname: "/rates", filter: this.state.filter }} className="button is-outlined" id="Rates">
                  Rates
                </Link>
              </div>
            </div>
            <div className="box home-alert">
              <nav className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <span className="icon is-medium">
                      <img alt='' src="/static/images/lamp.svg" />
                    </span>
                  </div>
                  <div className="level-item">
                    <p>Want more filters? <Link to="/feedback" >Let us know</Link></p>
                  </div> 
                </div>
              </nav>
            </div>
        <p style={{textAlign:"left"}}>{this.state.fromTherapist}-{this.state.toTherapist} of {this.state.count}+ Therapists</p>
              <div className="columns is-multiline">
                {therapistTitleF}
              </div>
              
              <nav className={"pagination is-rounded is-centered"} role="navigation" aria-label="pagination">
                <a className={isLeft}><span className="icon"><i className="fas fa-chevron-left" id={"page-"+(currentPage-1)} onClick={this.handleClick}/></span></a>
                <ul className="pagination-list">
                  {renderTodos}
                </ul>
                <a className={isRight}><span className="icon"><i className="fas fa-chevron-right" id={"page-"+(currentPage+1)} onClick={this.handleClick}/></span></a>
            </nav>
          </div>
        </section>
        <div id="loadingSpinner" className="loading hide">Loading&#8230;</div>
      </div>
    
            
        )
    }
}

      
