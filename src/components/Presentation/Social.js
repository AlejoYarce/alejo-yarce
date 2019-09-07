import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Color } from '@/components/layout/theme'
import mq, { makeResponsive } from '@/components/layout/base'

import Github from '@/assets/github.svg'
import Home from '@/assets/home.svg'
import Instagram from '@/assets/instagram.svg'
import Linkedin from '@/assets/linkedin.svg'
import Mail from '@/assets/mail.svg'
import Phone from '@/assets/phone.svg'
import Twitter from '@/assets/twitter.svg'

const Container = styled.div`
  padding-top: 2rem;

  ${mq.sm(css`
    padding-top: 2rem;
  `)}
`
const RowContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: ${props => props.paddingTop ? 0 : '1rem'};
  padding-top: ${props => props.paddingTop || 0};

  p {
    padding-top: 0.5rem;
    padding-left: ${props => props.extraPaddingLeft ? '1.1rem' : '0.5rem'};
    font-size: 1.5rem;
  }
`
const IconContainer = styled.a`
  padding: 1rem;
  color: ${Color.black};
  background-color: ${Color.caribbeanGreen};
  border: 0.1rem solid ${Color.caribbeanGreen};
  border-radius: 2rem;
  width: 4rem;
  height: 4rem;

  ${props => props.isLink
    ? iconLink
    : ''
  }

  svg {
    position: relative;
    top: -0.1rem;
  }
`
const iconLink = css`
  cursor: pointer;
  margin: 0 1rem;

  ${mq.sm(css`
    ${makeResponsive([
      {
        property: 'margin-left', min: 0.5, max: 1, unit: 'rem',
      },
      {
        property: 'margin-right', min: 0.5, max: 1, unit: 'rem',
      },
    ])}
  `)}

  &:hover {
    color: ${Color.caribbeanGreen};
    background-color: ${Color.black};
  }
`

const Social = () => {
  return (
    <Container>
      <RowContainer>
        <IconContainer>
          <Phone />
        </IconContainer>
        <p>(+57) 310 848 37 46</p>
      </RowContainer>
      <RowContainer extraPaddingLeft>
        <IconContainer>
          <Home />
        </IconContainer>
        <p>Medellín, Colombia</p>
      </RowContainer>
      <RowContainer paddingTop="2rem">
        <IconContainer
          href="https://github.com/AlejoYarce/"
          target="_blank" rel="noopener noreferrer"
          isLink
        >
          <Github />
        </IconContainer>
        <IconContainer
          href="https://www.instagram.com/AlejooYarce/"
          target="_blank" rel="noopener noreferrer"
          isLink
        >
          <Instagram />
        </IconContainer>
        <IconContainer
          href="https://twitter.com/AlejooYarce/"
          target="_blank" rel="noopener noreferrer"
          isLink
        >
          <Twitter />
        </IconContainer>
        <IconContainer
          href="https://www.linkedin.com/in/alejo-yarce/"
          target="_blank" rel="noopener noreferrer"
          isLink
        >
          <Linkedin />
        </IconContainer>
        <IconContainer
          href="mailto:alejo.yarce990@gmail.com"
          isLink
        >
          <Mail />
        </IconContainer>
      </RowContainer>
    </Container>
  )
}

export default Social
