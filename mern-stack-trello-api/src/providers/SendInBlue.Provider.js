// Đọc hướng dẫn chơi :
// https://levelup.gitconnected.com/how-to-send-emails-from-node-js-with-sendinblue-c4caacb68f31
import SibApiV3Sdk from 'sib-api-v3-sdk'
import { env } from '*/config/environtment'

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']

apiKey.apiKey = env.SENDINBLUE_API_KEY

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()
const adminSender = {
   email: 'nhoctengi6789@gmail.com',
   name: 'baobadao'
}

const sendEMail = async (toEmail, subject, htmlContent) => {
   try {
      const receivers = [
         { email: toEmail }
      ]
      const mailOptions = {
         sender: adminSender,
         to: receivers,
         subject,
         htmlContent
      }
      console.log(mailOptions)
      //hàm gửi mail trả về Promise để ở ngoài nhận
      return tranEmailApi.sendTransacEmail(mailOptions)

   } catch (error) {
      throw new Error(error)
   }
}

export const SendInBlueProvider = {
   sendEMail
}