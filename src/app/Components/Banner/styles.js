import styled from "styled-components";

// swipper
import { register } from 'swiper/element/bundle'
register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

export const Container = styled.div`

    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 400px;
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center;


    .swiper-button-next,
    .swiper-button-prev {
    color: rgb(21, 117, 9); /* Cor dos botões */
  }

  .swiper-pagination-bullet {
    background-color: rgb(21, 117, 9); /* Cor dos pontos */
  }

  @media (max-width: 900px) {

    height: 300px;
  }

  @media (max-width: 400px) {

    height: 250px;


  }
          
   
`

export const ImageBanner = styled.img`

    width:100%;
    height:100%;
    object-fit: cover;
    



`

export const ImageTitle = styled.div`
  position: relative;
  bottom: 100px;
  left: 30px;
  right: 10px;

  color: white;  
  background-color: transparent;
  display: flex;
  align-items: flex-start;
  text-shadow: 
  -2px -2px 4px rgba(0, 0, 0, 0.7), 2px -2px 4px rgba(0, 0, 0, 0.7), -2px 2px 4px rgba(0, 0, 0, 0.7), 2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.9);
  font-size: 2rem;
  max-width: 70%;
  width:70%;
  display:flex;
  flex-wrap: wrap;
  word-wrap: break-word;
  white-space: normal; /* Permite a quebra de linha quando necessário */

  @media (max-width: 600px) {

    font-size: 1.5rem;

  }
`