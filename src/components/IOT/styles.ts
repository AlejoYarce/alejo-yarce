import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const IotContainer = styled.section`
  width: 100%;
  max-width: 144rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 5rem;
  display: grid;
  grid-gap: 1rem;

  ${mq('md')`
    grid-template-columns: repeat(2, 1fr);
  `}
`
export const GaugeContainer = styled.div`
  width: 36rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 0rem;

  svg {
    height: 18rem !important;
  }

  span {
    font-size: 2rem;
    font-weight: 700;
  }
`
export const ChartsContainer = styled.div`
  height: 40rem;
  width: 100%;
  margin: 5rem 0;

  ${mq('md')`
    width: 42rem;
    padding-right: 1.5rem;
    margin-top: 0rem;
  `}

  ${mq('lg')`
    width: 67rem;
  `}

  ${mq('lgs')`
    width: 80rem;
  `}

  ${mq('lgm')`
    width: 90rem;
  `}

  ${mq('lgl')`
    width: 100rem;
  `}
`
