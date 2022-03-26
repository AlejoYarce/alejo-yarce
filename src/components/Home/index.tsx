import React, { useEffect, useState } from 'react'

import {
  HomeContainer,
  ContentContainer,
  InnerContentContainer,
  WhiteContent,
  ImageContent,
  ImageContainer,
} from './styles'
import { RATIO } from '~app/utils/constants'

let intervalId
const Home: React.FC = () => {
  const [fullWidthRatio, setFullWidthRatio] = useState(100)
  const [showInnerContainer, setShowInnerContainer] = useState(false)
  const [innerWidthRatio, setInnerWidthRatio] = useState(0)
  const [showInnerContent, setShowInnerContent] = useState(false)

  const intervalWidth = () => {
    setShowInnerContainer(true)
    let newRatio = 0
    intervalId = setInterval(() => {
      newRatio += RATIO

      if (newRatio >= 80) {
        newRatio = 80
        clearInterval(intervalId)
        setShowInnerContent(true)
      }

      setInnerWidthRatio(newRatio)
    }, 10)
  }

  useEffect(() => {
    let newRatio = 100
    setTimeout(() => {
      intervalId = setInterval(() => {
        newRatio -= RATIO

        if (newRatio <= 50) {
          newRatio = 50
          clearInterval(intervalId)
          intervalWidth()
        }

        setFullWidthRatio(newRatio)
      }, 10)
    }, 500)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <HomeContainer widthRatio={fullWidthRatio}>
      {showInnerContainer && (
        <ContentContainer widthRatio={innerWidthRatio}>
          <InnerContentContainer>
            <WhiteContent showContent={showInnerContent}>
              <h1>Hi!</h1>
              <h3>{'I\'m Alejo Yarce'}</h3>
            </WhiteContent>
            <ImageContainer showContent={showInnerContent}>
              <ImageContent />
            </ImageContainer>
          </InnerContentContainer>
        </ContentContainer>
      )}
    </HomeContainer>
  )
}

export default Home
