import React from 'react'
import { ContentText, ImageBanner, ImportantContent, Wrapper } from './styles'
import MetacriticNote from '../MetacriticNote'






const Card = ({ urlImg, name, release, metacritic, age }) => {

  return (
      
      <Wrapper>
          
          <ImportantContent>
              <ImageBanner  src={urlImg}></ImageBanner>
          </ImportantContent>
          <ImportantContent><strong>{ name }</strong></ImportantContent>
          <ContentText><strong>Released: </strong>{ release }</ContentText>
          <ContentText><strong>Metacritic: </strong><MetacriticNote note={metacritic}></MetacriticNote></ContentText>
          <ContentText><strong>Age: </strong>{ age }</ContentText>

    </Wrapper>
      
      
  )
}

export { Card }