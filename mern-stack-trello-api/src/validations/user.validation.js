import Joi from 'joi'
import { HttpStatusCode ,EMAIL_RULE ,PASSWORD_RULE } from '*/utilities/constants'

const createNew = async (req, res, next) => {
  const condition = Joi.object({
     email : Joi.string().required().pattern(EMAIL_RULE).message('Email is invalid'),
     password: Joi.string().required().pattern(PASSWORD_RULE).message('Password is invalid'),
     password_confirmation : Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Password Confirmation is not match',
        'any.required': 'Password Confirmation is required'
     })
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}
 
const verifyAccount = async (req, res, next) => {
  const condition = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).message('Email is invalid'),
    token: Joi.string().required()
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}

export const UserValidation = {
    createNew,
    verifyAccount
}
