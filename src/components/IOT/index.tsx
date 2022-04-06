import React from 'react'
import dynamic from 'next/dynamic'
const ReactSpeedometer = dynamic(() => import('react-d3-speedometer'), { ssr: false })
import dayjs from 'dayjs'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { ChartsContainer, GaugeContainer, IotContainer } from './styles'
import { HomePageProps } from '~app/utils/types'
import { theme } from '~app/styles/theme'

const Iot: React.FC<HomePageProps> = ({ iotData }) => {
  const year = dayjs().format('YYYY')
  const month = dayjs().format('MM')
  const { now } = iotData
  const monthHistory = iotData[year][month] || []

  const nowLabel = dayjs(now.lastUpdate).format('ddd MMM/DD @ hh:mm A')
  const chartData = monthHistory.map(item => ({
    xLabels: dayjs(item.lastUpdate).format('dd DD@HH:mm'),
    ...item,
  }))

  return (
    <IotContainer>
      <GaugeContainer>
        <ReactSpeedometer
          value={now.temp}
          maxValue={40}
          segments={50}
          maxSegmentLabels={4}
          startColor={theme.colors.iot.green}
          endColor={theme.colors.iot.red}
          currentValueText="${value}°C"
        />
        <span>{nowLabel}</span>
      </GaugeContainer>
      <ChartsContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ left: 0 }}>
            <Line
              type="monotone"
              dataKey="temp"
              stroke={theme.colors.iot.endeavour}
              strokeWidth={2}
            />
            <CartesianGrid stroke={theme.colors.iot.silver} />
            <XAxis dataKey="xLabels" />
            <YAxis domain={['dataMin - 1', 'dataMax + 5']} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </ChartsContainer>

      <GaugeContainer>
        <ReactSpeedometer
          value={now.daylight}
          maxValue={100}
          segments={50}
          maxSegmentLabels={6}
          startColor={theme.colors.primary.black}
          endColor={theme.colors.iot.yellow}
          currentValueText="${value}%"
        />
        <span>{nowLabel}</span>
      </GaugeContainer>
      <ChartsContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ left: 0 }}>
            <Line
              type="monotone"
              dataKey="daylight"
              stroke={theme.colors.iot.endeavour}
              strokeWidth={2}
            />
            <CartesianGrid stroke={theme.colors.iot.silver} />
            <XAxis dataKey="xLabels" />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </ChartsContainer>
    </IotContainer>
  )
}

export default Iot
