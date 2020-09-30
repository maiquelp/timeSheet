import React from 'react';

import { Container, LogoContainer, LogoText } from './styles';

import Button from '../Button';


import logo from '../../assets/images/logo.png';


function Header(props) {
  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="TimeSheet"/>
        <LogoText>TimeSheet</LogoText>
      </LogoContainer>
      <Button text={props.text} />
    </Container>
  );
}

export default Header;