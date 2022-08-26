import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../HeaderRoute'
import Profile from '../Profile'
import JobsListRoute from '../JobsListRoute'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jobSearchStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobRoute extends Component {
  state = {
    profileDetails: {},
    apiStatusNow: apiStatus.initial,
    searchInputValue: '',
    employmentType: [],
    minimumPackage: '',
    jobSearchStatusNow: jobSearchStatus.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getSearchResults()
  }

  profileFetchSuccess = updatedProfileDetails => {
    this.setState({
      profileDetails: updatedProfileDetails,
      apiStatusNow: apiStatus.success,
    })
  }

  profileFetchFailed = () => {
    this.setState({apiStatusNow: apiStatus.failure})
  }

  jobSearchFailed = () => {
    this.setState({jobSearchStatusNow: jobSearchStatus.failure})
  }

  getProfileDetails = async () => {
    this.setState({apiStatusNow: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const profileData = await response.json()
      const profileDetailsFetched = profileData.profile_details
      const updatedProfileDetails = {
        profileImageUrl: profileDetailsFetched.profile_image_url,
        name: profileDetailsFetched.name,
        shortBio: profileDetailsFetched.short_bio,
      }

      this.profileFetchSuccess(updatedProfileDetails)
    } else {
      this.profileFetchFailed()
    }
  }

  jobSearchSuccess = fetchedData => {
    const {jobs} = fetchedData
    const jobsList = jobs.map(eachJob => ({
      CompanyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({jobsList, jobSearchStatusNow: jobSearchStatus.success})
  }

  getSearchResults = async () => {
    this.setState({jobSearchStatusNow: jobSearchStatus.inProgress})
    const {employmentType, minimumPackage, searchInputValue} = this.state
    const employParam = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employParam}&minimum_package=${minimumPackage}&search=${searchInputValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.jobSearchSuccess(data)
    } else {
      this.jobSearchFailed()
    }
  }

  searchClicked = () => {
    this.getSearchResults()
  }

  updateSearch = event => {
    this.setState({searchInputValue: event.target.value})
  }

  updateEmploymentType = event => {
    const {employmentType} = this.state
    if (employmentType.includes(event.target.value) === true) {
      const employType = employmentType.filter(
        eachEmploy => eachEmploy !== event.target.value,
      )
      this.setState({employmentType: employType}, this.getSearchResults)
    } else {
      const employType = [...employmentType, event.target.value]
      this.setState({employmentType: employType}, this.getSearchResults)
    }
  }

  updateMinimumPackage = event => {
    this.setState({minimumPackage: event.target.value}, this.getSearchResults)
  }

  jobSearchFailureView = () => (
    <div className="jobFailureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=" failure view"
        className="failureViewStyle"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-heading failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-retry-btn"
        onClick={this.getSearchResults}
      >
        Retry
      </button>
    </div>
  )

  noJobsView = () => (
    <div className="noJobContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="noJobImgstyle"
      />
      <h1 className="noJobsheading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  jobSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.noJobsView()
    }
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobsListRoute key={eachJob.id} eachJob={eachJob} />
        ))}
      </ul>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {
      profileDetails,
      apiStatusNow,
      searchInputValue,
      jobSearchStatusNow,
    } = this.state

    return (
      <>
        <Header />
        <div className="JobRoute-bgContainer">
          <div className="profile-to-list-lg">
            {apiStatusNow === apiStatus.success ? (
              <Profile profileDetails={profileDetails} />
            ) : null}
            {apiStatusNow === apiStatus.failure ? (
              <div className="JobRoute-failureContainer">
                <button
                  type="button"
                  className="retry-btn"
                  onClick={this.getProfileDetails}
                >
                  Retry
                </button>
              </div>
            ) : null}

            <div className="JobRouteListContainer">
              <hr />
              <h1 className="JobRoute-list-heading">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachType => (
                  <li key={eachType.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={eachType.employmentTypeId}
                      className="checkbox-style"
                      value={eachType.employmentTypeId}
                      onChange={this.updateEmploymentType}
                    />
                    <label
                      htmlFor={eachType.employmentTypeId}
                      className="type-label-style"
                    >
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr />
              <h1 className="JobRoute-list-heading">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachSalary => (
                  <li key={eachSalary.salaryRangeId}>
                    <input
                      type="radio"
                      id={eachSalary.salaryRangeId}
                      className="checkbox-style"
                      name="lpa"
                      value={eachSalary.salaryRangeId}
                      onChange={this.updateMinimumPackage}
                    />
                    <label
                      htmlFor={eachSalary.salaryRangeId}
                      className="type-label-style"
                    >
                      {eachSalary.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rightContainer-lg">
            <div className="JobRouteSearchDiv-lg">
              <input
                type="search"
                placeholder="Search"
                className="JobRouteSearch"
                onChange={this.updateSearch}
                value={searchInputValue}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button"
              >
                <AiOutlineSearch
                  className="search-icons"
                  onClick={this.searchClicked}
                />
              </button>
            </div>
            {jobSearchStatusNow === jobSearchStatus.inProgress ? (
              <div className="loader-container" testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : null}
            {jobSearchStatusNow === jobSearchStatus.failure
              ? this.jobSearchFailureView()
              : null}
            {jobSearchStatusNow === jobSearchStatus.success
              ? this.jobSuccessView()
              : null}
          </div>

          <div className="JobRoute-sm">
            <div className="JobRouteSearchDiv-sm">
              <input
                type="search"
                placeholder="Search"
                className="JobRouteSearch"
                onChange={this.updateSearch}
                value={searchInputValue}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button"
              >
                <AiOutlineSearch
                  className="search-icons"
                  onClick={this.searchClicked}
                />
              </button>
            </div>

            <div className="profile-to-list-sm">
              {apiStatusNow === apiStatus.inProgress ? (
                <div className="loader-container" testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : null}
              {apiStatusNow === apiStatus.success ? (
                <Profile profileDetails={profileDetails} />
              ) : null}
              {apiStatusNow === apiStatus.failure ? (
                <div className="JobRoute-failureContainer">
                  <button
                    type="button"
                    className="retry-btn"
                    onClick={this.getProfileDetails}
                  >
                    Retry
                  </button>
                </div>
              ) : null}

              <div className="JobRouteListContainer">
                <hr />
                <h1 className="JobRoute-list-heading">Type of Employment</h1>
                <ul>
                  {employmentTypesList.map(eachType => (
                    <li key={eachType.employmentTypeId}>
                      <input
                        type="checkbox"
                        id={eachType.employmentTypeId}
                        className="checkbox-style"
                        value={eachType.employmentTypeId}
                        onChange={this.updateEmploymentType}
                      />
                      <label
                        htmlFor={eachType.employmentTypeId}
                        className="type-label-style"
                      >
                        {eachType.label}
                      </label>
                    </li>
                  ))}
                </ul>
                <hr />
                <h1 className="JobRoute-list-heading">Salary Range</h1>
                <ul>
                  {salaryRangesList.map(eachSalary => (
                    <li key={eachSalary.salaryRangeId}>
                      <input
                        type="radio"
                        id={eachSalary.salaryRangeId}
                        className="checkbox-style"
                        name="lpa"
                        value={eachSalary.salaryRangeId}
                        onChange={this.updateMinimumPackage}
                      />
                      <label
                        htmlFor={eachSalary.salaryRangeId}
                        className="type-label-style"
                      >
                        {eachSalary.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobSearchList-sm">
              {jobSearchStatusNow === jobSearchStatus.inProgress ? (
                <div className="loader-container" testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : null}
              {jobSearchStatusNow === jobSearchStatus.failure
                ? this.jobSearchFailureView()
                : null}
              {jobSearchStatusNow === jobSearchStatus.success
                ? this.jobSuccessView()
                : null}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobRoute
