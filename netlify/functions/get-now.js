/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')

const { getDocument } = require('./lib/firebase')

exports.handler = async () => {
  try {
    const snapshot = await getDocument('garden-health', 'home')
    snapshot.now.lastUpdate = snapshot.now.date.toDate()
    delete snapshot.now.date

    const year = dayjs().format('YYYY')
    const month = dayjs().format('MM')

    const now = {
      ...snapshot,
      [year]: {
        [month]: snapshot[year] && snapshot[year] && snapshot[year][month] && snapshot[year][month]
          .map(item => {
            const data = {
              ...item,
              lastUpdate: item.date.toDate(),
            }
            delete data.date

            return data
          }),
      },
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ...now, status: true }),
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message, status: false }),
    }
  }
}
