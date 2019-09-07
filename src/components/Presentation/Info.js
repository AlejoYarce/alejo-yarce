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
const Row = styled.div`
  /* height: 100%; */
`
const ContentContainer = styled.div`
  /* height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; */
`
const Section = styled.div`
  color: ${Color.black};
  /* height: 80%;
  width: 100%; */
  background-color: ${Color.white};
  border-radius: 2rem;
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
  /* height: 100%; */
`
const InfoSection = styled.div`
  display: flex;
  align-items: center;
`
const ImageContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  /* display: flex;
  justify-content: center;
  width: 100%;

  ${mq.lg(css`
    justify-content: left;
  `)} */
`
const Image = styled.img`
  border-radius: 1rem;
  /* height: 30rem; */
  width: 100%;

  ${mq.lg(css`
    border-radius: 2rem;
  `)}

  /* border-radius: 2rem;
  width: 90%;

  margin: 2rem 0;
  ${mq.md(css`
    margin: 3rem 0;
    height: 50rem;
    width: unset;
  `)}
  ${mq.lg(css`
    margin: 4rem 0;
  `)} */
`

const Info = () => {
  return (
    <Container className="container-fluid">
      <Row className="row center-xs">
        <div className="col-xs-12 col-sm-10 col-lg-8">
          <div className="row">
            <div className="col-xs-12">              
              <SectionContainer className="row">
                <InfoSection className="col-xs-12 col-sm-7">
                  <Content />
                </InfoSection>
                <InfoSection className="col-xs-12 col-sm-5" moveToStart>
                  <ImageContainer>
                    <Image src={AlejoYarce} alt="AlejoYarce"/>
                  </ImageContainer>
                </InfoSection>
              </SectionContainer>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default Info
