import React from 'react'
import { ContentText, ImageBanner, ImportantContent, Wrapper } from './styles'






const CardPrices = ({  title, type,   }) => {

  return (
      
      <Wrapper>
          
          
          <ImportantContent><strong>{ title }</strong></ImportantContent>
          <ImportantContent><strong>Type: </strong>{ type }</ImportantContent>
         

    </Wrapper>
      
      
  )
}

export { CardPrices }