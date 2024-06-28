import styled from "styled-components";
import { DataTableBodyRowCell, DataTableContainer } from "../../components/DataTableStyled";

export const ContactsTableContainer = styled(DataTableContainer)`
  height: calc(100% - 8em);
`

export const ContactsTableBodyRowCell = styled(DataTableBodyRowCell)`
  display: flex;
  padding-right: 2.6rem;
`

export const ContactsTabs = styled.ul`
  list-style: none;
  display: flex;
  gap: 0em;
  font-family: "Poppins";
  font-size: 1em;
  margin-top: 2em;
  color: #6E6E6E;
  font-weight: 500;
`

export const ContactTab = styled.li`
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