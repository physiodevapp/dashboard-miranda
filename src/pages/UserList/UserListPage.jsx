
import React, { useEffect, useState } from 'react'

import { FaArrowUp } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userListErrorSelect, userListStatusSelect, userListUserListSelect } from '../../features/userList/userListSlice';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { DataTableTabListComponent } from '../../components/DataTableTabs/DataTableTabListComponent';
import { DataTablePaginationComponent } from '../../components/DataTablePagination/DataTablePaginationComponent';
import { NewUserButton, UserIdentification, UserIdentificationId, UserIdentificationName, UserListTableContainer, UsersTableBodyRowCell } from './UserListStyled';
import { DataTable, DataTableBody, DataTableBodyRow, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from '../../components/DataTableStyled';
import { DataTableHeaderRowCellSortComponent } from '../../components/DataTableHeaderRowCellSortComponent';
import { MdOutlinePhone } from "react-icons/md";
import { ButtonStyled } from '../../components/ButtonStyled';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const UserListPage = () => {
  const userListDispatch = useDispatch();
  const userListUserList = useSelector(userListUserListSelect);
  const userListStatus = useSelector(userListStatusSelect);
  const userListError = useSelector(userListErrorSelect);
  const [isUpdating, setIsUpdating] = useState(false);

  const [users, setUsers] = useState(userListUserList);
  const [displayUsers, setDisplayUsers] = useState(userListUserList);

  const [sortCriteria, setSortCriteria] = useState({headerKey: 'last_name', direction: -1})

  const [activeTab, setActiveTab] = useState('');

  const [tablePageIndex, setTablePageIndex] = useState(0);

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
    const tabRows = JSON.parse(JSON.stringify(users)).filter((user) => activeTab.length ? user.status === activeTab : true);

    const sortedTabRows = sortRows(tabRows, sortCriteria);

    setDisplayUsers(sortedTabRows);
  }, [users, activeTab, sortCriteria])

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
                <DataTableBodyRow key={user.id} onClick={({target}) => {
                    if (!target.classList.contains("customClick"))
                      navigate(`/users/${user.id}`);
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
                      <UserIdentificationId key={`${user.id}_identification_id`}>{`# ${user.id}`}</UserIdentificationId>
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
                  <UsersTableBodyRowCell style={{minWidth: "50px"}}>
                    <BsThreeDotsVertical/>
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

