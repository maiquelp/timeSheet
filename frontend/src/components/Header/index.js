import React from 'react';

import { Container, LogoContainer, LogoText, ButtonContainer } from './styles';

import Button from '../Button'

import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';


function Header(props) {
  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="TimeSheet"/>
        <LogoText>TimeSheet</LogoText>
      </LogoContainer>
      <ButtonContainer>
        <Link to={props.path}>
          <Button text={props.text} />
        </Link>
      </ButtonContainer>
    </Container>
  );
}

export default Header;