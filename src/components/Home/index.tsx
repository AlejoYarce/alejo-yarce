import React from 'react'
import { HomeContainer, ContentContainer, InnerContentContainer } from './styles'

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <ContentContainer>
        <InnerContentContainer />
      </ContentContainer>
    </HomeContainer>
  )
}

export default Home
