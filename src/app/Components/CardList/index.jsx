import React from "react";
import { ContentText, ImageBanner, ImportantContent, Wrapper } from "./styles";
import { Button } from "../Button";

const CardList = ({ urlImg, name, release, genres, description }) => {

  
  return (
    <Wrapper>
      <ImportantContent>
        <ImageBanner src={urlImg}></ImageBanner>
      </ImportantContent>
      <ImportantContent>
        <strong>{name}</strong>
      </ImportantContent>
      <ContentText>
        <strong>Released: </strong>
        {release}
      </ContentText>
      <ContentText>
        <strong>Genres: </strong>
        {genres.map((item, index) => {
          const isLast = index === genres.length - 1;
          return (
            <span key={index}>
              {item.name}
              {!isLast && ", "}
            </span>
          );
        })}
      </ContentText>
      <ContentText>
        <strong>Description: </strong>
        {description}
      </ContentText>
      
      
    </Wrapper>
  );
};

export { CardList };
