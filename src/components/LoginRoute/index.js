import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  credentialValid = validData => {
    const {history} = this.props
    const jwtToken = validData.jwt_token
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  credentialInvalid = errorMsge => {
    this.setState({errorMsg: errorMsge})
  }

  credentialCheck = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const validData = await response.json()
      this.credentialValid(validData)
    } else {
      const invalidData = await response.json()
      const errorMsg = invalidData.error_msg
      this.credentialInvalid(errorMsg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg} = this.state

    return (
      <div className="LoginRoute-bg-container">
        <form
          className="LoginRoute-login-form-container"
          onSubmit={this.credentialCheck}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="LoginRoute-website-logo"
          />
          <label className="LoginRoute-label" htmlFor="userId">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Username"
            className="LoginRoute-inputBox"
            onChange={this.updateUsername}
            value={username}
          />
          <label className="LoginRoute-label" htmlFor="passwordId">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="Password"
            className="LoginRoute-inputBox"
            onChange={this.updatePassword}
            value={password}
          />
          <button type="submit" className="LoginRoute-login-btn">
            Login
          </button>
          {errorMsg !== '' ? (
            <p className="errorMsgStyle">*{errorMsg}</p>
          ) : null}
        </form>
      </div>
    )
  }
}
export default LoginRoute
