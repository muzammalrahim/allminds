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
          gendFocus:[],
          ethnicity:[],
          ageGroup:[],
          communitie:[],
          faith:[],
          id:null,
          insurance:[],
          i_also_speak:[],
          gender:[],
          title:[],
          filter: this.props.location.filter ? this.props.location.filter : localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')): [],
          insuranceArray: ["Private pay","Out of network","Out of Network","Out-of-network","ACI Specialty Benefits","APS Healthcare","Aetna","Alliance","AmeriHealth","American Behavioral","Anthem","Beacon","Beech Street","Behavioral Health Systems","Blue Care Network","Blue Cross","Blue Shield","BlueCross and BlueShield","Ceridian","ChoiceCare","Cigna","Great-West Life","Hawaii Medical Services Association","Health Net","Humana","Medicaid","Medicare","Military OneSource","Molina","MultiPlan","Network Health","New Directions","Optum","PHCS","PreferredOne","Premera","TRICARE","TriWest","UMR","UnitedHealthcare"],
          years_in_practice:[],
          genderCheck:'',
          language:'',
          therapistTitle:'',
          practice:'',
          commcheck:'',
          availabilityAbout:['Evening','Weekend'],
          availability:null,
        };
        if(this.props.location.filter){
          for(var filtersss in this.props.location.filter){
            this.state.filter[filtersss] = this.props.location.filter[filtersss];
          }
          localStorage.setItem('filter', JSON.stringify(this.state.filter));
          console.log(localStorage.getItem('filter'),'localllll');
        }
        if(this.props.location.search_filter){
          this.state.search_filter = this.props.location.search_filter;
          localStorage.setItem('search_filter', JSON.stringify(this.state.search_filter));
        }
        if(this.props.location.currentPage){
          this.state.currentPage = this.props.location.currentPage;
          localStorage.setItem('currentPage', JSON.stringify(this.state.currentPage));
        }
      }
    
      async componentDidMount() {
          const id=this.props.match.params.id;
        
        let dat = await get("therapist/"+id+"/");
        let therapist = dat.data;
        let special = therapist.specialties ? therapist.specialties.split(','): [];
        let gendFocus = therapist.specialties ? therapist.specialties.split(','): [];
        let ethnicity = therapist.ethnicity ? therapist.ethnicity.split(','): [];
        let ageGroup = therapist.age ? therapist.age.split(','): [];
        let communitie = therapist.communities ? therapist.communities.split(','): [];
        let faith = therapist.faith ? therapist.faith.split(','): [];
        let insurance = therapist.accepted_insurance_plans ? therapist.accepted_insurance_plans.split(','): ['Private pay'];
        let i_also_speak = therapist.i_also_speak ? therapist.i_also_speak.split(','): [];
        let gender = therapist.gender ? therapist.gender.split(','): [];
        let years_in_practice = therapist.years_in_practice ? therapist.years_in_practice.split(','): [];
        let title = therapist.title ? therapist.title.split(','): [];
        
          this.setState({
            therapist,
            special,
            gendFocus,
            ethnicity,
            ageGroup,
            communitie,
            faith,
            insurance,
            id,
            i_also_speak,
            gender,
            years_in_practice,
            title,
          });
             
    }

    render() {
      console.log(this.state,'gennnnnn');
        const gender = this.state.gender.map((gend, index) => {
          if(gend == 'N/A' || gend == ''){
            this.state.genderCheck='';
            return gend = '';
          }
          var commClass='';
          if(this.state.filter['gender'] && this.state.filter['gender'].some(item => gend === item)){
            commClass='is-light';
          }
          this.state.genderCheck=1;
          return <button key={index} className={"button "+commClass}>
                    {gend}
                </button>
          
        });

        var specArray = [];
        const specialities = this.state.special.map((spec, index) => {
          var specl = '';
          var specClass='';
          if(!specArray.some(item => 'Addiction' === item) && (spec == 'Addiction' || spec == 'Alcohol Abuse' || spec == 'Drug Abuse' || spec == 'Gambling' || spec == 'Internet Addiction' || spec == 'Sexual Addiction' || spec == 'Substance Abuse' || spec == 'Video Game Addiction')){
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
            console.log('Family Issues');
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
          this.state.special=1;
          return <button key={index} className={"button "+specClass}>
                        {specl}
                    </button>
            
        });

        var gendFocArray = [];
        const gendFocus = this.state.gendFocus.map((ethn, index) => {
          var ethnClass='';
          var ethnl = '';
          console.log(ethn,'ethn');
          if(!gendFocArray.some(item => 'Female' === item) && ethn.includes("Women")){
            ethnl = 'Female';
            if(this.state.filter['genderFocus'] && this.state.filter['genderFocus'].some(item => ethnl === item)){
              ethnClass='is-light';
            }
            gendFocArray.push('Female');
          }
          else if(!gendFocArray.some(item => 'Male' === item) && ethn.includes("Men")){
            ethnl = 'Male';
            if(this.state.filter['genderFocus'] && this.state.filter['genderFocus'].some(item => ethnl === item)){
              ethnClass='is-light';
            }
            gendFocArray.push('Male');
          }
          else if(!gendFocArray.some(item => 'Non-binary' === item) && ethn.includes("Non-Binary Allied")){
            ethnl = 'Non-binary';
            if(this.state.filter['genderFocus'] && this.state.filter['genderFocus'].some(item => ethnl === item)){
              ethnClass='is-light';
            }
            gendFocArray.push('Non-binary');
          }
          if(ethnl == ''){
            return null
          }
          this.state.commcheck = 1;
          return <button key={index} className={"button "+ethnClass}>
                      {ethnl}
                  </button>
          
        });

        var ethinicArray = [];
        const ethnicity = this.state.ethnicity.map((ethn, index) => {
          var ethnClass='';
          var ethnl = '';
          if(!ethinicArray.some(item => 'Ethnic minorites' === item) && (ethn.includes("Asian") || ethn.includes("African-American") || ethn.includes('Hispanic, Latino') || ethn.includes('Pacific Islander') || ethn.includes('Other Racial or Ethnic Background') || ethn.includes('Racial Justice Allied') || ethn.includes('Racial Identity'))){
            ethnl = 'Ethnic minorites';
            if(this.state.filter['communities'] && this.state.filter['communities'].some(item => ethnl === item)){
              ethnClass='is-light';
            }
            ethinicArray.push('Ethnic minorites');
          }
          if(ethnl == ''){
            return null
          }
          this.state.commcheck = 1;
          return <button key={index} className={"button "+ethnClass}>
                      {ethnl}
                  </button>
          
        });
        
        var ageGroupArray = [];
        const ageGroup = this.state.ageGroup.map((ethn, index) => {
          var ethnClass='';
          var ethnl = '';
          console.log(ethn,'ethn');
          if(!ageGroupArray.some(item => 'Teens' === item) && (ethn == "Toddlers / Preschoolers" || ethn == "Children" || ethn == "Preteens / Tweens" || ethn == "Adolescents / Teenagers" || ethn == "Child or Adolescent")){
            ethnl = 'Teens';
            if(this.state.filter['ageGroup'] && this.state.filter['ageGroup'].some(item => ethnl === item)){
              ethnClass='is-light';
            }
            ageGroupArray.push('Teens');
          }
          else if(!ageGroupArray.some(item => 'Adults' === item) && ethn.includes("Adults")){
            ethnl = 'Adults';
            if(this.state.filter['ageGroup'] && this.state.filter['ageGroup'].some(item => ethnl === item)){
              ethnClass='is-light';
            }
            ageGroupArray.push('Adults');
          }
          else if(!ageGroupArray.some(item => 'Elders' === item) && ethn.includes("Elders")){
            ethnl = 'Elders';
            if(this.state.filter['ageGroup'] && this.state.filter['ageGroup'].some(item => ethnl === item)){
              ethnClass='is-light';
            }
            ageGroupArray.push('Elders');
          }
          if(ethnl == ''){
            return null
          }
          this.state.commcheck = 1;
          return <button key={index} className={"button "+ethnClass}>
                      {ethnl}
                  </button>
          
        });

        var commArray = [];
        const communities = this.state.communitie.map((val, index) => {
          var commClass='';
          var comml = '';
          var comm = val.trim();
          if(!commArray.some(item => 'LGBTQ' === item) && (comm == 'Bisexual Allied' || comm == 'Gay Allied' || comm == 'HIV / AIDS Allied' || comm == 'Intersex Allied' || comm == 'Lesbian Allied' || comm == 'Transgender Allied' || comm == 'Non-Binary Allied' || comm == 'Queer Allied')){
            comml = 'LGBTQ';
            if(this.state.filter['communities'] && this.state.filter['communities'].some(item => comml === item)){
              commClass='is-light';
            }
            commArray.push('LGBTQ');
          }
					else if(!commArray.some(item => 'Veterans' === item) && (comm == 'Veterans')){
            comml = 'Veterans';
            if(this.state.filter['communities'] && this.state.filter['communities'].some(item => comml === item)){
              commClass='is-light';
            }
            commArray.push('Veterans');
          }
          else if(!commArray.some(item => 'Cancer survivors' === item) && (comm == 'Cancer')){
            comml = 'Cancer survivors';
            if(this.state.filter['communities'] && this.state.filter['communities'].some(item => comml === item)){
              commClass='is-light';
            }
            commArray.push('Cancer survivors');
          }
          if(comml == ''){
            return null
          }
          this.state.commcheck = 1;
          return <button key={index} className={"button "+commClass}>
                      {comml}
                  </button>
          
        });

        var faithArray = [];
        const faith = this.state.faith.map((val, index) => {
          var commClass='';
          var fal = '';
          var val = val.trim();
          // console.log(val,'val');
          if(!faithArray.some(item => 'Religious / Spiritual' === item) && (val == 'Spirituality' || val == 'Buddhist' || val == 'Hindu' || val == 'Islam' || val == 'Jewish' || val == 'Mormon' || val == 'Other Spiritual or Religious Affiliations')){
            fal = 'Religious / Spiritual';
            // console.log(this.state.filter['communities'],'ahvgsdjashdjnabsdj');
            if(this.state.filter['communities'] && this.state.filter['communities'].some(item => fal === item)){
              commClass='is-light';
            }
            faithArray.push('Religious / Spiritual');
          }
          if(fal == ''){
            return null
          }
          this.state.commcheck = 1;
          return <button key={index} className={"button "+commClass}>
                      {fal}
                  </button>
          
        });

        const insurance = this.state.insurance.map((insur, index) => {
          console.log(this.state.insurance,'insur');
          if(insur == 'N/A' || insur == ''){
            insur = 'Private pay';
            return <button key={index} className={"button "}>
                    {insur}
                  </button>
          }
          else if(insur == 'Out of Network'){
            var commClass='';
            if(this.state.filter['insurance'] && this.state.filter['insurance'].some(item => 'Out-of-network' === item)){
              commClass='is-light';
            }
            return <button key={index} className={"button "+commClass}>
                    {insur}
                  </button>
          }
          else if(this.state.insuranceArray.some(item => insur === item)){
            var commClass='';
            if(this.state.filter['insurance'] && this.state.filter['insurance'].some(item => insur === item)){
              commClass='is-light';
            }
            return <button key={index} className={"button "+commClass}>
                    {insur}
                  </button>
          }
          return null
          
        });

        const language = this.state.i_also_speak.map((lang, index) => {
          lang = lang.trim();
          if(lang == 'N/A' || lang == ''){
            this.state.language='';
            return lang = '';
          }
          var commClass='';
          if(this.state.filter['languages'] && this.state.filter['languages'].some(item => lang === item)){
            commClass='is-light';
          }
          this.state.language=1;
          return <button key={index} className={"button "+commClass}>
                  {lang}
                </button>
          
        });

        const practice = this.state.years_in_practice.map((prac, index) => {
          prac = prac.trim();
          if(prac == 'N/A' || prac == ''){
            this.state.practice='';
            return prac = '';
          }
          this.state.practice=1;
          return <button key={index} className={this.state.filter['yearsInPractice'] && this.state.filter['yearsInPractice'].length>0 ? "button is-light" : "button"} >
                  {prac}
                </button>
        });
          
        const availability = this.state.availabilityAbout.map((avail, index) => {
          if(this.state.therapist.about && (this.state.therapist.about.includes(avail) || this.state.therapist.about.includes(avail.toLowerCase()))){
            var commClass = '';
            console.log(avail.toLowerCase(),'avail');
            avail = avail+'s';
            if(this.state.filter['availability'] && this.state.filter['availability'].some(item => avail === item)){
              commClass = "is-light";
            } 
            this.state.availability=1;
            return  <button key={index} className={"button "+commClass}>
                      {avail}
                    </button>

          }
          else{
            return null;
          }
        });
          
        const Title = this.state.title.map((title, index) => {
          var therapistTitle = title.trim();
          this.state.therapistTitle='';
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
          this.state.therapistTitle=1;
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
            <div className="columns">
              <div className="column is-half">
                <article className="media">
                  <div className="media-content">
                    <div className="content">       
                      <h1 className="title is-3">Hi, I'm {this.state.therapist.first_name}</h1>
                      {this.state.therapistTitle}
                      <br />
                      <strong>{this.state.therapist.cost_per_session}</strong> / session
                      
                    </div>
                  </div>
                  <div className="media-right has-text-centered">
                    <figure className="image is-128x128">
                      <img src={this.state.therapist.profile_image_url} alt=''/>
                    </figure>
                  </div>
                </article>
                <br />
                <Link to={{ pathname: "/contactForm/"+this.state.id, filter: this.state.filter, search_filter: this.state.search_filter, currentPage: this.state.currentPage }} className="button is-primary is-medium is-fullwidth">
                  Message me
                </Link>
              </div>
            </div>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <h5 className="title is-5">About</h5>
                <p>{this.state.therapist.about}</p>
              </div>
              <hr className="is-hidden-tablet" />
              <div className="column is-half">
                {this.state.special == 1 ? < div className="therapist-tags">
                <h5 className="title is-5">Specialties</h5>
                <div className="buttons therapist-tags">
                  {specialities}
                </div></div> :null }
                
                {this.state.commcheck != '' ? <div className="therapist-tags"><h5 className="title is-5">Client Focus</h5>
                <div className="buttons therapist-tags">
                  {gendFocus}
                  {ethnicity}
                  {ageGroup}
                  {communities}
                  {faith}
                 </div></div> : null}
                 {(this.state.language) || (this.state.genderCheck) || (this.state.therapistTitle) || (this.state.practice) ? <div className="therapist-tags"><h5 className="title is-5">Background</h5>
                <div className="buttons therapist-tags">
                    {gender}
                    {Title}
                    {practice}
                    {language}
                </div></div> : null}
                {insurance ? <div className="therapist-tags"><h5 className="title is-5">Insurance</h5>
                <div className="buttons therapist-tags">
                  {insurance}
                </div></div> : null}
                {this.state.availability ? <div className="therapist-tags"><h5 className="title is-5">Availability</h5>
                <div className="buttons therapist-tags">
                  {availability}
                </div></div> : null}
              </div>
            </div>
          </div>
        </section> 
      </div>

)
}
}