"use client";
import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Conainer, MainContent, TitleContainer, TitleText } from "./styles";
import { Banner } from "../../Components/Banner";
import { SlideGames, TrendingGames } from "../../Components/SlideGames";
import { Divisor } from "../../Components/Divisor";
import { Loading } from "../../Components/Loading";
import { ButtonsBusca } from "@/app/Components/ButtonsBusca";
import { Card } from "@/app/Components/Card";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(200);
  const [gamesList, setGameList] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem("token");

    if (!auth) {
      router.push("/Login");
      return;
    }

    const req = async () => {
      try {
        const response = await api.get("/login/protected", {
          headers: {
            Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
          },
        });
        setData(response.status);
        // Verificando o status da requisição de login (response)
        if (response.status !== 200) {
          router.push("/Login");
        }
      } catch (error) {
        console.error("Erro nas requisições:", error);
      }
    };

    req();
  }, []); // Dependências vazias, para que seja executado apenas uma vez ao carregar o componente

  // Função executada ao clicar no botão
  const handleClickButton = async (btnName) => {
    try {
      const response = await api.get(`/games/searchGame/${btnName}`);
      setGameList(response.data || []); // Atualiza os cards com os dados retornados
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <Conainer>
      {data === 200 ? (
        <pre>
          <Banner></Banner>
          <MainContent>
            <TitleContainer>
              <TitleText>Search</TitleText>
              <Divisor></Divisor>
            </TitleContainer>

            <ButtonsBusca onButtonClick={handleClickButton} />
            {gamesList.map((game) => (
              <Link key={game.id} href={`/Games/${game.id}`}>
                <Card
                  key={game.id}
                  urlImg={game.background_image || "Sem título"}
                  name={game.name || ""}
                  release={game.released || ""}
                  metacritic={game.metacritic || ""}
                  age={game.esrb_rating?.name || ""}
                ></Card>
              </Link>
            ))}
          </MainContent>
        </pre>
      ) : (
        <pre>
          <Loading></Loading>
        </pre>
      )}
    </Conainer>
  );
}
