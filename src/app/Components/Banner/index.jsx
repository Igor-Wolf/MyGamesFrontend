import { Container, ImageBanner } from "./styles"

import { Swiper, SwiperSlide} from 'swiper/react'
import { EffectFade } from 'swiper'

const Banner = () => {


    const data = [
        {id: '1', image: 'https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg'},
        {id: '2', image: 'https://media.rawg.io/media/games/a20/a203f3f5d667e04ce4a2c482c7be3a47.jpg'},
        {id: '3', image: 'https://media.rawg.io/media/screenshots/0ba/0bae7160eedc1f7d85a8d2db70cf1ec9.jpg'},
        {id: '4', image: 'https://media.rawg.io/media/games/4e6/4e6c6259ad910c31261d90b42c45e046.jpg'}
    ]



    //dentro do SwiperSlide pode ser qualquer elemento não apenas imagens, pode ser varios cards de div sendo passados, possuir botões dentro dentre outro

    return (
      
        <Container>

            <Swiper
                
                slidesPerView={1}
                effect="fade"
                pagination={{ clickable: true }}
                navigation
                loop={true}                
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {data.map((item) => (
                

                <SwiperSlide key={item.id}>
                        
                        <ImageBanner
                            src={item.image}
                        alt="slider">
                        </ImageBanner>
                </SwiperSlide>


                ))}
                
            </Swiper>

        </Container>

    )
  }
  
  export { Banner }