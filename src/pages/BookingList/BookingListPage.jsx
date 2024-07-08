

import React, { useEffect, useState } from 'react';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { DataTableTabListComponent } from '../../components/DataTableTabs/DataTableTabListComponent';
import { BookingListTableContainer, BookingRequestButton, BookingStatusButton, BookingTableBodyRowCellBooking, BookingTableBodyRowCellBookingId, BookingTableBodyRowCellBookingName } from './BookingListStyled';
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from '../../components/DataTableStyled';

import { FaArrowUp } from 'react-icons/fa6';
import { BsThreeDotsVertical } from "react-icons/bs";

import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { bookingListBookingListSelect, bookingListErrorSelect, bookingListStatusSelect } from '../../features/bookingList/bookingListSlice';

import Swal from "sweetalert2";
import 'animate.css';
import { ButtonStyled } from '../../components/ButtonStyled';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { bookingListDeleteOneThunk } from '../../features/bookingList/bookingListDeleteOneThunk';

export const BookingListPage = () => {
  const bookingListDispatch = useDispatch();
  const bookingListBookingList = useSelector(bookingListBookingListSelect);
  const bookingListStatus = useSelector(bookingListStatusSelect);
  const bookingListError = useSelector(bookingListErrorSelect);
  const [isUpdating, setIsUpdating] = useState(false);

  const [bookings, setBookings] = useState(bookingListBookingList);
  const [displayBookings, setDisplayBookings] = useState(bookingListBookingList);

  const [sortCriteria, setSortCriteria] = useState({headerKey: 'order_date', direction: 1})

  const [activeTab, setActiveTab] = useState('');

  const [tablePageIndex, setTablePageIndex] = useState(0);

  const navigate = useNavigate();

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

  const sortRows = (rows, { headerKey: key, direction: criteria = -1}) => {
    return rows.sort((current, next) => {
      if (current[key] < next[key])
        return criteria

      if (current[key] > next[key])
        return -1 * criteria
      
      return 0;
    })
  }

  const showRequest = (booking) => {
    Swal.fire({
      title:`Booking request`,
      showClass: {
        popup:`
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup:`
          animate__animated
          animate__fadeOutUp
          animate__faster
        `
      },
      html:`
        <article class="booking__container__article">
          <section class="container__article__content">
            <h6 class="container__article__content__title">${booking.first_name} ${booking.last_name}</h6>
            <h5 class="container__article__content__subtitle"><span>Ordered on </span>${formatDatetime(booking.order_date).split(", ")[0]}</h5>
            <p class="container__article__content__message">${booking.special_request}</p>
          </section> 
        </article>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        title: "booking__title",
        htmlContainer: "booking__container"
      }     
    })
  }

  const deleteBooking = (booking) => {
    Swal.fire({
      title: "Do you want to delete the booking order?",
      showDenyButton: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isDenied) {        
        Swal.fire({
          title: "Booking deleted successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          didOpen: () => {
            bookingListDispatch(bookingListDeleteOneThunk({id: booking.id, list: bookingListBookingList}));
          }
        });
      } 
    });
  }

  useEffect(() => {
    switch (bookingListStatus) {
      case "idle":
        setIsUpdating(false);
        break;
      case "pending":
        setIsUpdating(true);
        break;
      case "fulfilled":
        setIsUpdating(false);

        setBookings(bookingListBookingList);
        break;
      case "rejected":
        setIsUpdating(true);
        console.log({bookingListError});
        break;
      default:
        break;
    }
  }, [bookingListStatus])

  useEffect(() => {
    const tabRows = JSON.parse(JSON.stringify(bookings)).filter((booking) => activeTab.length ? booking.status === activeTab : true);

    const sortedTabRows = sortRows(tabRows, sortCriteria);

    setDisplayBookings(sortedTabRows);
  }, [bookings, activeTab, sortCriteria])

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
          onTabChange={(currentTab) => {
            setTablePageIndex(0);
            setActiveTab(currentTab);            
          }}
        />
      </PageElementContainerStyled>
      <BookingListTableContainer className='table_container'>
        <DataTable>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHeaderRowCell scope="col" style={{minWidth: "140px"}} >Booking</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'                
                colSpan={1}
                className={`${sortCriteria.headerKey === 'order_date' && "active"}`}
                style={{cursor: "pointer", minWidth: "145px"}}
                headerKey={'order_date'}
                initialSortDirection={1}
                onSort={({header, direction}) => {
                  setSortCriteria({headerKey: header, direction})
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
                className={`${sortCriteria.headerKey === 'check_in' && "active"}`}
                style={{cursor: "pointer", minWidth: "145px"}}
                headerKey={'check_in'}
                initialSortDirection={1}
                onSort={({header, direction}) => {
                  setSortCriteria({headerKey: header, direction})
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
                className={`${sortCriteria.headerKey === 'check_out' && "active"}`}
                style={{cursor: "pointer", minWidth: "145px"}}
                headerKey={'check_out'}
                initialSortDirection={1}
                onSort={({header, direction}) => {
                  setSortCriteria({headerKey: header, direction})
                }}
              >
                <>
                  Check Out
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col" >Room type</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col" >Request</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col" colSpan={2} >Status</DataTableHeaderRowCell>
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {
              displayBookings.slice((tablePageIndex * contactsPerTablePage), (tablePageIndex * contactsPerTablePage) + contactsPerTablePage)
              .map((booking) => (
                <DataTableBodyRow 
                  key={booking.id} 
                  id={`booking_${booking.id}`} 
                  offset={"60px"}
                  onClick={({target}) => {      
                    if (target.classList.contains("action_click") && !target.classList.contains("slide_cell")){
                      document.querySelectorAll(`#booking_${booking.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      setTimeout(() => {
                        document.querySelectorAll(`#booking_${booking.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      }, 1500)
                    } else if (!target.classList.contains("custom_click") && !target.parentElement.classList.contains("custom_click")) {
                      navigate(`/bookings/${booking.id}`);
                    }
                  }}>
                  <BookingTableBodyRowCellBooking key={`${booking.id}-bookingId`} style={{minWidth: "150px"}}>
                    <DataTableRowCellContentMultipleEllipsis lineclamp={2} width={"100%"}>
                      <BookingTableBodyRowCellBookingName>
                        { `${booking.last_name}, ${booking.first_name}` }
                      </BookingTableBodyRowCellBookingName>
                    </DataTableRowCellContentMultipleEllipsis>
                    <DataTableRowCellContentMultipleEllipsis lineclamp={1} width={"100%"}>
                      <BookingTableBodyRowCellBookingId>
                        { (booking.id).split("-")[(booking.id).split("-").length - 1] }
                      </BookingTableBodyRowCellBookingId>
                    </DataTableRowCellContentMultipleEllipsis>
                  </BookingTableBodyRowCellBooking>
                  <DataTableBodyRowCell key={`${booking.id}-order_date`}>
                    <>
                      { formatDatetime(booking.order_date).split(", ")[0] },<br/>
                      { formatDatetime(booking.order_date).split(", ")[1] }
                    </>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-check_in`}>
                    <>                    
                      { formatDatetime(booking.check_in).split(", ")[0] },<br/>
                      { formatDatetime(booking.check_in).split(", ")[1] }
                    </>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-check_out`}>
                    <>
                      { formatDatetime(booking.check_out).split(", ")[0] },<br/>
                      { formatDatetime(booking.check_out).split(", ")[1] }
                    </>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-room_type`}>
                    { booking.room_type }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell style={{minWidth: "150px"}}>
                    <BookingRequestButton 
                      type='button' 
                      styled="tertiary"
                      style={{width: "130px"}}
                      className='custom_click'
                      onClick={() => showRequest(booking)}
                      >
                        View Notes
                    </BookingRequestButton>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-status`}>
                    <BookingStatusButton styled={booking.status}>
                      { booking.status.replace("_", " ") }
                    </BookingStatusButton>
                  </DataTableBodyRowCell>   
                  <DataTableBodyRowCell 
                    style={{minWidth: "50px"}}
                    className='custom_click action_click'
                    >
                    <BsThreeDotsVertical className='custom_click action_click'/>
                  </DataTableBodyRowCell>         
                  <DataTableBodyRowCell className='action_cell custom_click'>
                    <ButtonStyled styled="deny" className='custom_click' onClick={() => deleteBooking(booking)} style={{width: "45px"}}>
                      <RiDeleteBin6Line className='custom_click'/>
                    </ButtonStyled>
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
