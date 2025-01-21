"use client";
import React, { useEffect, useState } from "react";
import { api } from "../../../Services/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionWrapper,
  ButtonsWrapper,
  Conainer,
  Content,
  ExternalBox,
  ExternalBoxDeals,
  Highlight,
  HorizontalBox,
  HorizontalBoxInternal,
  ImageGame,
  ImageWrapper,
  InternalBox,
  InternalBox1,
  InternalBoxDeals,
  InternalBoxDealsLog,
  InternalBoxDealsMob,
  InternalBoxTitle,
  ItemAccordion,
  MainContent,
  ScrollContainer,
  SubContent,
  Subtext,
  SubtextFull,
  SubtextFullYellow,
  TextInfo,
  TextInfoInternal,
  TextRsponse,
  TitleContainer,
  TitleText,
  VerticalBox,
} from "./styles";
import { Banner } from "../../../Components/Banner";
import { SlideGames } from "../../../Components/SlideGames";
import { Divisor } from "../../../Components/Divisor";
import { SlideScreenshots } from "@/app/Components/SlideScreenshots";
import ReadMore from "@/app/Components/ReadMore";
import { Loading } from "@/app/Components/Loading";
import { Button } from "@/app/Components/Button";
import { conversor } from "@/app/utils/conversor";
import Link from "next/link";

