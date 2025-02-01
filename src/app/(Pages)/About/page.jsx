"use client";
import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import Link from "next/link";
import {
  ButtonsWrapper,
  Conainer,
  Conainer1,
  MainContent,
  MainText,
  TextContent,
  TitleContainer,
  TitleText,
} from "./styles";
import { Banner } from "../../Components/Banner";
import { SlideGames, TrendingGames } from "../../Components/SlideGames";
import { Divisor } from "../../Components/Divisor";
import { Loading } from "../../Components/Loading";
import { ButtonsBusca } from "@/app/Components/ButtonsBusca";
import { Card } from "@/app/Components/Card";
import { Button } from "@/app/Components/Button";
import { Header } from "@/app/Components/Header";
import { MobileHeader } from "@/app/Components/MobileHeader";
import { Footer } from "@/app/Components/Footer";

export default function About() {
  const router = useRouter();
  const [data, setData] = useState();

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
      <Header></Header>
      <Conainer1>
        {data === 200 ? (
          <pre>
            <Banner></Banner>
            <MainContent>
              <TitleContainer>
                <TitleText>About</TitleText>
                <Divisor></Divisor>
              </TitleContainer>
              <MainText>
                <TextContent>
                  Hello, my name is Igor, and I am the creator of this website
                  project, MY Games. The initial idea was to develop a system
                  that would allow users to catalog their game collection, both
                  those they already own and those they want to buy. This way,
                  users could leave comments and make notes on their games, such
                  as indicating which store they bought them from, recording the
                  lowest price they've found, or even writing something like "I
                  stopped at stage X, fighting boss Y."
                </TextContent>
                <TextContent>
                  With this in mind, I started working on the databases, as I
                  knew I wouldn't be able to create something of this scale from
                  scratch. That’s when I discovered the RAWG API, which is
                  currently being used on the website. In addition to RAWG, I
                  also integrated the IsThereAnyDeal API as part of the
                  database. However, I want to make it clear that I have no
                  affiliation with these platforms, nor am I part of their
                  teams. I use their APIs in accordance with the terms they
                  provide, with no intention of competing with them. In fact, MY
                  Games is a personal, non-profit project, more focused on
                  academic development.
                </TextContent>
                <TextContent>
                  After integrating RAWG for cataloging, I had a new idea: what
                  if users wanted to buy a game? That’s when the IsThereAnyDeal
                  API came into play. With it, users can check the best price
                  available for the game they want.
                </TextContent>
                <TextContent>
                  It’s important to note that MY Games is not an overly complex
                  or interconnected platform, especially since I’m pulling data
                  from more than one source, which can lead to inconsistencies.
                  Far from being a highly elaborate network, my website is more
                  like a "Swiss Army knife" — a practical tool you can use
                  whenever you need it.
                </TextContent>
                <TextContent>
                  I hope you enjoy the project! If you have any suggestions or
                  encounter any issues, don’t hesitate to reach out to me via
                  social media.
                </TextContent>
                <ButtonsWrapper>
                  <Link href={"https://github.com/Igor-wolf"}>
                    <Button title="GitHub" variant="primary">
                      <Icon icon="uiw:github" />
                    </Button>
                  </Link>
                  <Link
                    href={
                      "https://www.linkedin.com/in/igor-reis-barbosa-4412901b4/"
                    }
                  >
                    <Button title="LinkedIn" variant="primary">
                      <Icon icon="uil:linkedin" />
                    </Button>
                  </Link>
                  <Link href={"mailto:programadorigorrb@gmail.com"}>
                    <Button title="Email" variant="primary">
                      <Icon icon="mi:email" />
                    </Button>
                  </Link>
                </ButtonsWrapper>
              </MainText>
            </MainContent>
          </pre>
        ) : (
          <pre>
            <Loading></Loading>
          </pre>
        )}
      </Conainer1>
      <MobileHeader></MobileHeader>
      <Footer></Footer>
    </Conainer>
  );
}
