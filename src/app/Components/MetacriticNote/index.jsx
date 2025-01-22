// components/MetacriticNote.jsx
import React from 'react';
import { NoteWrapper } from './styles';

const getColorByNote = (note) => {
    if (note >= 80) return { background: '#4CAF50', border: '#388E3C', color: '#000000' };  // Verde
    if (note >= 60) return { background: '#FFEB3B', border: '#FBC02D', color: '#000000' };  // Amarelo
    if (note >= 40) return { background: '#FF9800', border: '#F57C00', color: '#000000' };  // Laranja
    if (note > 0) return { background: '#F44336', border: '#D32F2F', color: '#000000' };  // Vermelho
    return { background: null, border: null, color:null };  // Sem cor se nota não for fornecida
  };

const MetacriticNote = ({ note = 0 }) => {
  const { background, border, color } = getColorByNote(note);

  return (
    <NoteWrapper background={background} border={border} color={color}>
      {note}
    </NoteWrapper>
  );
};

export default MetacriticNote;
