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
  &:hover {
    opacity: .75;
  };
  &:focus {
    outline: none !important;
    box-shadow: 0 0 3px var(--color-gray);
  }
`;

export const Span = styled.span`
  margin-left: 10px;
`;
