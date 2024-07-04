import styled from "styled-components";
import { DataTableBodyRowCell, DataTableContainer } from "../../components/DataTableStyled";

export const UserListTableContainer = styled(DataTableContainer)`
  height: calc(100% - 8em);
`

export const UsersTableBodyRowCell = styled(DataTableBodyRowCell)`
  vertical-align: top;

  &.user_photo {
    width: 77px;
    min-width: unset;
    vertical-align: middle;

    figure {
      background-color: #C5C5C5;
      width: 77px;
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
`

export const UserIdentification = styled.div`
  padding-left: 0em;
  width: 150px;
`

export const UserIdentificationName = styled.h6`
  color: #393939;
  font-size: 0.9rem;
`

export const UserIdentificationId = styled.h6`
  color: #799283;
  font-size: 0.8rem;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`