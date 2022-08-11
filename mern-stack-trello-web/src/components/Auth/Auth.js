import React from 'react'
import { useLocation , Link } from 'react-router-dom'
import './Auth.scss'
import authSignUpBg from 'resources/images/auth-sign-up-bg.webp'
import authSignInBg from 'resources/images/auth-sign-in-bg.png'
import SignIn from 'components/Auth/SignIn/SignIn'
import SignUp from 'components/Auth/SignUp/SignUp'
function Auth() {
  const location = useLocation();
  const signUpMode = location.pathname === '/signup'
  return (
    <div className={`auth__container ${signUpMode ? 'sign-up-mode':''} `} >
      <div className="auth__container__forms">
        <div className="auth__form-area">
          <SignIn/>
          <SignUp/>
        </div>
      </div>
      <div className="auth__container__panels">
        <div className="panel panel__left">
          <div className="panel__content">
            <h3 className="panel__title">New here ?</h3>
            <p className="panel__paragraph">
              Enter your personal details and start journey with us
            </p>
            <Link to={'/signup'}>
              <button className="auth__btn auth__btn-transparent" id="sign-up-btn">
                Sign Up
              </button>
            </Link>
          </div>
          <img className="panel__image" src={authSignUpBg} alt="" />
        </div>
        <div className="panel panel__right">
          <div className="panel__content">
            <h3 className="panel__title">One of us ?</h3>
            <p className="panel__paragraph">
              To keep connected with us please login with your personal info
            </p>
            <Link to={'/signin'}>
              <button className="auth__btn auth__btn-transparent" id="sign-in-btn">
                Sign In
              </button>
            </Link>
          </div>
          <img className="panel__image" src={authSignInBg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Auth
