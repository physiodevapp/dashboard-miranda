import styled from "styled-components";
import { ButtonStyled } from "../../components/ButtonStyled";

export const Wrapper = styled.div`
  background-color: white;
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Form = styled.form`
  background-color: white;
  padding: 4em 4em 4em;
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
`

export const FormLogo = styled.img`
  width: 250px;
  text-align: center;
  margin-bottom: 2em;
`

export const Input = styled.input`
  display: block;
  margin-bottom: 1em;
  padding: 1em 0.8em;
  width: 100%;
  border-radius: 0.4em;
  border: 1px solid #13584645;
`

export const SubmitButton = styled(ButtonStyled)`
  margin-top: 1em;
`