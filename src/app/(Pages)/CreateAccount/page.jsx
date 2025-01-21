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
    user: yup.string().required("Username is required"),
    name: yup.string().required("Name is required"),
    email: yup.string().email("A valid email is required").required("Email is required"),
    passwordHash: yup.string().required("Password is required"),
    passwordHash2: yup.string().required("Required field").oneOf([yup.ref('passwordHash')], "The passwords must match"),
    birthday: yup.string().required("Date of birth is required") // Verifica se a data foi preenchida
     

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
      
      setResponseData("Registration completed successfully")
      reset();
    } else if (response.status === 409) {
      setResponseData("User or email already exists, please try again")
      reset();

    }
    else {
      setResponseData("Server Error")
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
        <Title>Create Account</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text>Fill in the fields below</Text>
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
                    placeholder="Username"
                  />
                )}
              />
            </Wrapper>
            {errors.user && <ErrorBox>{errors.user.message}</ErrorBox>}
          </FormGroup>

          <FormGroup>
            <Wrapper>
              <Label htmlFor="name">Name:</Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    placeholder="Complete Name"
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
                    placeholder="Email"
                  />
                )}
              />
            </Wrapper>
            {errors.email && <ErrorBox>{errors.email.message}</ErrorBox>}
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
            {errors.passwordHash && (
              <ErrorBox>{errors.passwordHash.message}</ErrorBox>
            )}
          </FormGroup>
          <FormGroup>
            <Wrapper>
              <Label htmlFor="passwordHash2">Confirm password:</Label>
              <Controller
                name="passwordHash2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="password"
                    id="passwordHash2"
                    {...field}
                    placeholder="Confirm password"
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
              <Label htmlFor="birthday">Birthday:</Label>
              <Controller
                name="birthday"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="Date"
                    id="birthday"
                    {...field}
                    placeholder="Birthday"
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
              <Label htmlFor="profilePictureUrl">Picture:</Label>
              <Controller
                name="profilePictureUrl"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="text"
                    id="profilePictureUrl"
                    {...field}
                    placeholder="Image URL"
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
                    placeholder="Bio"
                  />
                )}
              />
            </Wrapper>
           
          </FormGroup>
          <Button
            title="Create"
            variant="primary"
            type="submit"
            disabled={!isValid}
          />
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
