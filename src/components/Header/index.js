import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nv">
      <div className="web-lg">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/djbivakqj/image/upload/v1713704425/image_28_Traced_2_pnlehr.png"
            alt="website logo"
            className="img-logo"
          />
        </Link>
        <h1>
          NXT <span className="sp">Assess</span>
        </h1>
      </div>
      <button className="btn-LogOut" type="button" onClick={onLogOut}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
