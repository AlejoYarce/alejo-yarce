import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Color } from '@/components/layout/theme'
import mq from '@/components/layout/base'

const Container = styled.div`
  background-color: ${props => props.color || Color.caribbeanGreen};
  height: ${props => props.height || '100vh'};

  ${props => props.useGradient
    ? `
      background-image: linear-gradient(to top, ${Color.white}, ${Color.caribbeanGreen});
    `
    : ''
  }
`
const Row = styled.div`
  height: 100%;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const Text = styled.h1`
  position: fixed;
  color: ${Color.black};
  text-align: center;
  font-size: 5rem;
  width: 40rem;

  ${mq.sm(css`
    font-size: 10rem;
    width: 70rem;
  `)}
`

class Hero extends React.Component {
  state = {
    showText: false,
  }

  componentDidMount() {
    if (window) {
      this.validateScroll()

      window.onscroll = () => {
        this.validateScroll()
      }
    }
  }

  validateScroll = () => {
    if (window) {
      const deviceHeight = window.innerHeight
      const desiredHeight = deviceHeight + (deviceHeight / 4)
      const currentScrollPos = window.pageYOffset;

      if (desiredHeight < currentScrollPos) {
        this.setState({ showText: false})
      } else {
        this.setState({ showText: true})
      }
    }
  }

  render() {
    const { showText } = this.state

    return (
      <React.Fragment>
        <Container className="container-fluid" useGradients>
          <Row className="row">
            <Content>
              {
                showText
                ? <Text>{`FullStack Javascript {Dev}`}</Text>
                : null
              }
            </Content>
          </Row>
        </Container>
        <Container
          className="container-fluid"
          height="50vh"
          color={Color.white}
        />
        <Container
          className="container-fluid"
          height="50vh"
          color={Color.black}
        />
      </React.Fragment>
    )
  }
}

export default Hero
