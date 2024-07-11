
import React, { useEffect, useState } from 'react'

import { FaArrowUp } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userListErrorSelect, userListSearchTermSelect, userListStatusSelect, userListUserListSelect } from '../../features/userList/userListSlice';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { DataTableTabListComponent } from '../../components/DataTableTabs/DataTableTabListComponent';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';
import { NewUserButton, UserIdentification, UserIdentificationId, UserIdentificationName, UserListTableContainer, UsersTableBodyRowCell } from './UserListStyled';
import { DataTable, DataTableBody, DataTableBodyRow, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from '../../components/DataTableStyled';
import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { MdOutlinePhone } from "react-icons/md";
import { ButtonStyled } from '../../components/ButtonStyled';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { userListDeleteOneThunk } from '../../features/userList/userListDeleteOneThunk';

export const UserListPage = () => {
  const userListDispatch = useDispatch();
  const userListUserList = useSelector(userListUserListSelect);
  const userListStatus = useSelector(userListStatusSelect);
  const userListError = useSelector(userListErrorSelect);
  const userListSearchTerm = useSelector(userListSearchTermSelect);

  const [sortCriteria, setSortCriteria] = useState({headerKey: 'last_name', direction: -1});
  const [activeTab, setActiveTab] = useState('');
  const [tablePageIndex, setTablePageIndex] = useState(0);
  const [users, setUsers] = useState(userListUserList);
  const [displayUsers, setDisplayUsers] = useState(userListUserList);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const usersPerTablePage = 10;

  const formatDatetime = (datetime) => {
    return new Date(Number(datetime)).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short"
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

  const deleteUser = (user) => {
    Swal.fire({
      title: "Do you want to delete the user?",
      showDenyButton: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isDenied) {        
        Swal.fire({
          title: "User deleted successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          didOpen: () => {
            userListDispatch(userListDeleteOneThunk({id: user.id, list: userListUserList}));
          }
        });
      } 
    });
  }

  useEffect(() => {
    switch (userListStatus) {
      case "idle":
        setIsUpdating(false);
        break;
      case "pending":
        setIsUpdating(true);
        break;
      case "fulfilled":
        setIsUpdating(false);

        setUsers(userListUserList);
        break;
      case "rejected":
        setIsUpdating(true);
        console.log({userListError});
        break;
      default:
        break;
    }
  }, [userListStatus]) 

  useEffect(() => {
    const filteredUsers = userListSearchTerm.length
    ? JSON.parse(JSON.stringify(users)).filter((user) => user.first_name.includes(userListSearchTerm) || user.last_name.includes(userListSearchTerm))
    : userListUserList

    const tabRows = JSON.parse(JSON.stringify(filteredUsers)).filter((user) => activeTab.length ? user.status === activeTab : true);

    const sortedTabRows = sortRows(tabRows, sortCriteria);

    setDisplayUsers(sortedTabRows);
  }, [users, activeTab, sortCriteria, userListSearchTerm])

  return (
    <>
      <PageElementContainerStyled>
        <NewUserButton onClick={() => navigate("/users/new")} styled="primary">+ New User</NewUserButton>
      </PageElementContainerStyled>
      <PageElementContainerStyled>
        <DataTableTabListComponent
          style={{marginTop: "1em"}}
          tabItems={[
            {key: '', htmlContent: 'All employee'},
            {key: 'active', htmlContent: 'Active employee'},
            {key: 'inactive', htmlContent: 'Inactive employee'}
          ]}
          onTabChange={(currentTab) => {
            setTablePageIndex(0);
            setActiveTab(currentTab);            
          }}
        />
      </PageElementContainerStyled>
      <UserListTableContainer>
        <DataTable>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHeaderRowCellSortComponent
                scope='col'                
                colSpan={2}
                className={`${sortCriteria.headerKey === 'last_name' && "active"}`}
                style={{cursor: "pointer"}}
                headerKey={'last_name'}
                toggleSortCriteria={true}
                initialSortDirection={-1}
                onSort={({header, direction}) => {
                  setSortCriteria({headerKey: header, direction})
                }}
              >
                <>
                  Name
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col" >Job description</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'                
                colSpan={1}
                className={`${sortCriteria.headerKey === 'start_date' && "active"}`}
                style={{cursor: "pointer"}}
                headerKey={'start_date'}
                toggleSortCriteria={true}
                initialSortDirection={1}
                onSort={({header, direction}) => {
                  setSortCriteria({headerKey: header, direction})
                }}
              >
                <>
                  Start date
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col" >Telephone</DataTableHeaderRowCell>
              <DataTableHeaderRowCell scope="col" colSpan={2} >Status</DataTableHeaderRowCell>
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {
              displayUsers.slice((tablePageIndex * usersPerTablePage), (tablePageIndex * usersPerTablePage) + usersPerTablePage)
              .map((user) => (
                <DataTableBodyRow 
                  key={user.id} 
                  id={`user_${user.id}`} 
                  offset={"60px"}
                  onClick={({target}) => {  
                    if (!target.closest('td'))
                      return  
                    if (target.closest('td').classList.contains("action_click") && !target.closest('td').classList.contains("slide_cell")){
                      document.querySelectorAll(`#user_${user.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      setTimeout(() => {
                        document.querySelectorAll(`#user_${user.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      }, 1500)
                    } else if (!target.closest('td').classList.contains("custom_click")) {
                      navigate(`/users/${user.id}`);
                    }
                  }}>
                  <UsersTableBodyRowCell 
                    key={`${user.id}_photo`} 
                    className='user_photo'>
                    <figure key={`${user.id}_identification_photo_container`}>
                      <img key={`${user.id}_identification_photo_image`} src={user.photo} alt="" />
                    </figure>
                  </UsersTableBodyRowCell>
                  <UsersTableBodyRowCell 
                    key={`${user.id}_identification`}
                    style={{verticalAlign: "middle"}}
                    >
                    <UserIdentification key={`${user.id}_identification_container`}>
                      <UserIdentificationName key={`${user.id}_identification_name`}>
                        { user.last_name },<br/>{ user.first_name }
                      </UserIdentificationName>
                      <UserIdentificationId key={`${user.id}_identification_id`}>{`# ${user.id.split("-")[user.id.split("-").length - 1]}`}</UserIdentificationId>
                    </UserIdentification>
                  </UsersTableBodyRowCell>
                  <UsersTableBodyRowCell>
                    <DataTableRowCellContentMultipleEllipsis lineclamp={4} width={"280px"}>
                      { user.job_description }
                    </DataTableRowCellContentMultipleEllipsis>
                  </UsersTableBodyRowCell>
                  <UsersTableBodyRowCell style={{minWidth: "200px"}}>
                    Joined on { formatDatetime(user.start_date) }
                  </UsersTableBodyRowCell>
                  <UsersTableBodyRowCell style={{minWidth:"190px"}}>
                    <MdOutlinePhone /> { user.telephone }
                  </UsersTableBodyRowCell>
                  <UsersTableBodyRowCell style={{minWidth: "100px"}}>
                    <ButtonStyled
                      styled={user.status}
                      >
                      { user.status }
                    </ButtonStyled>
                  </UsersTableBodyRowCell>
                  <UsersTableBodyRowCell 
                    style={{minWidth: "50px"}}
                    className='custom_click action_click'
                    >
                    <BsThreeDotsVertical/>
                  </UsersTableBodyRowCell>         
                  <UsersTableBodyRowCell className='action_cell custom_click'>
                    <ButtonStyled styled="deny" onClick={() => deleteUser(user)} style={{width: "45px"}}>
                      <RiDeleteBin6Line/>
                    </ButtonStyled>
                  </UsersTableBodyRowCell> 
                </DataTableBodyRow>
              ))
            }
          </DataTableBody>
        </DataTable>
      </UserListTableContainer>
      <PageElementContainerStyled>
        <DataTablePaginationComponent
          rowsLength={displayUsers.length}
          rowsPerPage={usersPerTablePage}
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

