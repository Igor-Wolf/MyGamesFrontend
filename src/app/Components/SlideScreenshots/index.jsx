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
            <ImageBanner src={item.image? item.image : "data:image/png;base64,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"} alt="slider" />
            
          </ImageConainer>
        </SwiperSlide>
      ))}
    </Swiper>

        </Container>

    )
  }
  
  export { SlideScreenshots }