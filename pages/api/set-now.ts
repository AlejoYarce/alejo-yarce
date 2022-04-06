import dayjs from 'dayjs'
import { arrayUnion } from 'firebase/firestore'

import { updateDocument } from '~app/lib/firebase/api'
import { COLLECTIONS, IDS } from '~app/utils/constants'

const handler = async (req, res) => {
  const { body } = req
  const {
    temp,
    daylight,
    ip,
  } = body

  try {
    const data = {
      temp,
      daylight,
      date: new Date(),
    }

    const year = dayjs().format('YYYY')
    const month = dayjs().format('MM')
    await updateDocument(
      COLLECTIONS.GARDEN_HEALTH,
      IDS.HOME,
      {
        now: data,
        [`${year}.${month}`]: arrayUnion(data),
        ip,
      },
    )

    return res.status(200).json({ status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
