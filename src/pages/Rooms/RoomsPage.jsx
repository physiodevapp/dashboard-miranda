
import React, { useEffect, useRef, useState } from 'react'
import './RoomsStyled'
import rooms from '../../data/mock_rooms.json'
import { NavigationButton, PaginationInfo, RoomIdentification, RoomIdentificationId, RoomIdentificationName, RoomsTable, RoomsTableBody, RoomsTableBodyRow, RoomsTableBodyRowCell, RoomsTableContainer, RoomsTableHeader, RoomsTableHeaderRow, RoomsTableHeaderRowCell, RoomsTablePagination, StatusButton } from './RoomsStyled';

export const RoomsPage = () => {
  const [displayRooms, setDisplayRooms] = useState(rooms.slice(0,10))
  const [tablePageIndex, setTablePageIndex] = useState(0);
  const prevButton = useRef();
  const nextButton = useRef();

  const roomsPerTablePage = 10;
  const tableTotalPages = Math.floor(rooms.length / roomsPerTablePage)
  
  const getOfferPrice = (price, discount) => `$${Math.round(100 * (price * (discount / 100))) / 100}`

  useEffect(() => {
    setDisplayRooms([...rooms].slice((tablePageIndex * roomsPerTablePage), (tablePageIndex * roomsPerTablePage) + roomsPerTablePage))
    
    if (tablePageIndex === tableTotalPages - 1)
      nextButton.current.classList.add('disabled');
    else 
      nextButton.current.classList.remove('disabled');

    if (tablePageIndex === 0)
      prevButton.current.classList.add('disabled');
    else 
      prevButton.current.classList.remove('disabled');

  }, [tablePageIndex])
  

  return (
    <>
      <RoomsTableContainer>
        <RoomsTable>
          <RoomsTableHeader>
            <RoomsTableHeaderRow>
              <RoomsTableHeaderRowCell scope="col" colSpan={2}>Room name</RoomsTableHeaderRowCell>
              <RoomsTableHeaderRowCell scope="col">Bed Type</RoomsTableHeaderRowCell>
              <RoomsTableHeaderRowCell scope="col">Facilities</RoomsTableHeaderRowCell>
              <RoomsTableHeaderRowCell scope="col">Price</RoomsTableHeaderRowCell>
              <RoomsTableHeaderRowCell scope="col">Offer price</RoomsTableHeaderRowCell>
              <RoomsTableHeaderRowCell scope="col">Status</RoomsTableHeaderRowCell>
            </RoomsTableHeaderRow>
          </RoomsTableHeader>
          <RoomsTableBody>
            {
              displayRooms.map((room) => (
                <>
                <RoomsTableBodyRow key={room.number}>
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
                </RoomsTableBodyRow>
                </>
              ))
            }
          </RoomsTableBody>
        </RoomsTable>
        <RoomsTablePagination>
          <PaginationInfo>{`Showed ${(tablePageIndex + 1) * roomsPerTablePage} of ${rooms.length} rooms`}</PaginationInfo>
          <NavigationButton ref={prevButton} styled="secondary" onClick={() => tablePageIndex && setTablePageIndex(tablePageIndex - 1)}>Prev</NavigationButton>
          <NavigationButton ref={nextButton} styled="secondary" onClick={() => tablePageIndex < tableTotalPages - 1 && setTablePageIndex(tablePageIndex + 1)}>Next</NavigationButton>
        </RoomsTablePagination>
      </RoomsTableContainer>
    </>
  )
}