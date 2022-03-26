import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const HomeContainer = styled.div<{ widthRatio: number }>`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, widthRatio }) => `linear-gradient(180deg, ${theme.colors.primary.black} ${widthRatio}%, ${theme.colors.primary.white} 0%)`};
  
  ${({ theme, widthRatio }) => mq('md')`
    background: linear-gradient(90deg, ${theme.colors.primary.black} ${widthRatio}%, ${theme.colors.primary.white} 0%);
  `}
`
export const ContentContainer = styled.div<{ widthRatio: number }>`
  height: ${({ widthRatio }) => widthRatio}vh;
  width: 80vw;
  max-width: 70rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.primary.black} 50%, ${({ theme }) => theme.colors.primary.white} 50%);

  ${({ theme, widthRatio }) => mq('md')`
    height: 60vh;
    width: ${widthRatio}vw;
    background: linear-gradient(270deg, ${theme.colors.primary.black} 50%, ${theme.colors.primary.white} 50%);
  `}
`
export const InnerContentContainer = styled.div`
  height: calc(100% - 0.5rem);
  width: calc(100% - 0.5rem);
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary.black} 50%, ${({ theme }) => theme.colors.primary.white} 50%);
  color: ${({ theme }) => theme.colors.primary.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => mq('md')`
    background: linear-gradient(90deg, ${theme.colors.primary.black} 50%, ${theme.colors.primary.white} 50%);
    flex-direction: row;
  `}
`
export const WhiteContent = styled.div<{ showContent: boolean }>`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0;
  transition: opacity 1s;
  ${({ showContent }) => showContent && `
    opacity: 1;
  `}

  h1 {
    font-size: 15rem;
  }

  h3 {
    font-size: 3em;
  }

  ${mq('md')`
    height: 100%;
    width: 50%;
  `}
`
export const ImageContainer = styled.div<{ showContent: boolean }>`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s;
  ${({ showContent }) => showContent && `
    opacity: 1;
  `}

  ${mq('md')`
    height: 100%;
    width: 50%;
  `}
`
export const ImageContent = styled.div`
  height: 100%;
  width: 90%;
  background-image: url('/AlejoYarce_Doodle.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${mq('md')`
    height: 90%;
  `}
`
