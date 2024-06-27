import styled from "styled-components";
import { ButtonStyled } from "../../components/ButtonStyled";

export const RoomsTableContainer = styled.article`
  height: calc(100% - 8em);
  margin: 2em auto;
  width: calc(100% - 4em);
  overflow: auto;
  max-width: 1240px;
  border-radius: 1.4em;

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

export const RoomsTable = styled.table`
  background-color: white;
  width: 100%;
  border-collapse: collapse;
`

export const RoomsTableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`

export const RoomsTableHeaderRow = styled.tr`
`

export const RoomsTableHeaderRowCell = styled.th`
  padding: 0em 0em;
  font-size: 1.1rem;
  color: #393939;
  line-height: 27px;
  text-align: left;
  min-width: 100px;
  padding: 1rem 0rem 1rem 1rem;
`

export const RoomsTableBody = styled.tbody`

`

export const RoomsTableBodyRow = styled.tr`
  border-top: 1px solid #eae7e7;
  cursor: pointer;
`

export const RoomsTableBodyRowCell = styled.td`
  text-align: left;
  min-width: 100px;
  padding: 1rem 0rem 1rem 1rem;

  &.room-photo {
    width: 150px;

    figure {
      background-color: #C5C5C5;
      width: 150px;
      height: 77px;
      position: relative;
      overflow: hidden;
      border-radius: 0.6em;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.1);
        max-width: 100%;
      }
    }
  }

  &.room-price {
    font-weight: 600;

    span {
      color: #799283;
      font-size: 0.9rem;
      font-weight: 100;
    }
  }

`

export const RoomIdentification = styled.div`
  padding-left: 0em;
  min-width: 100px;
`

export const RoomIdentificationId = styled.h6`
  color: #799283;
  font-size: 0.8rem;
`

export const RoomIdentificationName = styled.h6`
  color: #393939;
  font-size: 1rem;
  line-height: 25px;
`

export const StatusButton = styled(ButtonStyled)`
  padding: 0.72em 1.35em;
  font-size: 1rem;
  line-height: 25px;
  width: 125px;
  text-transform: capitalize;
`

export const RoomsTablePagination = styled.nav`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1em;
  width: calc(100% - 4em);
  max-width: 1240px;
  margin: 0 auto;

  .pagination-button {
    width: 3em;
    margin: 0em 0.2em;

    &.active {
      background-color: #1d9d7b;
      border-color: #1d9d7b;

      &:hover {
        color: white;
        font-weight: 700;
      }
    }

    &.dots {
      cursor: default;
      background-color: transparent;
      border-color: transparent;
      color: #135846;
    }

    &.hide {
      display: none;
    }
  }
`

export const PaginationInfo = styled.p`
  flex: 1;
  color: #393939;
  font-size: 1rem;
`

export const NavigationButton = styled(ButtonStyled)`
  width: 90px;
`