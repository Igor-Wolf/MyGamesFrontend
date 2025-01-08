"use client";
import React, { useEffect, useState } from "react";
import {
  ButtonWrapper,
  Container,
  ContainerIntern,
  DataAccount,
  ExternalWrapper,
  Form,
  FormGroup,
  ImageProfile,
  ImageWrapper,
  Input,
  Label,
  Text,
  TextLink,
  Title,
  VideoBg,
  VideoBgColor,
  Wrapper,
} from "./styles";
import { api } from "@/app/Services/api";
import { Divisor } from "@/app/Components/Divisor";
import { useRouter } from "next/navigation";
import { Button } from "@/app/Components/Button";
import Link from "next/link";
import { format } from "date-fns";

export default function MyAccount() {
  const [data, setData] = useState(null);
  const [imageSrc, setImageSrc] = useState("/assets/defaultImage.jpg")

  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("token");

    if (!auth) {
      router.push("/Login");
      return;
    }

    const req = async () => {
      try {
        const response = await api.get("/login/myAcount", {
          headers: {
            Authorization: `Bearer ${auth}`, // Certificando-se que o token é enviado corretamente
          },
        });

        setData(response.data);

        if(response.data.profilePictureUrl){
          
          setImageSrc(response.data.profilePictureUrl)
        }
        if (response.status !== 200) {
          router.push("/Login");
        }
      } catch (error) {
        console.log(error)
      }
    };

    req();
  }, []); // Dependências vazias, para que seja executado apenas uma vez ao carregar o componente

  const handleClick = async () => {
    
    try {
      const response = await api.delete(`/login/delete/${data.user}`);
      
      if (response.status === 200) {
        router.push("/Login");
      }
    } catch (error) {
    }


  }
  return (
    <Container>
      <VideoBg autoPlay loop muted playsInline>
        <source src="/assets/hogwarts.mp4"></source>
      </VideoBg>
      <VideoBgColor></VideoBgColor>
      {data ? (
        <pre>
          <ContainerIntern>
            <Title>Minha Conta</Title>
            <ExternalWrapper>
              <Text>Dados da conta</Text>
              <Divisor></Divisor>
              <DataAccount>
                <ImageWrapper>
                    <ImageProfile src={imageSrc } onError={() => setImageSrc("/assets/defaultImage.jpg")}></ImageProfile>

                </ImageWrapper>

                <Wrapper>
                  <Label>Nome: </Label>
                  <Text>{data.name}</Text>
                </Wrapper>
                <Wrapper>
                  <Label htmlFor="user">Usuário: </Label>
                  <Text>{data.user}</Text>
                </Wrapper>
                <Wrapper>
                  <Label htmlFor="email">Email: </Label>
                  <Text>{data.email}</Text>
                </Wrapper>
                <Wrapper>
                  <Label>Aniversário: </Label>
                  <Text>{format(new Date(data.birthday), "dd/MM/yyyy")}</Text>
                </Wrapper>
                <Wrapper>
                  <Label>Cadastro: </Label>
                  <Text>{format(new Date(data.createdAt), "dd/MM/yyyy")}</Text>
                </Wrapper>
                <Wrapper>
                  <Label>Atualização: </Label>
                  <Text>{format(new Date(data.updatedAt), "dd/MM/yyyy")}</Text>
                </Wrapper>
                <Wrapper>
                  <Label>Status: </Label>
                  <Text>{data.roles}</Text>
                </Wrapper>
                <Wrapper>
                  <Label>Bio: </Label>
                  <Text>{data.bio}</Text>
                </Wrapper>
                
              </DataAccount>
              <ButtonWrapper>
                
              <Link href={`/EditAccount`}>
                <Button title="Editar" variant="secondary" type="submit" />
              </Link>
              
              <Button title="Deletar" variant="primary" type="submit" onClick={handleClick} />
              
              </ButtonWrapper>
            </ExternalWrapper>
          </ContainerIntern>
        </pre>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
}
