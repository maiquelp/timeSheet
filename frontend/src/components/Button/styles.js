import styled from 'styled-components';

export const ButtonStyle = styled.button`
  height: 56px;
  border-radius: 8px;
  border: 0;
  color: var(--color-white);
  background: var(--color-primary);
  cursor: pointer;
  align-self: flex-end;
  justify-content: space-evenly;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 10px;
	transition: opacity .3s;
  &:hover,
  &:focus {
    opacity: .75;
  }
`;

export const Span = styled.span`
  margin-left: 10px;
`;
