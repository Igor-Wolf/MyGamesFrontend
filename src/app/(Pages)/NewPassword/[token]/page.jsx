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
import { useRouter, useParams } from "next/navigation";
import { Divisor } from "@/app/Components/Divisor";
import Link from "next/link";
import { FooterExternal } from "@/app/Components/FooterExternal";
import { LogoText } from "../../Login/styles";

// ------------------------------------------------------Esquema de validação
const loginSchema = yup
  .object({
    passwordHash: yup.string().required("Password is required"),
    passwordHash2: yup
      .string()
      .required("Required field")
      .oneOf([yup.ref("passwordHash")], "The passwords must match"),
  })
  .required();

export default function NewPassword() {
  const params = useParams();
  const [responseData, setResponseData] = useState(null);

  // Valida o ID vindo dos parâmetros
  const token = decodeURIComponent(params.token);

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
  });

  // ------------------------------------------------------Fazendo o request com as informações do formulário

  const onSubmit = async (data) => {
    delete data.passwordHash2;

    const response = await req(data);

    if (response.status === 200) {
      setResponseData("Password successfully changed");
    } else if (response.status === 400) {
      setResponseData("Invalid password");
    } else {
      setResponseData("Server Error");
    }

    reset();
  };

  // Função para realizar a requisição ao backend
  const req = async (body) => {
    try {
      const auth = token;
      const response = await api.post(`/login/newPassword`, body, {
        headers: {
          Authorization: `Bearer ${auth}`, // Passando um token de autorização
          "Content-Type": "application/json", // Exemplo de outro cabeçalho, se necessário
        },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  };

  return (
    <>
      <Container>
        <VideoBg autoPlay loop muted playsInline>
          <source src="/assets/quarto.mp4"></source>
        </VideoBg>
        <VideoBgColor></VideoBgColor>
        <LogoText>MY GAMES</LogoText>

        <ContainerIntern>
          <Title>New Password</Title>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Text>Enter the new password</Text>
            <Divisor></Divisor>
            <FormGroup>
              <Wrapper>
                <Label htmlFor="passwordHash">Password:</Label>
                <Controller
                  name="passwordHash"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      type="password"
                      id="passwordHash"
                      {...field}
                      placeholder="Enter your new password"
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
                <Label htmlFor="passwordHash2">Confirm Password:</Label>
                <Controller
                  name="passwordHash2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      type="password"
                      id="passwordHash2"
                      {...field}
                      placeholder="Confirm your new password"
                    />
                  )}
                />
              </Wrapper>
              {errors.passwordHash2 && (
                <ErrorBox>{errors.passwordHash2.message}</ErrorBox>
              )}
            </FormGroup>

            <Button
              title="Confirmar"
              variant="primary"
              type="submit"
              disabled={!isValid}
            />
            <Link href={`/Login`}>
              <TextLink>Login</TextLink>
            </Link>
            {responseData ? (
              <pre>
                <TextRsponse>{responseData}</TextRsponse>
              </pre>
            ) : (
              <p></p>
            )}
          </Form>
        </ContainerIntern>
      </Container>
      <FooterExternal></FooterExternal>
    </>
  );
}
