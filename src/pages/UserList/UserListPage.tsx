
import React, { useEffect, useState, MouseEvent } from 'react'

import { FaArrowUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { resetUserStatusError, userListErrorSelect, userListSearchTermSelect, userListStatusSelect, userListUserListSelect } from '../../features/userList/userListSlice';
import { PageElementContainerStyled } from '../../components/PageElementContainerStyled';
import { DataTableTabListComponent } from '../../components/DataTableTabList/DataTableTabListComponent';
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
import { userListReadListThunk } from "../../features/userList/userListReadListThunk";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserInterface } from '../../modelInterface';
import { BounceLoader } from 'react-spinners';

export const UserListPage = () => {
  const userListDispatch = useAppDispatch();
  const userListUserList = useAppSelector(userListUserListSelect);
  const userListStatus = useAppSelector(userListStatusSelect);
  const userListError = useAppSelector(userListErrorSelect);
  const userListSearchTerm = useAppSelector(userListSearchTermSelect);

  const [sortCriteria, setSortCriteria] = useState<{ headerKey: string, direction: -1 | 1 }>({headerKey: 'last_name', direction: -1});
  const [activeTab, setActiveTab] = useState<string>('');
  const [tablePageIndex, setTablePageIndex] = useState<number>(0);
  const [displayUsers, setDisplayUsers] = useState<UserInterface[]>(userListUserList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const usersPerTablePage: number = 10;

  const formatDatetime = (datetime: string): string => {
    return new Date(datetime).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short"
    });
  } 

  const sortRows = (rows: UserInterface[], { headerKey, direction = -1}: { headerKey: string, direction: -1 | 1 }): UserInterface[] => {
    return rows.sort((current, next) => {
      if (current[headerKey] < next[headerKey])
        return direction

      if (current[headerKey] > next[headerKey])
        return -1 * direction
      
      return 0;
    })
  }

  const deleteUser = (user: UserInterface): void => {
    Swal.fire({
      title: "Do you want to delete the user?",
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
          const resultAction = await userListDispatch(userListDeleteOneThunk({id: user.id as string}));

          // Check if the action was rejected
          if (userListDeleteOneThunk.rejected.match(resultAction)) {
            // Handle the error from the thunk
            throw new Error(resultAction.payload || 'Delete failed');
          }

          Swal.fire({
            title: "Room deleted successfully",
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
      userListDispatch(resetUserStatusError());
    });
  }

  useEffect(() => {
    userListDispatch(userListReadListThunk())
  }, [])

  useEffect(() => {
    switch (userListStatus) {
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
        console.log({userListError});
        break;
      default:
        break;
    }
  }, [userListStatus]) 

  useEffect(() => {
    const filteredUsers: UserInterface[] = userListSearchTerm.length
    ? JSON.parse(JSON.stringify(userListUserList)).filter((user: UserInterface) => user.first_name.toLowerCase().includes(userListSearchTerm.toLowerCase()) || user.last_name.toLowerCase().includes(userListSearchTerm.toLowerCase()))
    : userListUserList
    
    const tabRows = JSON.parse(JSON.stringify(filteredUsers)).filter((user: UserInterface) => activeTab.length ? user.status === activeTab : true);

    const sortedTabRows = sortRows(tabRows, sortCriteria);

    setDisplayUsers(sortedTabRows);
  }, [userListUserList, activeTab, sortCriteria, userListSearchTerm])

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
                  nfirstchildren={2}
                  onClick={(event: MouseEvent<HTMLTableRowElement>) => {  
                    const target = event.target as HTMLTableRowElement;

                    if (!target.closest('td'))
                      return  

                    if (target.closest('td')?.classList.contains("action_click") && !target.closest('td')?.classList.contains("slide_cell")){
                      document.querySelectorAll(`#user_${user.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      setTimeout(() => {
                        document.querySelectorAll(`#user_${user.id} > td`).forEach((htmlElement) => htmlElement.classList.toggle('slide_cell'));
                      }, 1500)
                    } else if (!target.closest('td')?.classList.contains("custom_click")) {
                      navigate(`/users/${user.id}`);
                    }
                  }}>
                  <UsersTableBodyRowCell 
                    key={`${user.id}_photo`}
                    defaultphoto={ user.photo.includes('iconpacks') ? "true" : "false" }
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
                      <UserIdentificationId key={`${user.id}_identification_id`}>{`# ${user.id?.slice(-8)}`}</UserIdentificationId>
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

