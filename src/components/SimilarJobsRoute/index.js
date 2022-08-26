import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsRoute = props => {
  const {eachSimilarJob, jobDetailsFetch} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob

  const getThisJobDetails = event => {
    window.scrollTo(0, 0)
    jobDetailsFetch(event.target.id)
  }

  return (
    <li className="SimilarJobsRoute-div" key={id}>
      <div className="SimilarJobsRoute-logo-title-rating-div">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="SimilarJobsRoute-logo-style"
        />
        <div className="SimilarJobsRoute-title-rating-div">
          <h1 className="SimilarJobsRoute-title-style">{title}</h1>
          <div className="SimilarJobsRoute-rating-div">
            <AiFillStar className="SimilarJobsRoute-rating-star-style" />
            <p className="SimilarJobsRoute-rating-style">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="SimilarJobsRoute-description-style">Description</h1>
      <p className="SimilarJobsRoute-description">{jobDescription}</p>
      <div className="SimilarJobsRoute-location-type-div">
        <div className="SimilarJobsRoute-location-div">
          <MdLocationOn className="SimilarJobRoute-location-style" />
          <p className="SimilarJobsRoute-location">{location}</p>
        </div>
        <div className="SimilarJobsRoute-location-div">
          <BsBriefcaseFill className="SimilarJobRoute-location-style" />
          <p className="SimilarJobsRoute-location">{employmentType}</p>
        </div>
      </div>
      <Link to={`/jobs/${id}`} className="link-style-now">
        <button
          type="button"
          className="view-more-button"
          id={id}
          onClick={getThisJobDetails}
        >
          View More
        </button>
      </Link>
    </li>
  )
}
export default SimilarJobsRoute
