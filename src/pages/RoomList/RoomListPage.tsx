
import React, { useEffect, useState, MouseEvent } from 'react'
import './RoomListStyled'
import { RoomIdentification, RoomIdentificationId, RoomIdentificationName, RoomsTableBodyRowCell, RoomsTableContainer, StatusButton } from './RoomListStyled';
import { DataTable, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableBody, DataTableBodyRow, DataTableRowCellContentMultipleEllipsis } from '../../components/DataTableStyled'
import { NewRoomButton } from './RoomListStyled';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { useNavigate } from 'react-router-dom';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';
import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { FaArrowUp } from 'react-icons/fa6';
import { BsThreeDotsVertical } from "react-icons/bs";

import { useDispatch, useSelector } from 'react-redux';
import { RoomInterface, roomListErrorSelect, roomListRoomListSelect, roomListStatusSelect } from '../../features/roomList/roomListSlice';
import { roomListReadListThunk } from '../../features/roomList/roomListReadListThunk';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ButtonStyled } from '../../components/ButtonStyled';
import Swal from 'sweetalert2';
import { roomListDeleteOneThunk } from '../../features/roomList/roomListDeleteOneThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const RoomListPage = () => {
  const roomListDispatch = useAppDispatch();
  const roomListRoomList = useAppSelector(roomListRoomListSelect);
  const roomListStatus = useAppSelector(roomListStatusSelect);
  const roomListError = useAppSelector(roomListErrorSelect);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomInterface[]>(roomListRoomList);
  const [displayRooms, setDisplayRooms] = useState<RoomInterface[]>(roomListRoomList);
  const [sortCriteria, setSortCriteria] = useState<{ headerKey: string, direction: -1 | 1 }>({headerKey: 'datetime', direction: -1})
  const [tablePageIndex, setTablePageIndex] = useState<number>(0);
  
  const navigate = useNavigate();

  const roomsPerTablePage: number = 10;
  
  const getOfferPrice = (price: number, discount: number): string => `$${Math.round(100 * (price * (discount / 100))) / 100}`;

  const sortRows = (rows: RoomInterface[], { headerKey, direction = -1}: { headerKey: string, direction: -1 | 1 }): RoomInterface[] => {
    return rows.sort((current, next) => {
      if (current[headerKey] < next[headerKey])
        return direction

      if (current[headerKey] > next[headerKey])
        return -1 * direction
      
      return 0;
    })
  }

  const deleteRoom = (room: RoomInterface): void => {
    Swal.fire({
      title: "Do you want to delete the room?",
      showDenyButton: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isDenied) {        
        Swal.fire({
          title: "Room deleted successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          didOpen: () => {
            roomListDispatch(roomListDeleteOneThunk({id: room.id, list: roomListRoomList}));
          }
        });
      } 
    });
  }

  useEffect(() => {
    roomListDispatch(roomListReadListThunk({ list: roomListRoomList }))
  }, [])

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
    const sortedRows: RoomInterface[] = sortRows([...rooms], sortCriteria);

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
                <DataTableBodyRow 
                  key={room.id} 
                  id={`room_${room.id}`} 
                  offset={"60px"}
                  onClick={(event: MouseEvent<HTMLTableRowElement>) => { 
                    const target = event.target as HTMLTableRowElement;

                    if (!target.closest('td'))
                      return    

                    if (target.closest('td')?.classList.contains("action_click") && !target.closest('td')?.classList.contains("slide_cell")){
                      document.querySelectorAll(`#room_${room.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      setTimeout(() => {
                        document.querySelectorAll(`#room_${room.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      }, 1500)
                    } else if (!target.closest('td')?.classList.contains("custom_click")) {
                      navigate(`/rooms/${room.id}`);
                    }
                  }}>
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
                  <RoomsTableBodyRowCell key={`${room.number}_identification_facilities`}>
                    <DataTableRowCellContentMultipleEllipsis width="210px" lineclamp={3}>
                      { room.facilities.join(", ") }
                    </DataTableRowCellContentMultipleEllipsis>
                  </RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_price`} className='room_price'>{`$${room.price_night}`}<span> /night</span></RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_discount`}>{ getOfferPrice(room.price_night, room.discount) }</RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell key={`${room.number}_status`}>
                    <StatusButton key={`${room.number}_status_button`} styled={room.status}>{ room.status }</StatusButton>
                  </RoomsTableBodyRowCell>
                  <RoomsTableBodyRowCell 
                    style={{minWidth: "50px"}}
                    className='custom_click action_click'
                    >
                    <BsThreeDotsVertical/>
                  </RoomsTableBodyRowCell>         
                  <RoomsTableBodyRowCell className='action_cell custom_click'>
                    <ButtonStyled styled="deny" onClick={() => deleteRoom(room)} style={{width: "45px"}}>
                      <RiDeleteBin6Line/>
                    </ButtonStyled>
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