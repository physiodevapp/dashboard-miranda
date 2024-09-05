import styled from "styled-components";
import { DataTableBodyRowCell, DataTableContainer } from "../../components/DataTableStyled";
import { ButtonStyled } from '../../components/ButtonStyled';

interface UserStyledProps {
  defaultphoto?: string
}


export const NewUserButton = styled(ButtonStyled)`
  width: 213px;
  position: relative;
  left: calc(100%);
  transform: translateX(-100%);
`

export const UserListTableContainer = styled(DataTableContainer)`
  height: calc(100% - 8em);
`

export const UsersTableBodyRowCell = styled(DataTableBodyRowCell)<UserStyledProps>`
  vertical-align: top;

  svg {
    vertical-align: middle;
    font-size: 1.2rem;
  }

  &.user_photo {
    width: 77px;
    min-width: unset;
    vertical-align: middle;

    figure {
      background-color: ${props => props.defaultphoto === 'true' ? "white" : "#C5C5C5" };
      width: 77px;
      height: 77px;
      position: relative;
      overflow: hidden;
      border-radius: 0.6em;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.6);
        max-width: 100%;
        max-height: 100%;
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