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
          
   
`

export const ImageBanner = styled.img`

    width:100%;
    height:100%;
    object-fit: cover;
    



`