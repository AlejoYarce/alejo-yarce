import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Color } from '@/components/layout/theme'
import mq from '@/components/layout/base'
import Content from '@/components/Presentation/Content'

const AlejoYarce = 'https://res.cloudinary.com/alejoyarce/image/upload/c_crop,g_south,h_1900,q_100,w_1500/v1567598025/AlejoYarce_BW_ukjbvn.jpg'

const Container = styled.div`
  background-color: ${Color.caribbeanGreen};
  padding-top: 10rem;
  padding-bottom: 10rem;
`
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  color: ${Color.black};
  background-color: ${Color.white};

  ${mq.sm(css`
    flex-direction: row;
    border-radius: 2rem;
  `)}
`
const InfoSection = styled.div`
  display: flex;
  align-items: center;
`
const ImageContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
`
const Image = styled.img`
  border-radius: 2rem;
  width: 100%;
`

const Info = () => {
  return (
    <Container className="container-fluid">
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-10 col-lg-8">
          <div className="row">
            <div className="col-xs-12">              
              <SectionContainer className="row">
                <InfoSection className="col-xs-12 col-sm-6">
                  <Content />
                </InfoSection>
                <InfoSection className="col-xs-12 col-sm-6" moveToStart>
                  <ImageContainer>
                    <Image src={AlejoYarce} alt="AlejoYarce"/>
                  </ImageContainer>
                </InfoSection>
              </SectionContainer>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Info
