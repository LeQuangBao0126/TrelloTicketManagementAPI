import { UserModel } from '*/models/user.model'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { pick } from 'lodash' // pick những key value cần thiết by key
import {SendInBlueProvider}   from '*/providers/SendInBlue.Provider'
import { WEBSITE_DOMAIN } from '*/utilities/constants'
import { exist } from 'joi'

const createNew = async (data) => {
  try {
    const existUser = await UserModel.findOneByAny('email', data.email)
    if (existUser){
        throw new Error('Email already exist.')
    }
    
    // Tạo data để lưu vào db 
    const username = data.email.split("@")[0] || ''
    const user = {
        email : data.email,
        password : bcryptjs.hashSync(data.password , 3),
        username : username ,
        displayName : username,
        verifyToken : uuidv4()
    }
    const createdUser = await UserModel.createNew(user)
    const getUser = await UserModel.findOneByAny("_id", createdUser.insertedId.toString())

    //Send email 
    const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${getUser.email}&token=${getUser.verifyToken}` 
    const subject = 'Trello Clone App: Please verify your email before using our services!'
    const htmlContent = `
      <h3>Here is your verification link:</h3>
      <h3>${verificationLink}</h3>
      <h3>Sincerely,<br/> - Trungquandev Official - </h3>
    `
    await SendInBlueProvider.sendEMail(getUser.email,subject,htmlContent)

    // pick những key value cần thiết by key
    return pick(getUser,['_id','email','username','displayName'])
  } catch (error) {
    // console.log(error)
    throw new Error(error)
  }
}

const verifyAccount = async (data)=>{
    try{
        const existUser = await UserModel.findOneByAny('email', data.email)
         
        if (!existUser){
            throw new Error('Email not found .')
        }

        if(existUser.isActive){
            throw new Error('Your account is already actived .')
        }

        if(data.token !== existUser.verifyToken ){
            throw new Error('Token is invalid')
        }

        const updatedUser = await UserModel.update(existUser._id.toString() , {
            verifyToken : null ,
            isActive : true 
        })

        return pick(updatedUser,['_id','email','username','displayName'])
    }catch(error){
        throw new Error(error)
    }
}

export const UserService = {
    createNew ,
    verifyAccount
}
