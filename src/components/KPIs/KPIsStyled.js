import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 2em;
  gap: 2em;
  max-width: 1300px;
  margin: 0 auto;
`

export const Item = styled.li`
  background-color: white;
  padding: 1.4em 1em 1.4em 6.5em;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 0.8em;
  position: relative;
  flex: 1;
`

export const Icon = styled.span`
  position: absolute;
  left: 0.8em;
  top: 50%;
  transform: translateY(-50%);
  background-color: #FFEDEC;
  border-radius: 0.5rem;
  line-height: 0;
  font-size: 2rem;
  padding: 0.4em 0.4em;
  color: #E23428;
`

export const Title = styled.h4`
  color: #393939;
  font-size: 1.9rem;
`

export const Subtitle = styled.h6`
  color: #787878;
  font-size: 0.9rem;
`