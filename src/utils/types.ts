import { Timestamp } from "firebase/firestore"

export interface IotItemProps {
  date?: Timestamp
  lastUpdate?: Date
  temp: number
  daylight: number
}

export interface IotDataProps {
  id: string
  ip: string
  now: IotItemProps
}

export interface HomePageProps {
  iotData: IotDataProps
}