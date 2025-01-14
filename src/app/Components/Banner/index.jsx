import { Container, ImageBanner, ImageTitle } from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { api } from "../../Services/api"; // Verifique se o import da api está correto
import { useRouter } from "next/router"; // Verifique se o uso do `router` está correto
import Link from "next/link";

const Banner = () => {
  const [data, setData] = useState(null);
  const [gamesList, setGameList] = useState([]);

  useEffect(() => {
    const req = async () => {
      try {
        const response = await api.get("/games/banner");

        setGameList(response.data);
        setData(response.status);

        if (response.status !== 200) {
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setData(500); // Defina um status de erro para que o carregamento falhe graciosamente
      }
    };

    req();
  }, []); // Dependências vazias, para que seja executado apenas uma vez ao carregar o componente

  return (
    <Container>
      {data === 200 && gamesList.length > 0 ? (
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
          {gamesList.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/Games/${item.id}`}>
                <ImageBanner
                  src={item.background_image || "default-image.jpg"}
                  alt="slider"
                      />
                      <ImageTitle>{item.name}</ImageTitle>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : data === 500 ? (
        <p>Ocorreu um erro ao carregar os dados.</p>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
};

export { Banner };
