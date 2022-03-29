import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const BlackContainer = styled.div<{ showContent: boolean }>`
  height: 100vh;
  width: 100vw;
  transition: height 1.5s;
  background-color: ${({ theme }) => theme.colors.primary.black};
  position: absolute;
  top: 0;
  left: 0;
  ${({ showContent }) => showContent && `
    height: 50vh;
  `}

  ${({ showContent }) => mq('md')`
    height: 100vh;
    width: 100vw;
    transition: width 1.5s;

    ${showContent && `
      width: 50vw;
    `}
  `}
`
export const ContentContainer = styled.div<{ showContent: boolean }>`
  height: 0;
  transition: height 2s;
  ${({ showContent }) => showContent && `
    height: 80vh;
  `}
  width: 80vw;
  max-width: 150rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.primary.black} 50%, ${({ theme }) => theme.colors.primary.white} 50%);
  z-index: 1;

  ${({ theme, showContent }) => mq('md')`
    width: 0;
    transition: width 2s;
    ${showContent && `
      width: 80vw;
    `}

    height: 60vh;
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
    height: 85%;
    max-height: 45rem;
    max-width: 50rem;
  `}

  ${mq('lg')`
    max-height: 50rem;
  `}
`
