"use client";
import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import Link from "next/link";
import {
  ButtonsContainer,
  Conainer,
  ContainerRow,
  ContainerRowIntern,
  ContentText,
  ImportantContent,
  MainContent,
  TitleContainer,
  TitleText,
} from "./styles";
import { Banner } from "../../Components/Banner";
import { Divisor } from "../../Components/Divisor";
import { Loading } from "../../Components/Loading";
import { ButtonsBusca } from "@/app/Components/ButtonsBusca";
import { CardList } from "@/app/Components/CardList";
import { Button } from "@/app/Components/Button";
import { PopupDescription } from "@/app/Components/PopupDescription";

export default function MyList() {
  const router = useRouter();
  const [data, setData] = useState(200);
  const [gamesList, setGameList] = useState([]);
  const [chosenGame, setChosenGame] = useState("");
  const [auth, setAuth] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controla a visibilidade do popup
  const [inputValue, setInputValue] = useState(""); // Armazena o valor do input do popup
  const [chosenId, setChosenId] = useState(""); // Armazena o valor do input do popup

  useEffect(() => {
    const auth = localStorage.getItem("token");
    setAuth(auth);
    if (!auth) {
      router.push("/Login");
      return;
    }

    const req = async () => {
      try {
        const [response, game] = await Promise.all([
          api.get("/login/protected", {
            headers: {
              Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
            },
          }),
          api.get(`/myList/GameList`, {
            headers: {
              Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
            },
          }),
        ]);

        // Aqui, você pode definir o estado com as respostas recebidas
        setData(response.status);
        setGameList(game.data);

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

  // Função executada ao clicar no botão buscar
  const handleClickButton = async (btnName) => {
    setChosenGame(btnName);
  };
  const handleClickRow = async (id) => {
    router.push(`/Games/${id}`);
  };
  // Função executada ao clicar no botão remover
  const handleClickButtonRemove = async (id) => {
    try {
      const response = await api.patch(
        `/myList/removeGameList/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
          },
        }
      );
      if (response.status === 200) {
        const index = gamesList.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Usando splice para remover o item da lista original
          const updatedList = gamesList.filter((item) => item.id !== id);
          setGameList(updatedList); // Atualizando o estado com a nova lista
        }
      }
      // Verificando o status da requisição de login (response)
      if (response.status !== 200) {
      }
    } catch (error) {
      console.error("Erro nas requisições:", error);
    }
  };

  const addDescriptionGame = async (id, description) => {
    try {
      const response = await api.patch(
        `/myList/addGameListDescription`,
        {
          id: id,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
          },
        }
      );
      if (response.status === 200) {
        const index = gamesList.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Usando map para criar uma nova lista com o item atualizado
          const updatedList = gamesList.map((item, idx) => {
            if (idx === index) {
              // Alterando a propriedade description do item no índice desejado
              return {
                ...item, // Mantém as outras propriedades do item
                description: description, // Atualiza a propriedade description
              };
            }
            return item; // Retorna o item inalterado se não for o índice desejado
          });

          setGameList(updatedList); // Atualizando o estado com a nova lista
        }
      }
      // Verificando o status da requisição de login (response)
      if (response.status !== 200) {
      }
    } catch (error) {
      console.error("Erro nas requisições:", error);
    }
  };

  // Função para abrir o popup
  const openPopup = (gameId, description) => {
    setIsPopupOpen(true);
    setChosenId(gameId);
    setInputValue(description);
  };

  // Função para fechar o popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setChosenId("");
  };

  // Função para capturar o conteúdo do input e fechá-lo
  const handleSave = async (value, id) => {
    //setInputValue(value); // Atualiza o valor do input na página principal
    await addDescriptionGame(id, value);

    closePopup(); // Fecha o popup
  };

  const resultados = gamesList.filter(
    (item) => item.name.toLowerCase().includes(chosenGame.toLowerCase()) // Verifica se o nome contém o termo, ignorando maiúsculas/minúsculas
  );
  return (
    <Conainer>
      {data === 200 ? (
        <pre>
          <Banner></Banner>
          <MainContent>
            <TitleContainer>
              <TitleText>MyList</TitleText>
              <Divisor></Divisor>
            </TitleContainer>

            <ButtonsBusca onButtonClick={handleClickButton} />
            {resultados.map((game) => (
              <ContainerRow key={game.id}>
                <ContainerRowIntern onClick={() => handleClickRow(game.id)}>
                  <CardList
                    key={game.id}
                    urlImg={game.background_image || "Sem título"}
                    name={game.name || ""}
                    release={game.released || ""}
                    genres={game.genres || ""}
                    description={game.description || ""}
                  ></CardList>
                </ContainerRowIntern>
                <ImportantContent>
                  <ContentText>
                    <strong>Desc: </strong>
                    {game.description}
                  </ContentText>
                  <ButtonsContainer>
                    <Button
                      title="Edit"
                      variant="primary"
                      onClick={() => openPopup(game.id, game.description)}
                    >
                      <Icon icon="raphael:edit" />
                    </Button>
                    <Button title="Prices" variant="secondary">
                      <Icon icon="material-symbols:attach-money-rounded" />
                    </Button>
                    <Button
                      title="Remove"
                      variant="danger"
                      onClick={() => handleClickButtonRemove(game.id)}
                    >
                      <Icon icon="mdi:remove-bold" />
                    </Button>
                  </ButtonsContainer>
                </ImportantContent>
              </ContainerRow>
            ))}
            {isPopupOpen && (
              <PopupDescription
                onSave={handleSave}
                onClose={closePopup}
                chosenId={chosenId}
                description={inputValue}
              />
            )}
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
