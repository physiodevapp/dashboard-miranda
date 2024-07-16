import styled from "styled-components";

export const TabList = styled.ul`
  list-style: none;
  display: flex;
  gap: 0em;
  font-family: "Poppins";
  font-size: 1em;
  margin-top: 2em;
  color: #6E6E6E;
  font-weight: 500;
`

export const TabItem = styled.li`
  cursor: pointer;
  padding: 0em 2em 0.6em;
  border-bottom: 0.1em solid transparent;
  &:hover {
    color: #135846;
  }
  &.active {
    color: #135846;
    border-color: #135846;
  }

`