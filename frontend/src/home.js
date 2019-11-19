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
      filter: this.props.location.filter ? this.props.location.filter : [],
      totalPages: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.isCurrent = this.isCurrent.bind(this);
  }
  componentDidMount() {
      this.isCurrent();
    /*else {
      let therapists = this.props.location.data.results;
      let perPage = this.state.perPage;
      let count = this.props.location.data.count;
      this.setState({
        therapists, count, perPage,
         });
    }*/
         
  }
  
  handleClick(event) {
/*  document.getElementById(this.state.perPage).className = 'pagination-link';
  let perPage=((event.target.id-1)*3+1); */
  document.getElementById(this.state.currentPage).className = 'pagination-link';
  this.setState({
    currentPage: Number(event.target.id),
      });
  this.isCurrent(this.state.currentPage);
      
  }

  async isCurrent(event) {
    let dat=null;
    let url = 'therapist/?';
    var perPage = this.state.perPage;
    if(event==null)
    { console.log(perPage);
      document.getElementById(1).className += ' is-current';
    }
    else if(event!=null)
    { 
      document.getElementById(this.state.currentPage).className = 'pagination-link';
      perPage = event;
      this.state.currentPage = event;
      url += "page="+event+'&';
    }
    // let filters = ['specialties', ''];
    console.log(this.state.filter);
    if('specialties' in this.state.filter)
      url += 'specialties='+JSON.stringify(this.state.filter.specialties)+'&';
    if('availability' in this.state.filter)
      url += 'availability='+JSON.stringify(this.state.filter.availability)+'&';
    if('insurance' in this.state.filter)
      url += 'insurance='+JSON.stringify(this.state.filter.insurance)+'&';
    if('genderFocus' in this.state.filter)
      url += 'genderFocus='+JSON.stringify(this.state.filter.genderFocus)+'&';
    if('ageGroup' in this.state.filter)
      url += 'ageGroup='+JSON.stringify(this.state.filter.ageGroup)+'&';
    if('communities' in this.state.filter)
      url += 'communities='+JSON.stringify(this.state.filter.communities)+'&';
    if('gender' in this.state.filter)
      url += 'gender='+JSON.stringify(this.state.filter.gender)+'&';
    if('title' in this.state.filter)
      url += 'title='+JSON.stringify(this.state.filter.title)+'&';
    if('yearsInPractice' in this.state.filter)
      url += 'yearsInPractice='+JSON.stringify(this.state.filter.yearsInPractice)+'&';
    if('languages' in this.state.filter)
      url += 'languages='+JSON.stringify(this.state.filter.languages)+'&';
    if('min' in this.state.filter)
      url += 'min='+this.state.filter.min+'&';
    if('max' in this.state.filter)
      url += 'max='+this.state.filter.max+'&';

    dat = await get(url);
    
    document.getElementById(this.state.currentPage).className += ' is-current';
    let therapists = dat.data.results;
    let count = dat.data.count;
    

    if(window.total_therapist == undefined) {
      window.total_therapist = count;
    }
    let total = window.total_therapist;

      this.setState({
        therapists, count, perPage, total 
         });

}

    render() {
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
     /* const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = pages.slice(indexOfFirstTodo, indexOfLastTodo);*/
      const currentTodos = pages;


      const renderTodos = currentTodos.map((page, i) => {
        console.log(currentPage);

        if((page == totalPages || (page >= currentPage -1 && page <= currentPage + 1)) || (currentPage == totalPages && page == 1)) {
          return <li key={i}>
                  <a name={"therapist/?page="+page} id={page} className={'pagination-link'} onClick={()=>this.isCurrent(page)} aria-label={"Page "+page} aria-current="page">{page}</a>
                </li> 
        }
        else if((currentPage + 2 == page && page < totalPages ) || (currentPage == totalPages && page - 1 == 1)) {
          return <li key={i}>
                  <a className={'pagination-link'} aria-current="page">...</a>
                </li> 
        } 
        
      });
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(pages.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      

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
                <input className="input" type="text" placeholder="Look for a specific therapist" />
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
                <Link to="/specialties" className="button is-outlined" >
                  Specialties
                </Link>
                <Link to="/clientFocus" className="button is-outlined">
                  Client Focus
                </Link>
                <Link to="/background" className="button is-outlined">
                  Background
                </Link>
                <Link to="/insurance" className="button is-outlined">
                  Insurance
                </Link>
                <Link to="/availability" className="button is-outlined">
                  Availability
                </Link>
                <Link to="/rates" className="button is-outlined">
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
                    <p>Want more filters? <a href="feedbackForm.html">Let us know</a></p>
                  </div> 
                </div>
              </nav>
            </div>
            <p style={{textAlign:"left"}}>1-9 of {this.state.count}+ Therapists</p>
            <div className="columns is-multiline">
              {this.state.therapists.map(function(therapist, i){
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
                                  <div className="therapist-title">{therapist.title}</div>
                                  <h4 className="title is-4">{therapist.first_name+" "+therapist.last_name}</h4>
                                  <small><strong>{therapist.cost_per_session}</strong>/session</small>
                                </div>
                              </div>
                            </article>
                          </Link>
                        </div>
              })}
           </div>
              
              <nav className={"pagination is-rounded is-centered"} role="navigation" aria-label="pagination">
              <a className={isLeft}><span className="icon"><i className="fas fa-chevron-left" id={currentPage-1} onClick={this.handleClick}/></span></a>
              <ul className="pagination-list">
             {renderTodos}
              </ul>

              <a className={isRight}><span className="icon"><i className="fas fa-chevron-right" id={currentPage+1} onClick={this.handleClick}/></span></a>
            </nav>
          </div>
        </section>
      </div>
    
            
        )
    }
}

      