export default function Prices() {
  const lang = navigator.language || navigator.userLanguage;

  const params = useParams();
  const itemId = params?.id ? params.id : null;
  const router = useRouter();
  const [data, setData] = useState(200);

  const [game, setGame] = useState(null);
  const [pGeneral, setPGeneral] = useState(null);
  const [pOverview, setPOverview] = useState(null);
  const [historyLog, setHistoryLog] = useState(null);

  const [responseData, setResponseData] = useState(null);

  const auth = localStorage.getItem("token");

  useEffect(() => {
    if (!auth || !itemId) {
      router.push("/Login");
      return;
    }
    const req = async () => {
      const region = await lang.split("-").pop();

      try {
        const [response, game, pGeneral, pOverview, historyLog] =
          await Promise.all([
            api.get("/login/protected", {
              headers: {
                Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
              },
            }),
            api.get(`/prices/game/${itemId}`), // Dados do jogo
            api.post(`/prices/general/${region}`, [itemId]), // Dados do preço do jogo (Ajustado para enviar um objeto)
            api.post(`/prices/overview/${region}`, [itemId]), // Outros jogos da mesma série (Ajustado para enviar um objeto)
            api.get(`/prices/historyLog/${itemId}&country=${region}`), // Histórico de preços do jogo
          ]);

        // Aqui, você pode definir o estado com as respostas recebidas
        setData(response.data); // Armazene a resposta completa, não apenas o status
        setGame(game.data);
        setPGeneral(pGeneral.data);
        setPOverview(pOverview.data);
        setHistoryLog(historyLog.data);

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

  const handleClick = async (url) => {
    router.push(url);
  };
  return (
    <Conainer>
      {data && game ? (
        <pre>
          <Banner></Banner>
          <Content>
            <TitleText>
              <strong>{game.title} </strong>{" "}
            </TitleText>
            <MainContent>
              <SubContent>
                <ImageWrapper>
                  <ImageGame src={game.assets.boxart}></ImageGame>
                </ImageWrapper>
                <TextInfo>
                  <strong>Type: </strong> {game.type}
                </TextInfo>

                <TextInfo>
                  <strong>Developer: </strong>{" "}
                  <TextInfoInternal>
                    {game.developers.map((item, index) => {
                      const isLast = index === game.developers.length - 1;
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
                  <strong>Publisher: </strong>{" "}
                  <TextInfoInternal>
                    {game.publishers
                      ? game.publishers.map((item, index) => {
                          const isLast = index === game.publishers.length - 1;
                          return (
                            <span key={index}>
                              {" "}
                              {/* Usando o índice como chave */}
                              {item.name}
                              {!isLast && ", "}
                            </span>
                          );
                        })
                      : ""}
                  </TextInfoInternal>
                </TextInfo>
                <Highlight>
                  <strong>Prices Overview:</strong>{" "}
                </Highlight>
                <ExternalBox>
                  <InternalBoxTitle>
                    <Subtext>All time Low</Subtext>

                    {pGeneral.length > 0 && pGeneral[0].historyLow.all
                      ? conversor(
                          lang,
                          pGeneral[0].historyLow.all.currency,
                          pGeneral[0].historyLow.all.amount
                        )
                      : ""}
                  </InternalBoxTitle>
                  <InternalBoxTitle>
                    <Subtext>1y</Subtext>
                    {pGeneral.length > 0 && pGeneral[0].historyLow.y1
                      ? conversor(
                          lang,
                          pGeneral[0].historyLow.y1.currency,
                          pGeneral[0].historyLow.y1.amount
                        )
                      : ""}
                  </InternalBoxTitle>
                  <InternalBoxTitle>
                    <Subtext>3m</Subtext>
                    {pGeneral.length > 0 && pGeneral[0].historyLow.m3
                      ? conversor(
                          lang,
                          pGeneral[0].historyLow.m3.currency,
                          pGeneral[0].historyLow.m3.amount
                        )
                      : ""}
                  </InternalBoxTitle>
                  <InternalBoxTitle>
                    <Subtext>Now</Subtext>
                    <SubtextFullYellow>
                      {pOverview.prices.length > 0
                        ? conversor(
                            lang,
                            pOverview.prices[0].current.price.currency,
                            pOverview.prices[0].current.price.amount
                          )
                        : " "}
                    </SubtextFullYellow>
                    <Subtext>
                      {pOverview.prices.length > 0
                        ? pOverview.prices[0].current.shop.name
                        : " "}
                    </Subtext>
                  </InternalBoxTitle>
                </ExternalBox>
              </SubContent>

              <SubContent>
                <Highlight>
                  <strong>Deals</strong>
                </Highlight>
                <InternalBox1>
                  {pGeneral.length > 0 && pGeneral[0].deals
                    ? pGeneral[0].deals.map((item, index) => {
                        return (
                          <ExternalBoxDeals
                            key={index}
                            onClick={() => handleClick(item.url)}
                          >
                            <InternalBoxDeals>
                              <span>{item.shop.name}</span>

                              {/* Verifica se há DRM e mapeia os nomes */}
                              {item.drm && item.drm.length > 0 && (
                                <Subtext>
                                  {item.drm.map((drm) => (
                                    <span key={drm.id}>{drm.name}</span>
                                  ))}
                                </Subtext>
                              )}
                              {item.timestamp && item.expiry && (
                                <Subtext>
                                  {differenceInDays(
                                    new Date(item.expiry),
                                    new Date(item.timestamp)
                                  )}
                                  d
                                  {differenceInHours(
                                    new Date(item.expiry),
                                    new Date(item.timestamp)
                                  ) % 24}
                                  h
                                  {differenceInMinutes(
                                    new Date(item.expiry),
                                    new Date(item.timestamp)
                                  ) % 60}
                                  m
                                </Subtext>
                              )}
                            </InternalBoxDeals>
                            <InternalBoxDeals>
                              <Subtext>StoreLow</Subtext>
                              <span>
                                {item.storeLow
                                  ? conversor(
                                      lang,
                                      item.storeLow.currency,
                                      item.storeLow.amount
                                    )
                                  : ""}
                              </span>
                              <Subtext>
                                Better by{" "}
                                {item.storeLow
                                  ? conversor(
                                      lang,
                                      item.storeLow.currency,
                                      item.price.amount - item.storeLow.amount
                                    )
                                  : ""}
                              </Subtext>
                            </InternalBoxDeals>
                            <InternalBoxDeals>
                              <Subtext>Now</Subtext>
                              <span>
                                {item.price.currency
                                  ? conversor(
                                      lang,
                                      item.price.currency,
                                      item.price.amount
                                    )
                                  : " "}
                              </span>
                              <Subtext>
                                {item.regular.currency
                                  ? conversor(
                                      lang,
                                      item.regular.currency,
                                      item.regular.amount
                                    )
                                  : ""}
                              </Subtext>
                            </InternalBoxDeals>
                            <InternalBoxDealsMob>
                              <HorizontalBox>
                                <VerticalBox>
                                  <span>{item.shop.name}</span>

                                  {/* Verifica se há DRM e mapeia os nomes */}
                                  {item.drm && item.drm.length > 0 && (
                                    <Subtext>
                                      {item.drm.map((drm) => (
                                        <span key={drm.id}>{drm.name}</span>
                                      ))}
                                    </Subtext>
                                  )}
                                </VerticalBox>
                                <VerticalBox>
                                  <HorizontalBoxInternal>
                                    <Subtext>StoreLow: </Subtext>
                                    <SubtextFull>
                                      {item.storeLow
                                        ? conversor(
                                            lang,
                                            item.storeLow.currency,
                                            item.storeLow.amount
                                          )
                                        : " "}
                                    </SubtextFull>
                                  </HorizontalBoxInternal>

                                  <HorizontalBoxInternal>
                                    <Subtext>
                                      {conversor(
                                        lang,
                                        item.regular.currency,
                                        item.regular.amount
                                      )}
                                    </Subtext>
                                    <span>
                                      {conversor(
                                        lang,
                                        item.price.currency,
                                        item.price.amount
                                      )}
                                    </span>
                                  </HorizontalBoxInternal>
                                </VerticalBox>
                              </HorizontalBox>
                            </InternalBoxDealsMob>
                          </ExternalBoxDeals>
                        );
                      })
                    : ""}
                </InternalBox1>
              </SubContent>
              <SubContent>
                <Highlight>
                  <strong>History Log:</strong>{" "}
                </Highlight>
                <ScrollContainer>
                  {historyLog.map((item, index) => {
                    return (
                      <InternalBoxDealsLog key={index}>
                        <HorizontalBox>
                          <VerticalBox>
                            <span>{item.shop.name}</span>
                            <Subtext>
                              {format(
                                new Date(item.timestamp),
                                "dd MMM yyyy, HH:mm"
                              )}
                            </Subtext>
                          </VerticalBox>
                          <VerticalBox>
                            <HorizontalBoxInternal>
                              <Subtext>
                                {conversor(
                                  lang,
                                  item.deal.regular.currency,
                                  item.deal.regular.amount
                                )}
                              </Subtext>
                              <span>
                                {conversor(
                                  lang,
                                  item.deal.price.currency,
                                  item.deal.price.amount
                                )}
                              </span>
                            </HorizontalBoxInternal>
                          </VerticalBox>
                        </HorizontalBox>
                      </InternalBoxDealsLog>
                    );
                  })}
                </ScrollContainer>
              </SubContent>
            </MainContent>
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
