import React, { useState } from "react";
import {
  Button,
  ButtonContainer,
  Input,
  PopupContent,
  PopupOverlay,
} from "./styles";

const PopupDescription = ({ onSave, onClose, chosenId, description  }) => {
  const [input, setInput] = useState(description); // Armazena o valor do input dentro do popup

  // Função para atualizar o valor do input
  const handleInputChange = (event) => {
    setInput(event.target.value); // Atualiza o valor do input conforme o usuário digita
  };

  // Função chamada quando o botão Salvar é clicado
  const handleSaveClick = () => {
    onSave(input, chosenId); // Envia o valor do input para o componente pai
    onClose(); // Fecha o popup
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <h2>Description</h2>
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Digite algo"
        />

        <ButtonContainer>
          <Button onClick={handleSaveClick}>Salvar</Button>
          <Button onClick={onClose}>Fechar</Button>
        </ButtonContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export { PopupDescription };