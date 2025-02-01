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
  Conainer1,
} from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/app/Components/Button";

import { api } from "@/app/Services/api";
import { useRouter } from "next/navigation";
import { Divisor } from "@/app/Components/Divisor";
import Link from "next/link";
import { Header } from "@/app/Components/Header";
import { MobileHeader } from "@/app/Components/MobileHeader";
import { Footer } from "@/app/Components/Footer";

// Esquema de validação
const loginSchema = yup
  .object({
    user: yup.string().required("Username is required"),
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("A valid email is required")
      .required("Email is required"),
    passwordHash: yup.string().required("Password is required"),
    passwordHash2: yup
      .string()
      .required("Required field")
      .oneOf([yup.ref("passwordHash")], "The passwords must match"),
    birthday: yup.string().required("Date of birth is required"),
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
        return error.response;
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
        birthday: data.birthday
          ? new Date(data.birthday).toISOString().split("T")[0]
          : "",
        profilePictureUrl: data.profilePictureUrl,
        bio: data.bio,
        passwordHash: data.passwordHash,
        passwordHash2: data.passwordHash,
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
    formData.lastEmail = data.lastEmail;

    try {
      const encodedQuery = encodeURIComponent(data.user);
      const auth = localStorage.getItem("token");
      const response = await api.patch(
        `/login/update/${encodedQuery}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Passando um token de autorização
            "Content-Type": "application/json", // Exemplo de outro cabeçalho, se necessário
          },
        }
      );
      if (response.status === 200) {
        setResponseData("Data updated successfully");
      }
      reset();
      //router.push("/MyAccount");
    } catch (error) {
      if (error.response.status === 409) {
        setResponseData("Email already exists, please try again");
      } else {
        setResponseData("Server error");
      }
    }
  };

  return (
    <Container>
      <Header></Header>
      <Conainer1>
        <VideoBg autoPlay loop muted playsInline>
          <source src="/assets/hogwarts.mp4"></source>
        </VideoBg>
        <VideoBgColor></VideoBgColor>
        {data ? (
          <pre>
            <ContainerIntern>
              <Title>Edit Account</Title>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Text>Please confirm the fields below</Text>
                <Divisor></Divisor>
                <FormGroup>
                  <WrapperUser>
                    <Label htmlFor="user">User:</Label>
                    <Label htmlFor="user">{data.user}</Label>
                  </WrapperUser>
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
                          placeholder="Complete name"
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
                          placeholder="Confirm Password"
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
                  title="Confirm"
                  variant="primary"
                  type="submit"
                  disabled={!isValid}
                />
                <Link href={`/MyAccount`}>
                  <TextLink>Return</TextLink>
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
          </pre>
        ) : (
          <p>Loading...</p>
        )}
      </Conainer1>
      <MobileHeader></MobileHeader>
      <Footer></Footer>
    </Container>
  );
}
