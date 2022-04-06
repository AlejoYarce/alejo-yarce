import dayjs from 'dayjs'
import { getDocument } from '~app/lib/firebase/api'
import { COLLECTIONS, IDS } from '~app/utils/constants'
import { IotDataProps } from '~app/utils/types'

const handler = async (req, res) => {
  try {
    const year = dayjs().format('YYYY')
    const month = dayjs().format('MM')

    const snapshot = await getDocument(COLLECTIONS.GARDEN_HEALTH, IDS.HOME) as IotDataProps
    snapshot.now.lastUpdate = snapshot.now.date.toDate()
    delete snapshot.now.date

    const now = {
      ...snapshot,
      [year]: {
        [month]: snapshot[year] && snapshot[year] && snapshot[year][month].map(item => {
          const data = {
            ...item,
            lastUpdate: item.date.toDate(),
          }
          delete data.date

          return data
        }),
      },
    }

    return res.status(200).json({ ...now, status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
