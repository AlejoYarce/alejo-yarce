/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)

const { getDocument } = require('./lib/firebase')

exports.handler = async (event) => {
  const { queryStringParameters: { query } } = event

  try {
    const year = dayjs().format('YYYY')
    const snapshot = await getDocument('garden-health', year)

    const nowDate = snapshot.now.date.toDate() || new Date()
    snapshot.now.date = dayjs(nowDate).format('MMMM DD @ HH:mm:ss A')
    snapshot.now.dateFrom = dayjs(nowDate).fromNow()

    let { now } = snapshot

    if (query === 'all') {
      // const month = dayjs().format('MM')

      const all = {}
      Object.keys(snapshot).forEach(item => {
        if (!isNaN(item)) {
          all[item] = snapshot[item].map(monthItem => {
            const nowDateItem = monthItem.date.toDate()
            return {
              ...monthItem,
              date: dayjs(nowDateItem).format('MMMM DD @ HH:mm:ss A'),
              dateFrom: dayjs(nowDateItem).fromNow(),
            }
          })
        }
      })

      now = {
        ...snapshot,
        ...all,
      }
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
