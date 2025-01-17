"use client";

import React, { useState } from "react";
import {
  Container,
  ContainerIntern,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorBox,
  VideoBg,
  VideoBgColor,
  Title,
  Wrapper,
  Text,
  TextLink,
  TextRsponse,
} from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/app/Components/Button";

import { api } from "@/app/Services/api";
import { useRouter } from "next/navigation";
import { Divisor } from "@/app/Components/Divisor";
import Link from "next/link";

// ------------------------------------------------------Esquema de validação
const loginSchema = yup
  .object({
    user: yup.string().required("Usuário é obrigatório"),
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("É necessário ser Email valido").required("Email é obrigatório"),
    passwordHash: yup.string().required("Senha é obrigatória"),
    passwordHash2: yup.string().required("Preenchimento obrigatório").oneOf([yup.ref('passwordHash')], "As senhas devem ser iguais"),
    birthday: yup.string().required("Data de nascimento é obrigatória") // Verifica se a data foi preenchida
     

  })
  .required();

export default function CreateAccount() {
  const router = useRouter();
  const [responseData, setResponseData] = useState(null);
  

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    
  });

  // ------------------------------------------------------Fazendo o request com as informações do formulário

  const onSubmit = async (data) => {
    //

    const [year, month, day] = data.birthday.split("-").map(Number);

    // Criando a data com hora específica (12:00 UTC)
    data.birthday = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();

    delete data.passwordHash2
    data.isActive = false
    data.roles = "user"
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.lastEmail = data.email

    
    const response = await req(data)     
    
    if (response.status === 200) {
      
      setResponseData("Cadastro realizado com sucesso")
      reset();
    } else if (response.status === 409) {
      setResponseData("Usuário ou email já existem, tente novamente")
      reset();

    }
    else {
      setResponseData("Erro no servidor")
      reset();

    }
    
  };

  // Função para realizar a requisição ao backend
  const req = async (body) => {
    try {
      const response = await api.post(`/login/create`, body);
      return response;
    } catch (error) {
       
      return error.response;
    }
  };

  return (
    <Container>
      <VideoBg autoPlay loop muted playsInline>
        <source src="/assets/quarto.mp4"></source>
      </VideoBg>
      <VideoBgColor></VideoBgColor>
      <ContainerIntern>
        <Title>Criar Conta</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text>Preencha os campos abaixo</Text>
          <Divisor></Divisor>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="user">Usuário:</Label>
              <Controller
                name="user"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    id="user"
                    {...field}
                    placeholder="Digite seu usuário"
                  />
                )}
              />
            </Wrapper>
            {errors.user && <ErrorBox>{errors.user.message}</ErrorBox>}
          </FormGroup>

          <FormGroup>
            <Wrapper>
              <Label htmlFor="name">Nome:</Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    placeholder="Digite seu nome completo"
                  />
                )}
              />
            </Wrapper>
            {errors.name && <ErrorBox>{errors.name.message}</ErrorBox>}
          </FormGroup>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="email">Email:</Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    id="email"
                    {...field}
                    placeholder="Digite seu email"
                  />
                )}
              />
            </Wrapper>
            {errors.email && <ErrorBox>{errors.email.message}</ErrorBox>}
          </FormGroup>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="passwordHash">Senha:</Label>
              <Controller
                name="passwordHash"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="password"
                    id="passwordHash"
                    {...field}
                    placeholder="Digite sua senha"
                  />
                )}
              />
            </Wrapper>
            {errors.passwordHash && (
              <ErrorBox>{errors.passwordHash.message}</ErrorBox>
            )}
          </FormGroup>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="passwordHash2">Confirmar Senha:</Label>
              <Controller
                name="passwordHash2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="password"
                    id="passwordHash2"
                    {...field}
                    placeholder="Confirme a senha"
                  />
                )}
              />
            </Wrapper>
            {errors.passwordHash2 && (
              <ErrorBox>{errors.passwordHash2.message}</ErrorBox>
            )}
          </FormGroup>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="birthday">Aniversário:</Label>
              <Controller
                name="birthday"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="Date"
                    id="birthday"
                    {...field}
                    placeholder="Digite seu aniversário"
                  />
                )}
              />
            </Wrapper>
            {errors.birthday && (
              <ErrorBox>{errors.birthday.message}</ErrorBox>
            )}
          </FormGroup>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="profilePictureUrl">Foto Perfil:</Label>
              <Controller
                name="profilePictureUrl"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    id="profilePictureUrl"
                    {...field}
                    placeholder="Digite a url da imagem"
                  />
                )}
              />
            </Wrapper>
            
          </FormGroup>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="bio">Bio:</Label>
              <Controller
                name="bio"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    id="bio"
                    {...field}
                    placeholder="Digite sua biografia"
                  />
                )}
              />
            </Wrapper>
           
          </FormGroup>
          <Button
            title="Criar"
            variant="primary"
            type="submit"
            disabled={!isValid}
          />
          <Link href={`/Login`}>
            <TextLink>Fazer Login</TextLink>
          </Link>
          {responseData ?
                      (<pre>
                        <TextRsponse>
                          {responseData}
                        </TextRsponse>
                        </pre>) : (<p></p>)}
        </Form>
      </ContainerIntern>
    </Container>
  );
}
