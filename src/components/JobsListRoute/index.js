import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsListRoute = props => {
  const {eachJob} = props
  const {
    CompanyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = eachJob
  return (
    <Link to={`/jobs/${id}`} className="jobs-link-style">
      <li className="job-container">
        <div className="logo-name-container">
          <img
            src={CompanyLogoUrl}
            alt="company logo"
            className="company-log-style"
          />
          <div className="type-rating-container">
            <h1 className="title-type-style">{title}</h1>
            <div className="rating-style">
              <AiFillStar className="star-style" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-lpa-container">
          <div className="location-type-container">
            <div className="location-container">
              <MdLocationOn className="location-icon-style" />
              <p className="location-style">{location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill className="location-icon-style" />
              <p className="location-style">{employmentType}</p>
            </div>
          </div>
          <div className="lpa-container">
            <p className="package-style">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <p className="description-heading">Description</p>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobsListRoute
