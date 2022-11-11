/* eslint-disable @typescript-eslint/no-var-requires */
// const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY)
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns')

const snsClient = new SNSClient({
  credentials: {
    accessKeyId: process.env.AWS__ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS__SECRET_ACCESS_KEY,
  },
  region: process.env.AWS__REGION,
})

const sendSms = async (message) => {
  try {
    const params = {
      // originator: process.env.SMS_NUMBER,
      // recipients: [process.env.SMS_NUMBER],
      // body: message,
      PhoneNumber: process.env.SMS_NUMBER,
      Message: message,
    }
    console.log({ params })

    // await messagebird.messages.create(params, (err, response) => {
    //   if (err) {
    //     return console.log('error', err)
    //   }

    //   console.log('response', response)
    // })
    const data = await snsClient.send(new PublishCommand(params))

    console.log('Success.', data)
    return data
  } catch (err) {
    console.log('Error', err.stack)
  }
}

module.exports = {
  sendSms,
}
