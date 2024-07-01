

import React, { useEffect, useState } from 'react';
import dataBookings  from '../../data/mock_bookings.json'
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { DataTableTabListComponent } from '../../components/DataTableTabs/DataTableTabListComponent';
import { BookingListTableContainer, BookingStatusButton, BookingTableBodyRowCellBooking, BookingTableBodyRowCellBookingId, BookingTableBodyRowCellBookingName } from './BookingListStyled';
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from '../../components/DataTableStyled';
import { FaArrowUp } from 'react-icons/fa6';
import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';

export const BookingListPage = () => {
  const [bookings, setBookings] = useState(dataBookings);
  const [displayBookings, setDisplayBookings] = useState(dataBookings);
  const [sortByHeaderKey, setSortByHeaderKey] = useState('order_date');
  const [activeTab, setActiveTab] = useState('');
  const [tablePageIndex, setTablePageIndex] = useState(0);

  const contactsPerTablePage = 10;

  const formatDatetime = (datetime) => {
    return new Date(Number(datetime)).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      hour12: true,
      hour:"2-digit",
      minute: "2-digit"
    });
  } 

  return (
    <>
      <PageElementContainerStyled>
        <DataTableTabListComponent
          tabItems={[
            {key: '', htmlContent: 'All bookings'},
            {key: 'check_in', htmlContent: 'Check In'},
            {key: 'check_out', htmlContent: 'Check Out'},
            {key: 'in_progress', htmlContent: 'In Progress'}
          ]}
          rows={bookings}
          tablePageIndex={tablePageIndex}
          rowsPerPage={10}
          onTabChange={(currentTab, tabRows) => {
            setDisplayBookings(tabRows);
            setActiveTab(currentTab);            
            setTablePageIndex(0);
          }}
        />
      </PageElementContainerStyled>
      <BookingListTableContainer>
      <DataTable>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHeaderRowCell scope="col" >Booking</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'                
                colSpan={1}
                className={`${sortByHeaderKey === 'order_date' && "active"}`}
                style={{cursor: "pointer"}}
                rows={JSON.parse(JSON.stringify(bookings)).filter((contact) => activeTab.length ? contact.status === activeTab : true)}
                activeTab={activeTab}
                headerKey={'order_date'}
                initialSortDirection={1}
                initialSort={true}
                onSort={(sortedRows, key) => {
                  setDisplayBookings(sortedRows);
                  setSortByHeaderKey(key);
                }}
              >
                <>
                  Order date
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCellSortComponent
                scope='col'                
                colSpan={1}
                className={`${sortByHeaderKey === 'check_in' && "active"}`}
                style={{cursor: "pointer"}}
                rows={JSON.parse(JSON.stringify(bookings)).filter((contact) => activeTab.length ? contact.status === activeTab : true)}
                activeTab={activeTab}
                headerKey={'check_in'}
                initialSortDirection={1}
                onSort={(sortedRows, key) => {
                  setDisplayBookings(sortedRows);
                  setSortByHeaderKey(key);
                }}
              >
                <>
                  Check In
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent> 
              <DataTableHeaderRowCellSortComponent
                scope='col'                
                colSpan={1}
                className={`${sortByHeaderKey === 'check_out' && "active"}`}
                style={{cursor: "pointer"}}
                rows={JSON.parse(JSON.stringify(bookings)).filter((contact) => activeTab.length ? contact.status === activeTab : true)}
                activeTab={activeTab}
                headerKey={'check_out'}
                initialSortDirection={1}
                onSort={(sortedRows, key) => {
                  setDisplayBookings(sortedRows);
                  setSortByHeaderKey(key);
                }}
              >
                <>
                  Check Out
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col" >Room type</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col" >Request</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col" >Status</DataTableHeaderRowCell>
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {
              displayBookings.slice((tablePageIndex * contactsPerTablePage), (tablePageIndex * contactsPerTablePage) + contactsPerTablePage)
              .map((booking) => (
                <DataTableBodyRow key={booking.id}>
                  <BookingTableBodyRowCellBooking key={`${booking.id}-bookingId`}>
                    <DataTableRowCellContentMultipleEllipsis lineclamp={1} width={"100%"}>
                      <BookingTableBodyRowCellBookingName>
                        { `${booking.last_name}, ${booking.first_name}` }
                      </BookingTableBodyRowCellBookingName>
                    </DataTableRowCellContentMultipleEllipsis>
                    <DataTableRowCellContentMultipleEllipsis lineclamp={1} width={"100%"}>
                      <BookingTableBodyRowCellBookingId>
                        { booking.id }
                      </BookingTableBodyRowCellBookingId>
                    </DataTableRowCellContentMultipleEllipsis>
                  </BookingTableBodyRowCellBooking>
                  <DataTableBodyRowCell key={`${booking.id}-order_date`} style={{minWidth: "14rem"}}>
                    { formatDatetime(booking.order_date) }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-check_in`} style={{minWidth: "14rem"}}>
                    { formatDatetime(booking.check_in) }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-check_out`} style={{minWidth: "14rem"}}>
                    { formatDatetime(booking.check_out) }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-room_type`} style={{minWidth: "14rem"}}>
                    { booking.room_type }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell>
                    <DataTableRowCellContentMultipleEllipsis lineclamp={4}>
                      { booking.special_request }
                    </DataTableRowCellContentMultipleEllipsis>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-status`} style={{minWidth: "14rem"}}>
                    <BookingStatusButton styled={booking.status}>
                      { booking.status.replace("_", " ") }
                    </BookingStatusButton>
                  </DataTableBodyRowCell>                  
                </DataTableBodyRow>
              ))
            }
          </DataTableBody>
        </DataTable>
      </BookingListTableContainer>
      <PageElementContainerStyled>
        <DataTablePaginationComponent
          rowsLength={displayBookings.length}
          rowsPerPage={contactsPerTablePage}
          paginationButtonsMax={5}
          tablePageIndex={tablePageIndex}
          onTablePageChange={(pageIndex) => {
            setTablePageIndex(pageIndex);
          }}
        />
      </PageElementContainerStyled>
    </>
  )
}
