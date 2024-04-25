import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showPass: false, Error1: ''}

  onUser = event => {
    this.setState({username: event.target.value})
  }

  onPass = event => {
    this.setState({password: event.target.value})
  }

  onCheck = () => {
    const {showPass} = this.state
    this.setState({showPass: !showPass})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onFailure = err => {
    this.setState({Error1: err})
  }

  onSubFnc = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {showPass, username, password, Error1} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-login">
        <div className="container">
          <div className="img-div">
            <img
              src="https://res.cloudinary.com/djbivakqj/image/upload/v1713609365/image_28_Traced_1_ye7ni2.png"
              alt="login website logo"
            />
            <h1>
              NXT <span className="sp">Assess</span>
            </h1>
          </div>
          <form className="fm" onSubmit={this.onSubFnc}>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="inp"
              value={username}
              onChange={this.onUser}
            />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              id="password"
              type={showPass === true ? 'text' : 'password'}
              placeholder="Password"
              className="inp"
              value={password}
              onChange={this.onPass}
            />
            <br />
            <div className="ckk">
              <input
                type="checkbox"
                id="showPass"
                className="ck"
                onClick={this.onCheck}
              />
              <label htmlFor="showPass" className="lb">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="err">{Error1}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
