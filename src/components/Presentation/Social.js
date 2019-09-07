import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Color } from '@/components/layout/theme'
import mq, { makeResponsive } from '@/components/layout/base'

import Phone from '@/assets/phone-solid.svg'
import Home from '@/assets/home-solid.svg'

const Container = styled.div`
  padding-bottom: 1rem;

  ${mq.sm(css`
    padding-top: 2rem;
    padding-bottom: unset;
  `)}
`
const RowContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 1rem;

  p {
    padding-top: 0.5rem;
    padding-left: ${props => props.extraPaddingLeft ? '1.1rem' : '0.5rem'};
    font-size: 1.7rem;

    ${mq.sm(css`
      font-size: 1.5rem;
    `)}
  }
`
const IconContainer = styled.div`
  padding: 1rem;
  background-color: ${Color.caribbeanGreen};
  border-radius: 2rem;
  width: 4rem;
  height: 4rem;
`
const Icon = styled.img`
  height: 2rem;

  ${mq.sm(css`
    height: 1.8rem;
  `)}
`

const Social = () => {
  return (
    <Container>
      <RowContainer>
        <IconContainer>
          <Icon src={Phone} />
        </IconContainer>
        <p>(+57) 310 848 37 46</p>
      </RowContainer>
      <RowContainer extraPaddingLeft>
        <IconContainer>
          <Icon src={Home} />
        </IconContainer>
        <p>Medellín, Colombia</p>
      </RowContainer>

      {/* <div>icon - alejo.yarce990@gmail.com</div>
      <div>icon - linkedin</div>
      <div>icon - github</div>
      <div>icon - instagram</div>
      <div>icon - alejo.yarce990@gmail.com</div> */}
    </Container>
  )
}

export default Social
