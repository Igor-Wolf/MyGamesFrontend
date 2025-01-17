"use client";

import React, { useEffect, useState } from "react";
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
  WrapperUser,
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

// Esquema de validação
const loginSchema = yup
  .object({
    user: yup.string().required("Usuário é obrigatório"),
    name: yup.string().required("Nome é obrigatório"),
    email: yup
      .string()
      .email("É necessário ser Email válido")
      .required("Email é obrigatório"),
    passwordHash: yup.string().required("Senha é obrigatória"),
    passwordHash2: yup
      .string()
      .required("Preenchimento obrigatório")
      .oneOf([yup.ref("passwordHash")], "As senhas devem ser iguais"),
    birthday: yup.string().required("Data de nascimento é obrigatória"),
  })
  .required();

export default function EditAccount() {
  const [data, setData] = useState(null);
    const [responseData, setResponseData] = useState(null);
  

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      user: "",
      email: "",
      birthday: "",
      profilePictureUrl: "",
      bio: "",
    },
  });

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
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.status === 200) {
          setData(response.data);
          reset(response.data); // Atualiza os valores do formulário
        } else {
          router.push("/Login");
        }
      } catch (error) {
        return error.response
      }
    };

    req();
  }, [reset, router]);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        user: data.user,
        email: data.email,
        birthday: data.birthday ? new Date(data.birthday).toISOString().split('T')[0] : "",
        profilePictureUrl: data.profilePictureUrl,
        bio: data.bio,
        passwordHash: data.passwordHash,
        passwordHash2: data.passwordHash
      });
      
    }
  }, [data, reset]);
  

  const onSubmit = async (formData) => {
    const [year, month, day] = formData.birthday.split("-").map(Number);

    // Criando a data com hora específica (12:00 UTC)
    formData.birthday = new Date(
      Date.UTC(year, month - 1, day, 12, 0, 0)
    ).toISOString();

    delete formData.passwordHash2;
    formData.isActive = true;
    formData.roles = "user";
    formData.createdAt = data.createdAt;
    formData.updatedAt = new Date();
    formData.lastEmail = data.lastEmail

    try {
      const encodedQuery = encodeURIComponent(data.user)
      const auth = localStorage.getItem("token");
      const response = await api.patch(
        `/login/update/${encodedQuery}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Passando um token de autorização
            "Content-Type": "application/json", // Exemplo de outro cabeçalho, se necessário
          }
        }
      );
      if (response.status === 200) {
       setResponseData("Dados atualizado com sucesso") 
      }
      reset();
      //router.push("/MyAccount");
    } catch (error) {
      
      if (error.response.status === 409) {
        setResponseData("Email já existente, tente novamente") 
      } else {
        setResponseData("Erro no servidor") 

      }
    }
    
  };


  return (
    <Container>
      <VideoBg autoPlay loop muted playsInline>
        <source src="/assets/hogwarts.mp4"></source>
      </VideoBg>
      <VideoBgColor></VideoBgColor>
      {data ?
        (<pre>
          
         
      <ContainerIntern>
        <Title>Editar Conta</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text>Confirme os campos abaixo</Text>
          <Divisor></Divisor>
          <FormGroup>
            <WrapperUser>
              <Label htmlFor="user">Usuário:</Label>
              <Label htmlFor="user">{data.user}</Label>
              
            </WrapperUser>
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
                    value={data.email}
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
            title="Confirmar"
            variant="primary"
            type="submit"
            disabled={!isValid}
          />
          <Link href={`/MyAccount`}>
            <TextLink>Voltar</TextLink>
              </Link>
              {responseData ?
                                    (<pre>
                                      <TextRsponse>
                                        {responseData}
                                      </TextRsponse>
                                      </pre>) : (<p></p>)}
        </Form>
          </ContainerIntern>
          </pre>) : (<p>Carregando...</p>)}
    </Container>
  );
}
