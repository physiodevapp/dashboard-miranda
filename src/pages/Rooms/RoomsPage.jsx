
import React, { useEffect, useState } from 'react'
import './RoomsStyled'
import dataRooms from '../../data/mock_rooms.json'
import { RoomIdentification, RoomIdentificationId, RoomIdentificationName, RoomsTableBodyRowCell, RoomsTableContainer, StatusButton } from './RoomsStyled';
import { DataTable, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableBody, DataTableBodyRow } from '../../components/DataTableStyled'
import { NewRoomButton } from './RoomsStyled';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { useNavigate } from 'react-router-dom';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';
import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { FaArrowUp } from 'react-icons/fa6';

export const RoomsPage = () => {
  const [rooms, setRooms] = useState(dataRooms);
  const [displayRooms, setDisplayRooms] = useState(dataRooms);
  const [sortByHeaderKey, setSortByHeaderKey] = useState('number');
  const navigate = useNavigate();
  const [tablePageIndex, setTablePageIndex] = useState(0);
  
  const roomsPerTablePage = 10;
  
  const getOfferPrice = (price, discount) => `$${Math.round(100 * (price * (discount / 100))) / 100}`;

  return (
    <>
      <PageElementContainerStyled>
        <NewRoomButton onClick={() => navigate("/rooms/new")} styled="primary">+ New room</NewRoomButton>
      </PageElementContainerStyled>
      <RoomsTableContainer>
        <DataTable>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHeaderRowCellSortComponent
                scope='col'
                colSpan={2}
                className={`${sortByHeaderKey === 'number' && "active"}`}
                style={{cursor: "pointer"}}
                rows={JSON.parse(JSON.stringify(rooms))}
                headerKey={'number'}
                initialSort={true}
                onSort={(sortedRows, key) => {
                  setDisplayRooms(sortedRows);
                  setSortByHeaderKey(key);
                }}
              >
                <>
                  Room name
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col">Bed Type</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col">Facilities</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'
                colSpan={1}
                className={`${sortByHeaderKey === 'price_night' && "active"}`}
                style={{cursor: "pointer"}}
                rows={JSON.parse(JSON.stringify(rooms))}
                headerKey={'price_night'}
                toggleSortCriteria={true}
                onSort={(sortedRows, key) => {
                  setDisplayRooms(sortedRows);
                  setSortByHeaderKey(key);
                }}
              >
                <>
                  Price
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col">Offer price</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'
                colSpan={1}
                className={`${sortByHeaderKey === 'status' && "active"}`}
                style={{cursor: "pointer"}}
                rows={JSON.parse(JSON.stringify(rooms))}
                headerKey={'status'}
                onSort={(sortedRows, key) => {
                  setDisplayRooms(sortedRows);
                  setSortByHeaderKey(key);
                }}
              >
                <>
                  Date
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {
              displayRooms.slice((tablePageIndex * roomsPerTablePage), (tablePageIndex * roomsPerTablePage) + roomsPerTablePage)
              .map((room) => (
                <DataTableBodyRow key={room.number} onClick={() => navigate(`/rooms/${room.id}`)}>
                  <RoomsTableBodyRowCell key={`${room.number}-photo`} className='room-photo'>
                    <figure key={`${room.number}-identification-photo-container`}>
                      <img key={`${room.number}-identification-photo-image`} src={room.photos[0]} alt="" />
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
                  <RoomsTableBodyRowCell key={`${room.number}-discount`}>{ getOfferPrice(room.price_night, room.discount) }</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}-status`}>
                    <StatusButton key={`${room.number}-status-button`} styled={room.status}>{ room.status }</StatusButton>
                  </RoomsTableBodyRowCell>
                </DataTableBodyRow>
              ))
            }
          </DataTableBody>
        </DataTable>
      </RoomsTableContainer>
      <PageElementContainerStyled>
        <DataTablePaginationComponent
          rowsLength={displayRooms.length}
          rowsPerPage={roomsPerTablePage}
          paginationButtonsMax={5}
          onTablePageChange={(pageIndex) => {
            setTablePageIndex(pageIndex);
          }}
        />
      </PageElementContainerStyled>
    </>
  )
}