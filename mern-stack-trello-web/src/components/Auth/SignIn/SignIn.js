import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SignIn() {

  let [searchParam] = useSearchParams()
  const successEmail = searchParam.get('successEmail')
  const verifiedEmail = searchParam.get('verifiedEmail')

  return (
    <form className="auth__form form__sign-in">
            <h2 className="auth__form__title">Sign In</h2>
            {successEmail && <div className='auth__form_message success'>
              <div>An email has been sent to <strong>{successEmail}</strong></div>
              <div>Please check and verify your account before login!</div>
            </div>}

           {verifiedEmail && <div className='auth__form_message success'>
        <div>Your email <strong>{verifiedEmail}</strong> has been verified.</div>
        <div>Please sign-in to enjoy our services! Thank you!</div>
      </div>}
            <div className="auth__form__input-field">
              <i className="fa fa-envelope"></i>
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className="auth__form__input-field">
              <i className="fa fa-lock"></i>
              <input type="password" name="password" placeholder="Password" required />
            </div>

            <button className="auth__form__submit" type="button">Login</button>
     </form>
  )
}

export default SignIn