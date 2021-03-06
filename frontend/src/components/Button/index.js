import React from 'react';

import { ButtonStyle, Span } from './styles';

import plus from '../../assets/images/plus.svg';
import settings from '../../assets/images/settings.svg';
import undo from '../../assets/images/undo.svg';
import filter from '../../assets/images/filter.svg';
import home from '../../assets/images/home.svg';
import save from '../../assets/images/save.svg';

export default function Button({text}) {
  const button = {
    Add: () => plus,
    Settings: () => settings,
    Undo: () => undo,
    Filter: () => filter,
    Home: () => home,
    Save: () => save 
  }

  const img = button[text]();

  return (
    <ButtonStyle>
      <img src={img} alt={text}/>
      <Span>{text}</Span>
    </ButtonStyle>
  );
}
