import React from 'react'
import { ContentText, ImageBanner, ImportantContent, Wrapper } from './styles'






const CardPrices = ({  id , title, type,   }) => {

  return (
      
      <Wrapper>
          
          <ImportantContent>
        <ImageBanner src={
          `https://assets.isthereanydeal.com/${id}/banner600.jpg?t=1733541072`}></ImageBanner>
                    </ImportantContent>
          <ImportantContent><strong>{ title }</strong></ImportantContent>
          <ContentText><strong>Type: </strong>{ type }</ContentText>
         

    </Wrapper>
      
      
  )
}

export { CardPrices }