"use client";
import React, { useEffect, useState } from "react";
import { api } from "../../../Services/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionWrapper,
  ButtonsWrapper,
  Conainer,
  Content,
  ImageGame,
  ItemAccordion,
  MainContent,
  SubContent,
  TextInfo,
  TextInfoInternal,
  TitleContainer,
  TitleText,
} from "./styles";
import { Banner } from "../../../Components/Banner";
import { SlideGames } from "../../../Components/SlideGames";
import { Divisor } from "../../../Components/Divisor";
import { SlideScreenshots } from "@/app/Components/SlideScreenshots";
import ReadMore from "@/app/Components/ReadMore";
import { Loading } from "@/app/Components/Loading";
import { Button } from "@/app/Components/Button";

export default function Games() {
  const params = useParams();
  const itemId = params?.id ? params.id : null;
  const router = useRouter();
  const [data, setData] = useState(null);

  const [game, setGame] = useState(null);
  const [dlcGame, setDlcGame] = useState(null);
  const [gameSeries, setGameSeries] = useState(null);
  const [parentGames, setParentGames] = useState(null);
  const [screenshots, setScreenshots] = useState(null);

  const auth = localStorage.getItem("token");

  useEffect(() => {
    if (!auth || !itemId) {
      router.push("/Login");
      return;
    }

    const req = async () => {
      try {
        const [response, game, dlcGame, gameSeries, parentGames, screenshots] =
          await Promise.all([
            api.get("/login/protected", {
              headers: {
                Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
              },
            }),
            api.get(`/games/getGame/${itemId}`), //dados do jogo
            api.get(`/games/getDlc/${itemId}`), // dlcs do jogo
            api.get(`/games/getGameSeries/${itemId}`), // outros jogos da mesma série
            api.get(`/games/getParentGames/${itemId}`), // quando dlc mostra o jogo de origem
            api.get(`/games/getScreenshots/${itemId}`), // screenshots
          ]);

        // Aqui, você pode definir o estado com as respostas recebidas
        setData(response.status);
        setGame(game.data);
        setDlcGame(dlcGame.data);
        setGameSeries(gameSeries.data);
        setParentGames(parentGames.data);
        setScreenshots(screenshots.data);

        // Verificando o status da requisição de login (response)
        if (response.status !== 200) {
          router.push("/Login");
        } else if (game.status !== 200) {
          router.push("/");
        }
      } catch (error) {
        console.error("Erro nas requisições:", error);
      }
    };

    req();
  }, []); // Dependências vazias, para que seja executado apenas uma vez ao carregar o componente

  const handleClickButtonAddList = async () => {
    const add = {
      id: game.id,
      background_image: game.background_image,
      name: game.name,
      released: game.released,
      genres: game.genres,
      description: "",
    };
    try {
      const response = await api.patch("/myList/addGameList", add, {
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
  const handleClickButtonRemoveList = async () => {
    try {
      const response = await api.patch(
        `/myList/removeGameList/${game.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
          },
        }
      );
      setData(response.status);
      // Verificando o status da requisição de login (response)
      if (response.status !== 200) {
        router.push("/Login");
      }
    } catch (error) {
      console.error("Erro nas requisições:", error);
    }
  };

  const [openItem, setOpenItem] = useState(null);

  const toggleAccordion = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <Conainer>
      {data && game ? (
        <pre>
          <Banner></Banner>
          <Content>
            <TitleText>
              <strong>{game.name} </strong>{" "}
            </TitleText>
            <MainContent>
              <SubContent>
                <ImageGame src={game.background_image}></ImageGame>
                <TextInfo>
                  <strong>Metacritc Score: </strong> {game.metacritic}
                </TextInfo>
                <TextInfo>
                  <strong>Release: </strong> {game.released}
                </TextInfo>
                <TextInfo>
                  <strong>Playtime: </strong> {game.playtime}h
                </TextInfo>
                <TextInfo>
                  <strong>Age: </strong> {game.esrb_rating?.name || ""}{" "}
                </TextInfo>
                <TextInfo>
                  <strong>Developer: </strong>{" "}
                  <TextInfoInternal>
                    {game.developers.map((item, index) => {
                      const isLast = index === game.developers.length - 1;
                      return (
                        <span key={item.id}>
                          {item.name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </TextInfoInternal>
                </TextInfo>

                <TextInfo>
                  <strong>Publisher: </strong>{" "}
                  <TextInfoInternal>
                    {game.publishers.map((item, index) => {
                      const isLast = index === game.publishers.length - 1;
                      return (
                        <span key={item.id}>
                          {item.name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </TextInfoInternal>
                </TextInfo>
                <TextInfo>
                  <strong>Stores: </strong>{" "}
                  <TextInfoInternal>
                    {game.stores.map((item, index) => {
                      const isLast = index === game.stores.length - 1;
                      return (
                        <span key={item.store.id}>
                          {item.store.name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </TextInfoInternal>
                </TextInfo>

                <TextInfo>
                  <strong>Plataforms: </strong>{" "}
                  <TextInfoInternal>
                    {game.platforms.map((item, index) => {
                      // Verifique se não é o último item, se for, não adiciona vírgula
                      const isLast = index === game.platforms.length - 1;
                      return (
                        <span key={item.platform.id}>
                          {item.platform.name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </TextInfoInternal>
                </TextInfo>
              </SubContent>
              <SubContent>
                <TextInfo>
                  <strong>Description: </strong>
                  <ReadMore text={game.description_raw}></ReadMore>
                </TextInfo>
                <TextInfo>
                  <strong>Genres: </strong>{" "}
                  <TextInfoInternal>
                    {game.genres.map((item, index) => {
                      const isLast = index === game.genres.length - 1;
                      return (
                        <span key={index}>
                          {item.name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </TextInfoInternal>
                </TextInfo>
                <TextInfo>
                  <strong>Tags: </strong>{" "}
                  <TextInfoInternal>
                    {game.tags.map((item, index) => {
                      const isLast = index === game.tags.length - 1;
                      return (
                        <span key={index}>
                          {item.name}
                          {!isLast && ", "}
                        </span>
                      );
                    })}
                  </TextInfoInternal>
                </TextInfo>
              </SubContent>
              <SubContent>
                <TextInfo>
                  <strong>Requirements: </strong>{" "}
                  <AccordionWrapper>
                    {game.platforms.map((item) => (
                      <AccordionItem key={item.platform.id}>
                        <AccordionHeader
                          onClick={() => toggleAccordion(item.id)}
                        >
                          <strong>{item.platform.name}</strong>
                        </AccordionHeader>
                        {openItem === item.id && (
                          <AccordionContent>
                            <ItemAccordion>
                              <strong>Minimum: </strong>
                              {item.requirements.minimum}
                            </ItemAccordion>
                            <br></br>
                            <ItemAccordion>
                              <strong>Recommended: </strong>
                              {item.requirements.recommended}
                            </ItemAccordion>
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    ))}
                  </AccordionWrapper>
                  <ButtonsWrapper>
                    <Button
                      title="AddList"
                      variant="primary"
                      onClick={() => handleClickButtonAddList()}
                    ></Button>
                    <Button
                      title="RemoveList"
                      variant="danger"
                      onClick={() => handleClickButtonRemoveList()}
                    ></Button>
                  </ButtonsWrapper>
                </TextInfo>
              </SubContent>
            </MainContent>

            {game && screenshots.length > 0 && (
              <>
                <TitleContainer>
                  <TitleText>Screenshots</TitleText>
                  <Divisor></Divisor>
                </TitleContainer>
                <SlideScreenshots gameList={screenshots}></SlideScreenshots>
              </>
            )}
            {game && dlcGame.length > 0 && (
              <>
                <TitleContainer>
                  <TitleText>DLCs & Editions</TitleText>
                  <Divisor></Divisor>
                </TitleContainer>
                <SlideGames gameList={dlcGame}></SlideGames>
              </>
            )}
            {game && gameSeries.length > 0 && (
              <>
                <TitleContainer>
                  <TitleText>Game Series</TitleText>
                  <Divisor></Divisor>
                </TitleContainer>
                <SlideGames gameList={gameSeries}></SlideGames>
              </>
            )}
            {game && parentGames.length > 0 && (
              <>
                <TitleContainer>
                  <TitleText>Parent Games</TitleText>
                  <Divisor></Divisor>
                </TitleContainer>
                <SlideGames gameList={parentGames}></SlideGames>
              </>
            )}
          </Content>
        </pre>
      ) : (
        <pre>
          <Loading></Loading>
        </pre>
      )}
    </Conainer>
  );
}
