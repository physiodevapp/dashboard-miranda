
import React, { useEffect, useRef, useState } from 'react'
import './RoomsStyled'
import rooms from '../../data/mock_rooms.json'
import { NavigationButton, PaginationInfo, RoomIdentification, RoomIdentificationId, RoomIdentificationName, RoomsTableBodyRowCell, RoomsTableContainer, RoomsTablePagination, StatusButton } from './RoomsStyled';

import { ButtonStyled } from '../../components/ButtonStyled';
import { DataTable, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableBody, DataTableBodyRow } from '../../components/DataTableStyled'
import { NewRoomButton } from './RoomsStyled';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { useNavigate } from 'react-router-dom';

export const RoomsPage = () => {
  const [displayRooms, setDisplayRooms] = useState([])
  const [tablePageIndex, setTablePageIndex] = useState(0);
  const navigate = useNavigate()

  const prevButton = useRef();
  const nextButton = useRef();
  const beforeMiddleButton = useRef();
  const middleButton = useRef();
  const afterMiddleButton = useRef();

  const paginationButtonsMax = 5;
  const roomsPerTablePage = 10;
  const tableTotalPages = Math.floor(rooms.length / roomsPerTablePage)
  
  const getOfferPrice = (price, discount) => `$${Math.round(100 * (price * (discount / 100))) / 100}`;

  const sortByKey = (rooms, key) => {
    return rooms.sort((current, next) => {
      if (current[key] < next[key])
        return -1

      if (current[key] > next[key])
        return 1
      
      return 0;
    })
  }

  useEffect(() => {
    setDisplayRooms(sortByKey(rooms, 'number').slice(0,10))
  }, [])

  useEffect(() => {
    const updatePagination = () => {      
      const current = tablePageIndex + 1;

      document.querySelectorAll(".pagination-button").forEach(element => {
        element?.classList.remove('active')
      }); 
      if (current >= 3 && current < tableTotalPages - 1 && tableTotalPages > paginationButtonsMax)
        middleButton.current.classList.add("active");
      else
        document.querySelector(`[data-index='${tablePageIndex}']`)?.classList.add("active")


      if (current > tableTotalPages - 2) {
        middleButton.current.innerHTML = tableTotalPages - 2;
        middleButton.current.dataset.index = tableTotalPages - 3;
      } else if (current <= 3 ) {
        middleButton.current.innerHTML = 3;
        middleButton.current.dataset.index = 2;
      } else if (current >= 3 && current < tableTotalPages - 1 && tableTotalPages > paginationButtonsMax) {
        middleButton.current.innerHTML = current;
        middleButton.current.dataset.index = current - 1;
      }

      if (current > 3 && tableTotalPages > paginationButtonsMax) {
        beforeMiddleButton.current.classList.add("dots");
        beforeMiddleButton.current.removeAttribute("data-index");
        beforeMiddleButton.current.innerHTML = `...`;
      } else {
        beforeMiddleButton.current.classList.remove("dots");
        beforeMiddleButton.current.dataset.index = 1;
        beforeMiddleButton.current.innerHTML = `${2}`;       
      } 

      if (current >= tableTotalPages - 2) {
        afterMiddleButton.current.classList.remove("dots");
        afterMiddleButton.current.dataset.index = `${tableTotalPages - 2}`;
        afterMiddleButton.current.innerHTML = `${tableTotalPages - 1}`;
      } else if (tableTotalPages > paginationButtonsMax) {
        afterMiddleButton.current.classList.add("dots");
        afterMiddleButton.current.removeAttribute("data-index");
        afterMiddleButton.current.innerHTML = `...`;
      } 
    } 

    const updateNavigation = () => {
      if (tablePageIndex === tableTotalPages - 1)
        nextButton.current.classList.add('disabled');
      else 
        nextButton.current.classList.remove('disabled');
  
      if (tablePageIndex === 0)
        prevButton.current.classList.add('disabled');
      else 
        prevButton.current.classList.remove('disabled');
    }

    updatePagination();

    updateNavigation();

    setDisplayRooms([...rooms].slice((tablePageIndex * roomsPerTablePage), (tablePageIndex * roomsPerTablePage) + roomsPerTablePage));
    

  }, [tablePageIndex])
  

  return (
    <>
      <PageElementContainerStyled>
        <NewRoomButton onClick={() => navigate("/rooms/new")} styled="primary">+ New room</NewRoomButton>
      </PageElementContainerStyled>
      <RoomsTableContainer>
        <DataTable>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHeaderRowCell scope="col" colSpan={2}>Room name</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col">Bed Type</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col">Facilities</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col">Price</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col">Offer price</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col">Status</DataTableHeaderRowCell>
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {
              displayRooms.map((room) => (
                <>
                <DataTableBodyRow key={room.number} onClick={() => navigate(`/rooms/${room.id}`)}>
                  <RoomsTableBodyRowCell key={`${room.number}-photo`} className='room-photo'>
                    <figure key={`${room.number}-identification-photo-container`}>
                      <img key={`${room.number}-identification-photo-image`} src={room.photos} alt="" />
                    </figure>
                  </RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}-identification`}>
                    <RoomIdentification key={`${room.number}-identification-container`}>
                      <RoomIdentificationId key={`${room.number}-identification-id`}>{`# ${room.number.toString().padStart(6, '0')}`}</RoomIdentificationId>
                      <RoomIdentificationName key={`${room.number}-identification-name`}>{room.name}</RoomIdentificationName>
                    </RoomIdentification>
                  </RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}-type`}>{room.type}</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}-identification-facilities`}>{room.facilities}</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}-price`} className='room-price'>{`$${room.price_night}`}<span> /night</span></RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}-discount`}>{getOfferPrice(room.price_night, room.discount)}</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}-status`}>
                    <StatusButton key={`${room.number}-status-button`} styled={room.status}>{room.status}</StatusButton>
                  </RoomsTableBodyRowCell>
                </DataTableBodyRow>
                </>
              ))
            }
          </DataTableBody>
        </DataTable>
        <RoomsTablePagination>
          <PaginationInfo>{`Showed ${(tablePageIndex + 1) * roomsPerTablePage} of ${rooms.length} rooms`}</PaginationInfo>
          <NavigationButton ref={prevButton} styled="secondary" onClick={() => tablePageIndex && setTablePageIndex(tablePageIndex - 1)}>Prev</NavigationButton>
          {
            Array(tableTotalPages).fill().map((page, index) => {
              const total = tableTotalPages
              const middle = Math.floor(tableTotalPages / 2);
              const current = index + 1;
              
              if (current === 1 || current === total || total <= paginationButtonsMax)
                return <ButtonStyled key={index} data-index={current - 1} styled="primary" className={`pagination-button ${current === 1 && "active"}`} onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>{current}</ButtonStyled>
              else if (current === 2)
                return <ButtonStyled ref={beforeMiddleButton} key={index} data-index={current - 1} styled="primary" className="pagination-button" onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>{current}</ButtonStyled>
              else if (current === total - 1)
                return <ButtonStyled ref={afterMiddleButton} key={index} styled="primary" className="pagination-button dots" onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>...</ButtonStyled>
              else if (current === middle)
                return <ButtonStyled ref={middleButton} key={index} data-index={2} styled="primary" className="pagination-button middle" onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>{3}</ButtonStyled>
              else
                return <ButtonStyled key={index} className="pagination-button hide"></ButtonStyled>
            })
          }
          <NavigationButton ref={nextButton} styled="secondary" onClick={() => tablePageIndex < tableTotalPages - 1 && setTablePageIndex(tablePageIndex + 1)}>Next</NavigationButton>
        </RoomsTablePagination>
      </RoomsTableContainer>
    </>
  )
}