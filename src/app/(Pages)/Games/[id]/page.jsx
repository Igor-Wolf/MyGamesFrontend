"use client";
import React, { useEffect, useState } from "react";
import { api } from "../../../Services/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionWrapper,
  ButtonsWrapper,
  Conainer,
  Conainer1,
  Content,
  ImageGame,
  ItemAccordion,
  MainContent,
  SubContent,
  TextInfo,
  TextInfoInternal,
  TextRsponse,
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
import MetacriticNote from "@/app/Components/MetacriticNote";
import { Header } from "@/app/Components/Header";
import { MobileHeader } from "@/app/Components/MobileHeader";
import { Footer } from "@/app/Components/Footer";

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

  const [responseData, setResponseData] = useState(null);

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
      setResponseData("Game added to the list");

      // Verificando o status da requisição de login (response)
      if (response.status !== 200) {
        setResponseData("It was not possible to add the list");
      }
    } catch (error) {
      setResponseData("It was not possible to add the list");
    }
  };
  const handleClickButtonAddWishList = async () => {
    const add = {
      id: game.id,
      background_image: game.background_image,
      name: game.name,
      released: game.released,
      genres: game.genres,
      description: "",
    };
    try {
      const response = await api.patch("/myList/addWishList", add, {
        headers: {
          Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
        },
      });
      setData(response.status);
      setResponseData("Game added to the wishlist");

      // Verificando o status da requisição de login (response)
      if (response.status !== 200) {
        setResponseData("It was not possible to add the wishlist");
      }
    } catch (error) {
      setResponseData("It was not possible to add the wishlist");
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
      setResponseData("Game removed from the list");
      // Verificando o status da requisição de login (response)
      if (response.status !== 200) {
        setResponseData("Could not be removed from the list");
      }
    } catch (error) {
      setResponseData("Could not be removed from the list");
    }
  };
  const handleClickButtonPrice = async () => {
    router.push(`/SearchPrices1/${game.slug}`);
  };
  const handleClickButtonRemoveWishList = async () => {
    try {
      const response = await api.patch(
        `/myList/removeWishList/${game.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
          },
        }
      );
      setData(response.status);
      setResponseData("Game removed from the wishlist");

      // Verificando o status da requisição de login (response)
      if (response.status !== 200) {
        setResponseData("Could not be removed from the wishlist");
      }
    } catch (error) {
      setResponseData("Could not be removed from the wishlist");
    }
  };

  const [openItem, setOpenItem] = useState(null);

  const toggleAccordion = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <Conainer>
      <Header></Header>
      <Conainer1>
        {data && game ? (
          <pre>
            <Banner></Banner>
            <Content>
              <TitleText>
                <strong>{game.name} </strong>{" "}
              </TitleText>
              <MainContent>
                <SubContent>
                  <ImageGame
                    src={
                      game.background_image
                        ? game.background_image
                        : "data:image/png;base64,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"
                    }
                  ></ImageGame>
                  <TextInfo>
                    <strong>Metacritc Score: </strong>{" "}
                    <MetacriticNote note={game.metacritic}></MetacriticNote>
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
                      >
                        <Icon icon="mingcute:add-fill" />
                      </Button>
                      <Button
                        title="RemList"
                        variant="danger"
                        onClick={() => handleClickButtonRemoveList()}
                      >
                        <Icon icon="mdi:remove-bold" />
                      </Button>
                    </ButtonsWrapper>
                    <ButtonsWrapper>
                      <Button
                        title="AddWish"
                        variant="primary"
                        onClick={() => handleClickButtonAddWishList()}
                      >
                        <Icon icon="simple-line-icons:present" />
                      </Button>
                      <Button
                        title="RemWish"
                        variant="danger"
                        onClick={() => handleClickButtonRemoveWishList()}
                      >
                        <Icon icon="mdi:remove-bold" />
                      </Button>
                    </ButtonsWrapper>
                    <ButtonsWrapper>
                      <Button
                        title="Prices"
                        variant="secondary"
                        onClick={() => handleClickButtonPrice()}
                      >
                        <Icon icon="nimbus:money" />
                      </Button>
                    </ButtonsWrapper>
                    <TextRsponse>{responseData}</TextRsponse>
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
      </Conainer1>
      <MobileHeader></MobileHeader>
      <Footer></Footer>
    </Conainer>
  );
}
