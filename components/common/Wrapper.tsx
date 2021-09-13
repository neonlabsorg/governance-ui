import styled from '@emotion/styled'
import tw from 'twin.macro'

export const Wrapper = styled.div`
  ${tw`relative`}
  :before {
    content: '';
    z-index: -1;
    ${tw`absolute top-0 left-0 right-0 bottom-0 m-auto bg-neon-dark-purple opacity-60`}
  }
`
