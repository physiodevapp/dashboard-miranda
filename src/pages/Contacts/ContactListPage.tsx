import React, { useEffect, useState } from "react";
import { RecentContactListComponent } from "../../components/RecentContacts/RecentContactListComponent";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import { ContactsTableBodyRowCell, ContactsTableContainer } from "./ContactListStyled";
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from "../../components/DataTableStyled";
import { DataTablePaginationComponent } from "../../components/DataTablePagination/DataTablePaginationComponent";
import { DataTableHeaderRowCellSortComponent } from "../../components/DataTableHeaderRowCellSortComponent";
import { ButtonStyled } from "../../components/ButtonStyled";
import { DataTableTabListComponent } from "../../components/DataTableTabList/DataTableTabListComponent";
import { FaArrowUp } from "react-icons/fa6";

import { contactListErrorSelect, contactListStatusSelect, contactListcontactListSelect } from "../../features/contactList/contactListSlice";
import { contactListUpdateOneThunk } from "../../features/contactList/contactListUpdateOneThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { contactListReadListThunk } from "../../features/contactList/contactListReadListThunk";
import { ContactInterface } from "../../modelInterface";
import { BounceLoader } from "react-spinners";

export const ContactListPage = () => {
  const contactListDispatch = useAppDispatch();
  const contactListContactList = useAppSelector(contactListcontactListSelect);
  const contactListStatus = useAppSelector(contactListStatusSelect);
  const contactListError = useAppSelector(contactListErrorSelect);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [contacts, setContacts] = useState<ContactInterface[]>(contactListContactList);
  const [displayContacts, setDisplayContacts] = useState<ContactInterface[]>(contactListContactList);
  const [sortCriteria, setSortCriteria] = useState<{ headerKey: string, direction: -1 | 1 }>({headerKey: 'datetime', direction: 1})
  const [activeTab, setActiveTab] = useState<string>('');
  const [tablePageIndex, setTablePageIndex] = useState<number>(0);

  const contactsPerTablePage: number = 10;

  const formatDatetime = (datetime: string) => {
    const date = new Date(datetime);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);

    const month = date.toLocaleString('en-US', { month: 'short' });

    return `${day}-${month}-${year}`;
  } 

  const sortRows = (rows: ContactInterface[], { headerKey, direction = -1}: { headerKey: string, direction: -1 | 1 }): ContactInterface[] => {
    return rows.sort((current, next) => {
      if (current[headerKey] < next[headerKey])
        return direction

      if (current[headerKey] > next[headerKey])
        return -1 * direction
      
      return 0;
    })
  }

  useEffect(() => {
    contactListDispatch(contactListReadListThunk())
  }, [])

  useEffect(() => {
    console.log('contactListStatus ', contactListStatus);
    switch (contactListStatus) {
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
        console.log({contactListError});
        break;
      default:
        break;
    }
  }, [contactListStatus])

  useEffect(() => {
    const tabRows: ContactInterface[] = JSON.parse(JSON.stringify(contactListContactList)).filter((contact: ContactInterface) => activeTab.length ? contact.status === activeTab : true);

    const sortedTabRows: ContactInterface[] = sortRows(tabRows, sortCriteria);

    setDisplayContacts(sortedTabRows);
  }, [contactListContactList, activeTab, sortCriteria])

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
        <RecentContactListComponent/>
      </PageElementContainerStyled>
      <PageElementContainerStyled>
        <DataTableTabListComponent 
          tabItems={[
            {key: '', htmlContent: 'All contacts'},
            {key: 'archived', htmlContent: 'Archived'}
          ]}
          onTabChange={(currentTab: string) => {
            setTablePageIndex(0);
            setActiveTab(currentTab);            
          }}
        />
      </PageElementContainerStyled>
      <ContactsTableContainer>
        <DataTable>
          <DataTableHeader>
            <DataTableHeaderRow>
              <DataTableHeaderRowCell scope="col">Order ID</DataTableHeaderRowCell>
              <DataTableHeaderRowCellSortComponent
                scope='col'                
                colSpan={1}
                className={`${sortCriteria.headerKey === 'datetime' ? "active" : ""}`}
                style={{cursor: "pointer"}}
                headerKey={'datetime'}
                toggleSortCriteria={true}
                initialSortDirection={1}
                onSort={({header, direction}: {header: string, direction: -1 | 1}) => {
                  setSortCriteria({headerKey: header, direction})
                }}
              >
                <>
                  Date
                  <FaArrowUp/>
                </>
              </DataTableHeaderRowCellSortComponent>
              <DataTableHeaderRowCell scope="col">Customer</DataTableHeaderRowCell>  
              <DataTableHeaderRowCell scope="col">Comment</DataTableHeaderRowCell>  
              {
                activeTab === ''
                ? <DataTableHeaderRowCell scope="col">Action</DataTableHeaderRowCell>  
                : <></>
              }
            </DataTableHeaderRow>
          </DataTableHeader>
          <DataTableBody>
            {
              displayContacts.slice((tablePageIndex * contactsPerTablePage), (tablePageIndex * contactsPerTablePage) + contactsPerTablePage)
              .map((contact) => (
                <DataTableBodyRow key={contact.id}>
                  <DataTableBodyRowCell key={`${contact.id}-orderId`}>
                   <DataTableRowCellContentMultipleEllipsis lineclamp={1} width={"8rem"}>
                    { contact.id.slice(-8) }
                   </DataTableRowCellContentMultipleEllipsis>
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${contact.id}-date`} style={{minWidth: "14rem"}}>
                    { formatDatetime(contact.datetime) }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${contact.id}-customer`} style={{minWidth: "10rem"}}>
                    { contact.first_name }
                  </DataTableBodyRowCell>
                  <DataTableBodyRowCell key={`${contact.id}-message`}>
                    <DataTableRowCellContentMultipleEllipsis lineclamp={4}>
                      { contact.message }
                    </DataTableRowCellContentMultipleEllipsis>
                  </DataTableBodyRowCell>
                  { 
                    activeTab === ''
                    ? <ContactsTableBodyRowCell key={`${contact.id}-buttons`} style={{minWidth: "200px", display: "table-cell", position: "relative"}}>
                        <>
                          <ButtonStyled 
                            style={{width: "40%", position: "absolute", top: "1em", left: "0em"}}
                            styled="publish"
                            disabled={!!contact.status.length}
                            >
                              Publish
                          </ButtonStyled>
                          <ButtonStyled 
                            styled="archive" 
                            disabled={!!contact.status.length}
                            style={{marginLeft: "1em", width: "40%", position: "absolute", top: "1em", left: "0em", transform: "translateX(100%)"}}
                            onClick={() => {
                              const updateContact = {
                                ...contact,
                                status: "archived" as ("" | "published" | "archived")
                              }  

                              contactListDispatch(contactListUpdateOneThunk({ contact: updateContact }));
                            }}>
                              { contact.status === "archived" ? "Archived" : "Archive"}
                            </ButtonStyled>
                        </>                    
                      </ContactsTableBodyRowCell>
                    : <></>
                   }
                </DataTableBodyRow>
              ))
            }
          </DataTableBody>
        </DataTable>
      </ContactsTableContainer>
      <PageElementContainerStyled>
        <DataTablePaginationComponent
          rowsLength={displayContacts.length}
          rowsPerPage={contactsPerTablePage}
          paginationButtonsMax={5}
          onTablePageChange={(pageIndex: number) => {
            setTablePageIndex(pageIndex);
          }}
        />
      </PageElementContainerStyled>
    </>
  );
};
