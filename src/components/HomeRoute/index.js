import Cookies from 'js-cookie'
import HeaderRoute from '../HeaderRoute'

import './index.css'

const HomeRoute = props => {
  const findJobsClicked = () => {
    const {history} = props
    if (Cookies.get('jwt_token') !== undefined) {
      history.push('/jobs')
    } else {
      history.replace('/login')
    }
  }

  return (
    <div className="HomeRoute-bgContainer">
      <HeaderRoute />
      <h1 className="HomeRoute-heading">Find The Job That Fits Your Life</h1>
      <p className="homeRoute-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <button type="button" className="find-jobs-btn" onClick={findJobsClicked}>
        Find Jobs
      </button>
    </div>
  )
}
export default HomeRoute
