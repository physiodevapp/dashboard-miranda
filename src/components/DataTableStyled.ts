import styled from "styled-components";
import { PageElementContainerStyled } from "./PageElementContainerStyled";

interface DataTableContainerProps {
  offset?: string,
  lineclamp?: number,
  width?: string,
  nfirstchildren?: number,
}

export const DataTableContainer = styled(PageElementContainerStyled)`
  overflow: auto;
  border-radius: 1.4em;
  font-family: "Poppins";
  background-color: white;

  &.table_animating {
    overflow-x: hidden;
  }

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
  z-index: 1000;

  ::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0em;
    left: 0em;
    width: 100%;
    height: 0.1em;
    background-color: #eae7e7;
  }
`

export const DataTableHeaderRow = styled.tr`

`

export const DataTableHeaderRowCell = styled.th`
  padding: 0em 0em;
  font-size: 1.1rem;
  line-height: 27px;
  text-align: left;
  min-width: 100px;
  padding: 1rem 0rem 1rem 1rem;
  cursor: default;
  color: #393939;

  svg {
    margin: 0em 0.2em 0.1em;
    vertical-align: middle;
  }

  &.active {
    text-decoration: underline;
  }

  &.up {
    svg {
      transform: rotateZ(180deg);
    }
  }
`

export const DataTableBody = styled.tbody`

`

export const DataTableBodyRow = styled.tr<DataTableContainerProps>`
  border-top: 1px solid #eae7e7;
  cursor: pointer;
  position: relative;
   
  &:hover td:not(.action_cell) {
    border-top: 1px solid #5eab97;
    border-bottom: 1px solid #5eab97;
  }

  td {
    z-index: 10;
    transition: width 0.2s ease-in-out, transform 0.2s ease-in-out, background 0.2s ease-in-out;

    &:nth-child(-n+${props => `${props.nfirstchildren || "1"}`}) {
      position: relative;
      z-index: 100;
    }

    &.action_cell {
      min-width: unset;
      height: 100%;
      width: ${props => `${props.offset || "90px"}`};
      position: absolute;
      right: 0px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0em 0em;
      background-color: #ebf1ef;
    }

    &.slide_cell:not(.action_cell):not(:nth-child(-n+${props => `${props.nfirstchildren || "1"}`})) {
      transform: ${props => `translateX(-${props.offset || "90px"})`};
    }

    &.slide_cell:nth-child(-n+${props => `${props.nfirstchildren || "1"}`}) {
      background-color: #EBF1EF;
    }
  }
`

export const DataTableBodyRowCell = styled.td`
  text-align: left;
  min-width: 130px;
  padding: 1rem 0rem 1rem 1rem;
  background-color: white;
  position: relative;
`

export const DataTableRowCellContentMultipleEllipsis = styled.div<DataTableContainerProps>`
  margin: 0em;
  padding: 0em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => props.lineclamp || 3};
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${props => props.width || "20rem"};
`

