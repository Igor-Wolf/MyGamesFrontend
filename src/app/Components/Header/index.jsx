"use cleent";
import { useState } from "react";
import {
  Container,
  IconCloseMenu,
  Image,
  ImageContainer,
  MenuHidden,
  MenuLeft,
  MenuRight,
  MenuTogle,
  MiniMenu,
  MiniMenu2,
  Row,
  TitlePage,
} from "./styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from '@iconify/react';


const Header = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    localStorage.removeItem("token");
    router.push("/Login");
  };

  return (
    <Container>
      <MenuLeft>
        <Link href={"/"}>
          <TitlePage>MY GAMES</TitlePage>
        </Link>
      </MenuLeft>

      <MenuRight>
        <li>
          <Link href={"/"}>
            <Row>Inicio</Row>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <Row>Busca</Row>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <Row>Sobre</Row>
          </Link>
        </li>

        <li>
          <MenuTogle onMouseEnter={toggleMenu} onMouseLeave={toggleMenu} onClick={toggleMenu}>
            Minha Conta
            {isMenuOpen && (
              <MiniMenu>
                <ul>
                  <li>
                    <Link href={"/MyAccount"}>
                      <Row>Config.</Row>
                    </Link>
                  </li>
                  <li>
                    <Row onClick={handleClick}>Logout</Row>
                  </li>
                </ul>
              </MiniMenu>
            )}
          </MenuTogle>
        </li>

        <li></li>
      </MenuRight>
      <MenuHidden>
      <li>
          <MenuTogle onMouseEnter={toggleMenu} onMouseLeave={toggleMenu} onClick={toggleMenu}>
          <Icon icon="bx:down-arrow" width={25} height={25} />
            {isMenuOpen && (
              <MiniMenu2>
                <ul>
                  <li>
                    <Link href={"/MyAccount"}>
                      <Row>Config.</Row>
                    </Link>
                  </li>
                  <li>
                    <Row onClick={handleClick}>Logout</Row>
                  </li>
                  <IconCloseMenu>
                  <Icon icon="bx:up-arrow" width={25} height={25} />
                  </IconCloseMenu>
                </ul>
              </MiniMenu2>
            )}
          </MenuTogle>
        </li>
      </MenuHidden>
    </Container>
  );
};

export { Header };
