import styled from "styled-components";
import { DataTableBodyRowCell, DataTableContainer } from "../../components/DataTableStyled";

export const ContactsTableContainer = styled(DataTableContainer)`
  height: calc(100% - 8em);
`

export const ContactsTableBodyRowCell = styled(DataTableBodyRowCell)`
  display: flex;
  padding-right: 2.6rem;
`