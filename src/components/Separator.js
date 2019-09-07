import React from 'react'
import styled from '@emotion/styled'

import { Color } from '@/components/layout/theme'

const Container = styled.div`
  background-color: ${props => props.color || Color.black};
  height: 50vh;
`

const Separator = ({ color }) => <Container color={color} />

export default Separator
