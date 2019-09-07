import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import mq from '@/components/layout/base'
import Social from '@/components/Presentation/Social'

const ContentContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
`
const Title = styled.h1`
  padding-top: 2rem;
  padding-bottom: 3rem;
  font-size: 4.5rem;

  ${mq.sm(css`
    padding-top: 0;
    padding-bottom: 4rem;
    font-size: 3rem;
  `)}

  ${mq.md(css`
    font-size: 4.5rem;
  `)}
`
const Description = styled.p`
  text-align: justify;
  margin: 0 auto;
  width: 90%;
  font-size: 1.7rem;
  padding-bottom: 2rem;

  ${mq.sm(css`
    width: unset;

    &:last-of-type {
      padding-bottom: 0;
    }
  `)}
`

const Content = () => {
  return (
    <ContentContainer>
      <Title>Alejo Yarce</Title>
      <Description>
        As Javascript and Open Source technologies lover, I'm very passionate
        about creating things and evolving ideas in different concepts.
      </Description>
      <Description>
        I'm the co-organizer of Vue.js Medellín Meetup and I love to teach others
        being part of actions that matter.
      </Description>
      <Social />
    </ContentContainer>
  )
}

export default Content
