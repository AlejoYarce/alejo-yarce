import axios from 'axios'
import { get } from 'lodash'

import Iot from '~app/components/IOT'
import PageHead from '~app/components/PageHead'
import { HomePageProps } from '~app/utils/types'
import { getProtocol } from '~app/utils/utils'

const HomePage: React.FC<HomePageProps> = ({ iotData }) => {
  return (
    <>
      <PageHead title="Alejo Yarce | IOT" description="IOT Dashboard" />
      <Iot iotData={iotData} />
    </>
  )
}

export default HomePage

export async function getServerSideProps(props) {
  const { req: { headers } } = props
  const host = getProtocol(headers.host)

  const result = await axios.get(`${host || 'http://localhost:3000'}/api/get-now`)
  const iotData = get(result, 'data', {})

  return {
    notFound: process.env.NODE_ENV === 'production',
    props: {
      iotData,
    },
  }
}