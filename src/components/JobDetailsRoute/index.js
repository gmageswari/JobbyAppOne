import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../HeaderRoute'
import './index.css'

const jobDetailsRouteApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailsRoute extends Component {
  state = {
    eachJobFullDetails: {},
    similarJobs: [],
    jobDetailsApiStatus: jobDetailsRouteApiStatus.initial,
  }

  componentDidMount() {
    this.getEachJobFullDetails()
  }

  getUpdatedData = fetchedData => {
    const jobDetails = {
      companyLogoUrl: fetchedData.job_details.company_logo_url,
      companyWebsiteUrl: fetchedData.job_details.company_website_url,
      employmentType: fetchedData.job_details.employment_type,
      id: fetchedData.job_details.id,
      jobDescription: fetchedData.job_details.job_description,
      lifeAtCompany: {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      },
      location: fetchedData.job_details.location,
      packagePerAnnum: fetchedData.job_details.package_per_annum,
      rating: fetchedData.job_details.rating,
      skills: fetchedData.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      })),
      title: fetchedData.job_details.title,
    }
    const similarJobsList = fetchedData.similar_jobs.map(eachSimilarJob => ({
      companyLogoUrl: eachSimilarJob.company_logo_url,
      employmentType: eachSimilarJob.employment_type,
      id: eachSimilarJob.id,
      jobDescription: eachSimilarJob.job_description,
      location: eachSimilarJob.location,
      rating: eachSimilarJob.rating,
      title: eachSimilarJob.title,
    }))
    this.setState({
      eachJobFullDetails: jobDetails,
      similarJobs: similarJobsList,
      jobDetailsApiStatus: jobDetailsRouteApiStatus.success,
    })
  }

  getEachJobFullDetails = async () => {
    this.setState({jobDetailsApiStatus: jobDetailsRouteApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.getUpdatedData(data)
    }
  }

  render() {
    const {eachJobFullDetails, jobDetailsApiStatus} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
    } = eachJobFullDetails

    return (
      <>
        <Header />
        {jobDetailsApiStatus === jobDetailsRouteApiStatus.success ? (
          <div className="JobDetailsRoute-bgContainer">
            <div className="JobDetailsRoute-eachJobDetails">
              <div className="JobsDetailsRoute-logo-type-rating-div">
                <img
                  src={companyLogoUrl}
                  alt=" job details company logo"
                  className="JobsDetailsRoute-company-logo"
                />
                <div className="JobsDetailsRoute-type-rating-div">
                  <h1 className="JobsDetailsRoute-type-style">{title}</h1>
                  <div className="JobsDetailsRoute-rating-div">
                    <AiFillStar className="JobsDetailsRoute-star-style" />
                    <p className="JobsDetailsRoute-rating-style">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="JobsDetailsRoute-location-type-lpa-div">
                <div className="JobsDetailsRoute-location-type-div">
                  <div className="JobsDetailsRoute-location-div">
                    <MdLocationOn className="JobsDetailsRoute-location-icon-style" />
                    <p className="JobsDetailsRoute-location-style">
                      {location}
                    </p>
                  </div>
                  <div className="JobsDetailsRoute-location-div">
                    <BsBriefcaseFill className="JobsDetailsRoute-location-icon-style" />
                    <p className="JobsDetailsRoute-location-style">
                      {employmentType}
                    </p>
                  </div>
                </div>
                <div className="JobsDetailsRoute-lpa-div">
                  <p className="JobsDetailsRoute-type-style">
                    {packagePerAnnum}
                  </p>
                </div>
              </div>
              <hr />
              <div className="JobsDetailsRoute-description-visit-div">
                <p className="JobsDetailsRoute-description-style">
                  Description
                </p>
                <div className="JobsDetailsRoute-visit-div">
                  <button type="button" className="visit-button-style">
                    <a href={companyWebsiteUrl} className="visit-icon-div">
                      <p className="JobsDetailsRoute-visit-style">Visit</p>
                      <BiLinkExternal className="link-style" />
                    </a>
                  </button>
                </div>
              </div>
              <p className="JobsDetailsRoute-job-description-style">
                {jobDescription}
              </p>
              <p className="JobsDetailsRoute-description-style margin-class">
                Skills
              </p>
              <ul className="JobsDetailsRoute-skill-div">
                {skills.map(eachSkill => (
                  <li className="JobsDetailsRoute-each-skill-div">
                    <img
                      src={eachSkill.imageUrl}
                      alt={eachSkill.name}
                      className="each-skill-image"
                    />
                    <p className="JobsDetailsRoute-skill-name-style">
                      {eachSkill.name}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="JobsDetailsRoute-description-style margin-class">
                Life at Company
              </p>
              <div className="JobsDetailsRoute-lac-div">
                <p className="JobsDetailsRoute-lac-description-style">
                  {lifeAtCompany.description}
                </p>
                <img
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                  className="lac-image"
                />
              </div>
              <p className="JobsDetailsRoute-similar-job-style margin-class">
                Similar Jobs
              </p>
            </div>
          </div>
        ) : null}
      </>
    )
  }
}

export default JobDetailsRoute
