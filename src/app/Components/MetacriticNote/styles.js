// components/MetacriticNoteStyles.js
import styled from 'styled-components';

export const NoteWrapper = styled.div`
  display: inline-block;
  padding: 0.1rem;
  border-radius: 5px;
  border: ${({ border }) => (border ? `2px solid ${border}` : 'none')};  // Aplica a borda se border for válido
  background-color: ${({ background }) => (background ? background : 'transparent')};  // Aplica o background se background for válido
  color: ${({ color }) => color};
  font-weight: bold;
`;
