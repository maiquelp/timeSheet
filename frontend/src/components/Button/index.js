import React from 'react';

import { ButtonStyle, Span } from './styles';


import plusCircle from '../../assets/images/plus-circle.svg';
import settings from '../../assets/images/settings.svg';
import undo from '../../assets/images/undo.svg';

function Button(props) {
  let img = null;
  if (props.text === 'Add'){
    img = plusCircle
  } else if (props.text === 'Settings'){
    img = settings
  } else {
    img = undo 
  }
  return (
    <ButtonStyle>
      <img src={img} alt={props.text}/>
      <Span>{props.text}</Span>
    </ButtonStyle>
  );
}

export default Button;