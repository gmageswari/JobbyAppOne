import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const HeaderRoute = props => {
  const logoutClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="HeaderRoute-bgContainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="HeaderRouteLogo"
        />
      </Link>

      <div className="HeaderRoute-tabs">
        <AiFillHome className="iconStyle" />
        <Link to="/jobs">
          <BsFillBriefcaseFill className="iconStyle" />
        </Link>

        <FiLogOut className="iconStyle" onClick={logoutClicked} />
      </div>
      <div className="HeaderTabForLg">
        <ul className="HeaderRoute-home-job-div">
          <Link to="/" className="jobs-link-style">
            <li className="HeaderRoute-link">Home</li>
          </Link>
          <Link to="/jobs" className="jobs-link-style">
            <li className="HeaderRoute-link">Jobs</li>
          </Link>

          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={logoutClicked}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(HeaderRoute)
