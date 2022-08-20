export interface IotItemProps {
  date?: Date
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