
import React, { useEffect, useState } from 'react'
import './RoomListStyled'
import { RoomIdentification, RoomIdentificationId, RoomIdentificationName, RoomsTableBodyRowCell, RoomsTableContainer, StatusButton } from './RoomListStyled';
import { DataTable, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableBody, DataTableBodyRow } from '../../components/DataTableStyled'
import { NewRoomButton } from './RoomListStyled';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { useNavigate } from 'react-router-dom';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';
import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { FaArrowUp } from 'react-icons/fa6';
import { BsThreeDotsVertical } from "react-icons/bs";

import { useDispatch, useSelector } from 'react-redux';
import { roomListErrorSelect, roomListRoomListSelect, roomListStatusSelect } from '../../features/roomList/roomListSlice';
import { roomListReadListThunk } from '../../features/roomList/roomListReadListThunk';

export const RoomListPage = () => {
  const roomListDispatch = useDispatch();
  const roomListRoomList = useSelector(roomListRoomListSelect);
  const roomListStatus = useSelector(roomListStatusSelect);
  const roomListError = useSelector(roomListErrorSelect);
  const [isUpdating, setIsUpdating] = useState(false);

  const [rooms, setRooms] = useState(roomListRoomList);
  const [displayRooms, setDisplayRooms] = useState(roomListRoomList);

  const [sortCriteria, setSortCriteria] = useState({headerKey: 'datetime', direction: -1})
  
  const navigate = useNavigate();

  const [tablePageIndex, setTablePageIndex] = useState(0);
  
  const roomsPerTablePage = 10;
  
  const getOfferPrice = (price, discount) => `$${Math.round(100 * (price * (discount / 100))) / 100}`;

  const sortRows = (rows, { headerKey: key, direction: criteria = -1}) => {
    return rows.sort((current, next) => {
      if (current[key] < next[key])
        return criteria

      if (current[key] > next[key])
        return -1 * criteria
      
      return 0;
    })
  }

  useEffect(() => {
    switch (roomListStatus) {
      case "idle":
        setIsUpdating(false);
        break;
      case "pending":
        setIsUpdating(true);
        break;
      case "fulfilled":
        setIsUpdating(false);

        setRooms(roomListRoomList);
        break;
      case "rejected":
        setIsUpdating(true);
        console.log({roomListError});
        break;
      default:
        break;
    }
  }, [roomListStatus])

  useEffect(() => {
    console.log({sortCriteria});
    const sortedRows = sortRows([...rooms], sortCriteria);

    setDisplayRooms(sortedRows);
  }, [rooms, sortCriteria])
  

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
                className={`${sortCriteria.headerKey === 'number' && "active"}`}
                style={{cursor: "pointer"}}
                headerKey={'number'}
                onSort={({header, direction}) => {
                  setSortCriteria({
                    headerKey: header, 
                    direction
                  })
                }}
              >
                <>
                  Room name
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col"style={{width: "8em"}} >Bed Type</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col">Facilities</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'
                colSpan={1}
                className={`${sortCriteria.headerKey === 'price_night' && "active"}`}
                style={{width: "8em", cursor: "pointer"}}
                headerKey={'price_night'}
                toggleSortCriteria={true}
                onSort={({header, direction}) => {
                  setSortCriteria({
                    headerKey: header, 
                    direction
                  })
                }}
              >
                <>
                  Price
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col" style={{width: "8em"}}>Offer price</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'
                colSpan={2}
                className={`${sortCriteria.headerKey === 'status' && "active"}`}
                style={{width: "10em", cursor: "pointer"}}
                headerKey={'status'}
                onSort={({header, direction}) => {
                  setSortCriteria({
                    headerKey: header, 
                    direction
                  })
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
                  <RoomsTableBodyRowCell key={`${room.number}_photo`} className='room_photo'>
                    <figure key={`${room.number}_identification_photo_container`}>
                      <img key={`${room.number}_identification_photo_image`} src={room.photos[0]} alt="" />
                    </figure>
                  </RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_identification`}>
                    <RoomIdentification key={`${room.number}_identification_container`}>
                      <RoomIdentificationId key={`${room.number}_identification_id`}>{`# ${room.number.toString().padStart(6, '0')}`}</RoomIdentificationId>
                      <RoomIdentificationName key={`${room.number}_identification_name`}>{room.name}</RoomIdentificationName>
                    </RoomIdentification>
                  </RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_type`}>{room.type}</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_identification_facilities`}>{room.facilities.join(", ")}</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_price`} className='room_price'>{`$${room.price_night}`}<span> /night</span></RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_discount`}>{ getOfferPrice(room.price_night, room.discount) }</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_status`}>
                    <StatusButton key={`${room.number}_status_button`} styled={room.status}>{ room.status }</StatusButton>
                  </RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell style={{minWidth: "4em"}}>
                    <BsThreeDotsVertical/>
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