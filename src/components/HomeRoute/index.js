import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import HeaderRoute from '../HeaderRoute'

import './index.css'

const HomeRoute = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="HomeRoute-bgContainer">
      <HeaderRoute />
      <h1 className="HomeRoute-heading">Find The Job That Fits Your Life</h1>
      <p className="homeRoute-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="find-jobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  )
}
export default HomeRoute
