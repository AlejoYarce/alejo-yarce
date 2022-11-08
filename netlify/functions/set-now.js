/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')
const { firestore } = require('firebase-admin')
const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY)

const { updateDocument } = require('./lib/firebase')

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}')
  const {
    plantName,
    plantValue,
    ip,
  } = body

  const formattedValue = plantValue ? parseFloat(plantValue) : 0

  try {
    const data = {
      [plantName]: formattedValue,
      date: new Date(),
    }
    const year = dayjs().format('YYYY')
    const month = dayjs().format('MM')

    await updateDocument(
      'garden-health',
      year,
      {
        now: data,
        [month]: firestore.FieldValue.arrayUnion(data),
        ip,
      },
    )

    if (formattedValue <= 35) {
      const params = {
        'originator': process.env.MESSAGEBIRD_NUMBER,
        'recipients': [process.env.MESSAGEBIRD_NUMBER],
        'body': 'Holi, necesito agüita',
      }
      await messagebird.messages.create(params, (err) => {
        if (err) {
          return console.log('error', err)
        }
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: true }),
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message, status: false }),
    }
  }
}
