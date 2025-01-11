import Link from "next/link";
import { Container, ImageBanner, ImageConainer, ImageTitle } from "./styles"

import { Swiper, SwiperSlide} from 'swiper/react'


const SlideScreenshots = ( gamesList) => {
    
  const data = gamesList.gameList
  const expectedSlides = 5;
    
    return (
      
        <Container>

<Swiper
      slidesPerView={Math.min(data.length, expectedSlides)}  // Ajuste dinâmico baseado no número de jogos
      spaceBetween={5}
      pagination={{ clickable: true }}
      navigation
      loop={true}  // Desabilita o loop
      breakpoints={{
        200: {
          slidesPerView: Math.min(data.length, 1),  // Exibe 1 slide em telas pequenas
        },
        600: {
          slidesPerView: Math.min(data.length, 2),  // Exibe 2 slides em telas médias
        },
        1024: {
          slidesPerView: Math.min(data.length, 3),  // Exibe 3 slides em telas maiores
        },
        1500: {
          slidesPerView: Math.min(data.length, 4),  // Exibe 4 slides em telas maiores
        },
        1800: {
          slidesPerView: Math.min(data.length, expectedSlides),  // Exibe até 5 slides em telas muito grandes
        },
      }}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <ImageConainer>
            <ImageBanner src={item.image} alt="slider" />
            
          </ImageConainer>
        </SwiperSlide>
      ))}
    </Swiper>

        </Container>

    )
  }
  
  export { SlideScreenshots }