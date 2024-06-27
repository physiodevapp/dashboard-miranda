import styled from "styled-components";
import { PageElementContainerStyled } from "./PageElementContainerStyled";

export const DataTableContainer = styled(PageElementContainerStyled)`
  overflow: auto;
  border-radius: 1.4em;
  font-family: "Poppins";

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: grab;
  }
  &::-webkit-scrollbar-thumb:horizontal {
    border-radius: 10px;
  }
`

export const DataTable = styled.table`
  background-color: white;
  width: 100%;
  border-collapse: collapse;
`

export const DataTableHeader = styled.thead`
  position: sticky;
  top: 0em;
  background-color: white;
  z-index: 1;
`

export const DataTableHeaderRow = styled.tr`

`

export const DataTableHeaderRowCell = styled.th`
  padding: 0em 0em;
  font-size: 1.1rem;
  color: #393939;
  line-height: 27px;
  text-align: left;
  min-width: 100px;
  padding: 1rem 0rem 1rem 1rem;
`

export const DataTableBody = styled.tbody`

`

export const DataTableBodyRow = styled.tr`
  border-top: 1px solid #eae7e7;
  cursor: pointer;
`

export const DataTableBodyRowCell = styled.td`
  text-align: left;
  min-width: 100px;
  padding: 1rem 0rem 1rem 1rem;
`

