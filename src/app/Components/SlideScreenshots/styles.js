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
    height: 300px;
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
          
   
`

export const ImageBanner = styled.img`

    width:100%;
    height:100%;
    object-fit: cover;
    filter: brightness(70%);
    



`

export const ImageConainer = styled.div`

position: relative;
  width: 100%;      
  height: 300px;      
  overflow: hidden;   

`

export const ImageTitle = styled.div`
  position: relative;
  bottom: 60px;
  left: 10px;
  right: 10px;
  color: white;  
  background-color: transparent;
  display: flex;
  align-items: flex-start;
  text-shadow: 
  -2px -2px 4px rgba(0, 0, 0, 0.7), 2px -2px 4px rgba(0, 0, 0, 0.7), -2px 2px 4px rgba(0, 0, 0, 0.7), 2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.9);
  font-size: 1.2rem;
  max-width: 90%;
  width:90%;
  display:flex;
  flex-wrap: wrap;
  word-wrap: break-word;
  white-space: normal; /* Permite a quebra de linha quando necessário */


`