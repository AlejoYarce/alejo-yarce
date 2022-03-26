import { mq } from '~app/styles/media'
import { styled } from '~app/styles/theme'

export const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => `linear-gradient(0deg, ${theme.colors.primary.white} 50%, ${theme.colors.primary.black} 50%)`};
  
  ${({ theme }) => mq('lg')`
    background: linear-gradient(90deg, ${theme.colors.primary.black} 50%, ${theme.colors.primary.white} 50%);
  `}
`
export const ContentContainer = styled.div`
  height: 60vh;
  width: 80vw;
  max-width: 70rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.primary.black} 50%, ${({ theme }) => theme.colors.primary.white} 50%);

  ${({ theme }) => mq('lg')`
    background: linear-gradient(270deg, ${theme.colors.primary.black} 50%, ${theme.colors.primary.white} 50%);
  `}
`
export const InnerContentContainer = styled.div`
  height: calc(100% - 0.5rem);
  width: calc(100% - 0.5rem);
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary.black} 50%, ${({ theme }) => theme.colors.primary.white} 50%);

  ${({ theme }) => mq('lg')`
    background: linear-gradient(90deg, ${theme.colors.primary.black} 50%, ${theme.colors.primary.white} 50%);
  `}
`
