import styled from 'styled-components';

export const Main = styled.main`
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-main-background);
  border-radius: 8px;
`;

export const Section = styled.section`
  margin-bottom: 20px;
`;

export const SectionHeader = styled.header`
  margin-bottom: 20px;
`;

export const SectionMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Form = styled.form`
  display:flex;
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  & + div {
    margin-left: 15px;
  }
`;

export const Input = styled.input`
  width: 75px;
  height: 56px;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  text-align: center;
  color: var(--color-gray);
  margin-top: 6px;
  align-self: flex-end;
  &:hover,
  &:focus {
    border: 1px solid var(--color-primary);
    outline: none !important;
    box-shadow: 0 0 3px var(--color-primary);
  }
`;

export const Hr = styled.hr`
  border-top: 1px solid var(--color-gray);
`;

export const InputLast = styled(Input)`
  width: 280px;
`;