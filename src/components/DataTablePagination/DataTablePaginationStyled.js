import styled from "styled-components";
import { ButtonStyled } from "../ButtonStyled";

export const DataTablePagination = styled.nav`
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