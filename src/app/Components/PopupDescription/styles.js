import styled from "styled-components";

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);  // Fundo semitransparente
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  // Garante que o popup fique sobre todos os outros elementos da tela
  color: white;
  pointer-events: auto;  // Garante que apenas o popup tenha eventos
`;

export const PopupContent = styled.div`
  background-color: gray;
  padding: 20px;
  border-radius: 8px;
  box-shadow: gray;
  width: 300px;  // Largura do popup
  text-align: center;
  border-color: white;
  border: 1px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
