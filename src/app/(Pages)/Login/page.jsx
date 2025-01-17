"use client";

import React, { useState } from "react";
import { Container, ContainerIntern, Form, FormGroup, Label, Input, ErrorBox, VideoBg, VideoBgColor, Title, Wrapper, Text, TextLink, TextLink2, Wrapper2, RememberPass, Text2, TextRsponse } from "./styles";
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
  user: yup.string().required("Username is required"),
  passwordHash: yup.string().required("Password is required"),
}).required();



export default function Login() {

  const [responseData, setResponseData] = useState(null);


  const router = useRouter()


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
        

    if (response.status == 200) {
      
      localStorage.setItem("token", response.data)
      router.push("/")
    } else if (response.status === 409) {
      
      setResponseData("Authenticate using the registered email")
    }
    else if (response.status === 401) {
      
      setResponseData("Invalid username or password")
    }
    else {
      setResponseData("Server Error")

    }
    
    reset();
    

  };



// Função para realizar a requisição ao backend
const req = async (body) => {
  try {
    const response = await api.post(`/login/autentication` , body);
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
        <Title>Login</Title>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text>Login with your username and password</Text>
        <Divisor></Divisor>
          <FormGroup>
            <Wrapper>
            <Label htmlFor="user">User:</Label>
            <Controller
name="user"
control={control}
defaultValue=""
render={({ field }) => (
  <Input
  type="text"
  id="user"
  {...field}
  placeholder="User"
  />
)}
/>
            </Wrapper>
            {errors.user && <ErrorBox>{errors.user.message}</ErrorBox>}
          </FormGroup>
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
                placeholder="Password"
                />
              )}
              />
              </Wrapper>
            {errors.passwordHash && <ErrorBox>{errors.passwordHash.message}</ErrorBox>}
          </FormGroup>
          <Wrapper2>
            <RememberPass>
            <Controller
      name="remember"
      control={control}
      defaultValue={false}  // Valor inicial da checkbox (desmarcada)
      render={({ field }) => (
        <input 
          type="checkbox" 
          id="ok" 
          {...field}  // Registra a checkbox no formulário
        />
      )}
    />
    <Text>Remember me?</Text>
            </RememberPass>
              <Text2>|</Text2>

          <Link href={`/ForgotPassword`}>
              <TextLink>Forgot your password?</TextLink>
          </Link>
          </Wrapper2>
          <Button title="Login" variant="primary" type="submit" disabled={!isValid} />
          <Link href={`/CreateAccount`}>
              <TextLink>Create a new account</TextLink>
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
