"use client";

import React, { useState } from "react";
import { Container, ContainerIntern, Form, FormGroup, Label, Input, ErrorBox, VideoBg, VideoBgColor, Title, Wrapper, Text, TextLink, TextRsponse } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/app/Components/Button";


import { api } from "@/app/Services/api";
import { useRouter } from "next/navigation";
import { Divisor } from "@/app/Components/Divisor";
import Link from "next/link";



// ------------------------------------------------------Esquema de validação
const loginSchema = yup.object({
  email: yup.string().email().required("Usuário é obrigatório"),
 
}).required();



export default function ForgotPassword() {
  const router = useRouter()
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
    
    const response = await req(data)
      

    if (response.status === 200) {

      setResponseData("Email de validação enviado")

      
    } else if (response.status === 204) {

      setResponseData("Email inválido")

      
    } else {

      setResponseData("Erro no servidor")

      
    }

    reset();
    

  };



// Função para realizar a requisição ao backend
  const req = async (body) => {
  try {
    const response = await api.get(`/login/forgotPassword/${encodeURIComponent(body.email)}`);
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
        <Title>Esqueci a senha</Title>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text>Informe o email cadastrado</Text>
        <Divisor></Divisor>
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
          
          <Button title="Recuperar" variant="primary" type="submit" disabled={!isValid} />
          <Link href={`/Login`}>
              <TextLink>Login</TextLink>
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
