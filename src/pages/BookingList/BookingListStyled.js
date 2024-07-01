import styled from "styled-components";
import { DataTableBodyRowCell, DataTableContainer } from "../../components/DataTableStyled";
import { ButtonStyled } from "../../components/ButtonStyled";

export const BookingListTableContainer = styled(DataTableContainer)`
  height: calc(100% - 8em);
`

export const BookingTableBodyRowCellBooking = styled(DataTableBodyRowCell)`
  min-width: 15em;
`

export const BookingTableBodyRowCellBookingName = styled.h6`
  font-weight: 600;
`

export const BookingTableBodyRowCellBookingId = styled.p`
  color: #799283;
`

export const BookingStatusButton = styled(ButtonStyled)`
  width: 10em;
`