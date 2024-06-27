import styled from "styled-components";
import { ButtonStyled } from "../../components/ButtonStyled";
import { DataTableBodyRowCell, DataTableContainer } from "../../components/DataTableStyled";

export const NewRoomButton = styled(ButtonStyled)`
  width: 213px;
  position: relative;
  left: calc(100%);
  transform: translateX(-100%);
`

export const RoomsTableContainer = styled(DataTableContainer)`
  height: calc(100% - 9.5em);
`

export const RoomsTableBodyRowCell = styled(DataTableBodyRowCell)`

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
      font-weight: 300;
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
  font-weight: 400;
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