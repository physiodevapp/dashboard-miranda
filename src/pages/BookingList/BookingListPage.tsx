

import React, { useEffect, useState, MouseEvent } from 'react';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { DataTableTabListComponent } from '../../components/DataTableTabList/DataTableTabListComponent';
import { BookingListTableContainer, BookingRequestButton, BookingStatusButton, BookingTableBodyRowCellBooking, BookingTableBodyRowCellBookingId, BookingTableBodyRowCellBookingName } from './BookingListStyled';
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from '../../components/DataTableStyled';

import { FaArrowUp } from 'react-icons/fa6';
import { BsThreeDotsVertical } from "react-icons/bs";

import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';
import { useNavigate } from 'react-router-dom';

import { bookingListBookingListSelect, bookingListErrorSelect, bookingListSearchTermSelect, bookingListStatusSelect, resetBookingStatusError } from '../../features/bookingList/bookingListSlice';

import Swal from "sweetalert2";
import 'animate.css';
import { ButtonStyled } from '../../components/ButtonStyled';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { bookingListDeleteOneThunk } from '../../features/bookingList/bookingListDeleteOneThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { bookingListReadListThunk } from '../../features/bookingList/bookingListReadListThunk';
import { BookingInterface } from '../../modelInterface';
import { BounceLoader } from 'react-spinners';

export const BookingListPage = () => {
  const bookingListDispatch = useAppDispatch();
  const bookingListBookingList = useAppSelector(bookingListBookingListSelect);
  const bookingListStatus = useAppSelector(bookingListStatusSelect);
  const bookingListError = useAppSelector(bookingListErrorSelect);
  const bookingListSearchTerm = useAppSelector(bookingListSearchTermSelect);
  
  // const [bookings, setBookings] = useState<BookingInterface[]>(bookingListBookingList);
  const [displayBookings, setDisplayBookings] = useState<BookingInterface[]>(bookingListBookingList);
  const [sortCriteria, setSortCriteria] = useState<{ headerKey: string, direction: -1 | 1 }>({headerKey: 'order_date', direction: 1});
  const [activeTab, setActiveTab] = useState<string>('');
  const [tablePageIndex, setTablePageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const contactsPerTablePage: number = 10;

  const formatDatetime = (datetime: string): string => {
    const date = new Date(datetime);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);

    const month = date.toLocaleString('en-US', { month: 'short' });

    return `${day}-${month}-${year}`;
  } 

  const sortRows = (rows: BookingInterface[], { headerKey, direction = -1}: { headerKey: string, direction: -1 | 1 }): BookingInterface[] => {
    return rows.sort((current, next) => {
      if (current[headerKey] < next[headerKey])
        return direction

      if (current[headerKey] > next[headerKey])
        return -1 * direction
      
      return 0;
    })
  }

  const showRequest = (booking: BookingInterface) => {
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

  const deleteBooking = (booking: BookingInterface) => {
    Swal.fire({
      title: "Do you want to delete the booking order?",
      showDenyButton: true,
      showLoaderOnDeny: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preDeny: async () => {
        const confirmButton = Swal.getConfirmButton();
        if (confirmButton) {
          confirmButton.disabled = true;
          confirmButton.style.display = 'none'; 
        }

        try {
          const resultAction = await bookingListDispatch(bookingListDeleteOneThunk({id: booking.id as string}));

          // Check if the action was rejected
          if (bookingListDeleteOneThunk.rejected.match(resultAction)) {
            // Handle the error from the thunk
            throw new Error(resultAction.payload || 'Delete failed');
          }

          Swal.fire({
            title: "Booking deleted successfully",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Accept", 
          });

        } catch (error) {
          Swal.update({
            icon: "error",
            title: "Deleting the user failed",
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
          })

          Swal.showValidationMessage(`Request failed: ${error}`);
        }

      }
    }).then(() => {
      bookingListDispatch(resetBookingStatusError());
      // if (result.isDenied) {        
      //   Swal.fire({
      //     title: "Booking deleted successfully",
      //     icon: "success",
      //     showConfirmButton: true,
      //     confirmButtonText: "Accept", 
      //     didOpen: () => {
      //       bookingListDispatch(bookingListDeleteOneThunk({id: booking.id}));
      //     }
      //   });
      // } 
    });
  }

  useEffect(() => {
    bookingListDispatch(bookingListReadListThunk())
  }, [])

  useEffect(() => {
    switch (bookingListStatus) {
      case "idle":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
      case "fulfilled":
        setIsLoading(false);
        break;
      case "rejected":
        setIsLoading(true);
        console.log({bookingListError});
        break;
      default:
        break;
    }
  }, [bookingListStatus])

  useEffect(() => {
    const filteredBookings: number = bookingListSearchTerm.length
    ? JSON.parse(JSON.stringify(bookingListBookingList)).filter((booking: BookingInterface) => booking.first_name.toLowerCase().includes(bookingListSearchTerm.toLowerCase()) || booking.last_name.toLowerCase().includes(bookingListSearchTerm.toLowerCase()))
    : bookingListBookingList

    const tabRows: BookingInterface[] = JSON.parse(JSON.stringify(filteredBookings)).filter((booking: BookingInterface) => activeTab.length ? booking.status === activeTab : true);

    const sortedTabRows: BookingInterface[] = sortRows(tabRows, sortCriteria);

    setDisplayBookings(sortedTabRows);
  }, [bookingListBookingList, activeTab, sortCriteria, bookingListSearchTerm])

  return (
    isLoading
    ? <>
        <BounceLoader
          color={"#135846"}
          loading={isLoading}
          cssOverride={{
            position: "relative",
            top: "40%",
            display: "block",
            margin: "0 auto",
            borderColor: "#135846",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </>
    :
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
                onSort={({header, direction}: { header: string, direction: -1 | 1 }) => {
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
                  onClick={(event: MouseEvent<HTMLTableRowElement>) => { 
                    const target = event.target as HTMLTableRowElement;

                    if (!target.closest('td'))
                      return   

                    if (target.closest('td')!.classList.contains("action_click") && !target.closest('td')!.classList.contains("slide_cell")){
                      document.querySelectorAll(`#booking_${booking.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      setTimeout(() => {
                        document.querySelectorAll(`#booking_${booking.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      }, 1500)
                    } else if (!target.closest('td')!.classList.contains("custom_click")) {
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
                        { booking.id.slice(-8) }
                      </BookingTableBodyRowCellBookingId>
                    </DataTableRowCellContentMultipleEllipsis>
                  </BookingTableBodyRowCellBooking>
                  <DataTableBodyRowCell key={`${booking.id}-order_date`} style={{width: "100px", minWidth: "unset"}}>
                    <>
                      { formatDatetime(booking.order_date) }
                    </>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-check_in`} style={{width: "100px", minWidth: "unset"}}>
                    <>                    
                      { formatDatetime(booking.check_in) }
                    </>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-check_out`} style={{width: "100px", minWidth: "unset"}}>
                    <>
                      { formatDatetime(booking.check_out) }
                    </>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${booking.id}-room_type`}>
                    { booking.room!.type }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell className='custom_click' style={{minWidth: "150px"}}>
                    <BookingRequestButton 
                      type='button' 
                      styled="tertiary"
                      style={{width: "130px"}}                      
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
                    <BsThreeDotsVertical/>
                  </DataTableBodyRowCell>         
                  <DataTableBodyRowCell className='action_cell custom_click'>
                    <ButtonStyled styled="deny" onClick={() => deleteBooking(booking)} style={{width: "45px"}}>
                      <RiDeleteBin6Line/>
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
