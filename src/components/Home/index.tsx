import React, { useEffect, useState } from 'react'

import {
  HomeContainer,
  ContentContainer,
  InnerContentContainer,
  WhiteContent,
  ImageContent,
  ImageContainer,
  BlackContainer,
} from './styles'

const Home: React.FC = () => {
  const [startHomeContainerTransition, setStartHomeContainerTransition] = useState(false)
  const [showContentContainer, setShowContentContainer] = useState(false)
  const [startContentContainerTransition, setStartContentContainerTransition] = useState(false)
  const [showInnerContent, setShowInnerContent] = useState(false)

  const intervalWidth = () => {
    setTimeout(() => {
      setStartContentContainerTransition(true)

      setTimeout(() => {
        setShowInnerContent(true)
      }, 1000)
    }, 50)
  }

  useEffect(() => {
    setTimeout(() => {
      setStartHomeContainerTransition(true)
      setTimeout(() => {
        setShowContentContainer(true)
        intervalWidth()
      }, 1400)
    }, 200)
  }, [])

  return (
    <HomeContainer>
      <BlackContainer showContent={startHomeContainerTransition} />
      {showContentContainer && (
        <ContentContainer showContent={startContentContainerTransition}>
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
