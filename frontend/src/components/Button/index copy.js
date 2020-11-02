import React from 'react';

import { ButtonStyle, Span } from './styles';

import plus from '../../assets/images/plus.svg';
import settings from '../../assets/images/settings.svg';
import undo from '../../assets/images/undo.svg';
import filter from '../../assets/images/filter.svg';
import home from '../../assets/images/home.svg';
import save from '../../assets/images/save.svg';

export default function Button({text}) {
  let img = null;
  if (text === 'Add'){
    img = plus;
  } if (text === 'Settings'){
    img = settings;
  } if (text === 'Undo'){
    img = undo;
  } if (text === 'Filter'){
    img = filter;
  } if (text === 'Home'){
    img = home;
  } else {
    img = save ;
  }

  return (
    <ButtonStyle>
      <img src={img} alt={text}/>
      <Span>{text}</Span>
    </ButtonStyle>
  );
}