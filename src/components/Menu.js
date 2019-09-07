import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import mq, { makeResponsive } from '@/components/layout/base'

const Container = styled.div`
  height: 100%;
  padding-right: 2rem;
  padding-left: 2rem;

  ${mq.md(css`
    padding-right: 0;
    padding-left: 0;
  `)}
`
const Fixed = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;

  ${mq.md(css`
    position: fixed;
    width: 50vw;
  `)}
`
const Content = styled.div`
  font-family: 'Manjari', sans-serif;
  text-align: center;

  ${mq.md(css`
    text-align: right;
  `)}
`
const Header = styled.h1`
  font-family: 'Permanent Marker', cursive;
  font-size: 8rem;

  ${mq.md(css`
    ${makeResponsive([
      {
        property: 'padding-left', min: 20, max: 30, unit: 'rem',
      },
    ])}
  `)}
`
const Title = styled.h2`
  padding-top: 6rem;
  font-size: 6rem;
`
const Description = styled.p`
  text-align: justify;
  font-size: 2.6rem;
  padding-top: 3rem;

  ${mq.md(css`
    ${makeResponsive([
      {
        property: 'padding-left', min: 0, max: 40, unit: 'rem',
      },
    ])}
  `)}
`

const Menu = () => {
  return (
    <Container className="row">
      <Fixed>
        <Content>
          <Header>Alejo Yarce</Header>
          {/* <Title>About</Title> */}
          <Title />
          <Description>
            As Javascript and Open Source technologies lover, I'm very passionate
            about creating things and evolving ideas in different concepts.
          </Description>
          <Description>
            I'm the co-organizer of Vue.js Medellín Meetup and I love to teach others
            being part of actions that matter.
          </Description>

          <Description>
            {/* I'm very passionate about Javascript and Open Source technologies. */}

            {/* I think that the most effective learning
            is given by immersive projects where I'm being take on
            challenge and I have to take fast and approaching
            decisions. */}
            
            {/* As Javascript lover, I'm co-organizer of
            Vue.js Medellín Meetup. I love to teach others and be
            part of actions that matter. */}
          </Description>
        </Content>
      </Fixed>
    </Container>
  )
}

export default Menu
