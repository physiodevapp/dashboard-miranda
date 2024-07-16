import styled from "styled-components";
import { DataTableBodyRowCell, DataTableContainer } from "../../components/DataTableStyled";
import { ButtonStyled } from "../../components/ButtonStyled";

export const BookingListTableContainer = styled(DataTableContainer)`
  height: calc(100% - 8em);
`

export const BookingTableBodyRowCellBooking = styled(DataTableBodyRowCell)`
  min-width: 220px;
`

export const BookingTableBodyRowCellBookingName = styled.h6`
  font-size: 1rem;
  font-weight: 600;
`

export const BookingTableBodyRowCellBookingId = styled.p`
  color: #799283;
`

export const BookingRequestButton = styled(ButtonStyled)`
  width: 150px;
  text-transform: capitalize;
  font-weight: 600;
`

export const BookingStatusButton = styled(ButtonStyled)`
  width: 130px;
  font-weight: 600;
`