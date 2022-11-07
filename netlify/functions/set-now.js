/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')
const { firestore } = require('firebase-admin')

const { updateDocument } = require('./lib/firebase')

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}')
  const {
    plantName,
    plantValue,
    ip,
  } = body

  try {
    const data = {
      [plantName]: plantValue ? parseFloat(plantValue) : 0,
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
