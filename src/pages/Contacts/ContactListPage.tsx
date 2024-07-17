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

import { useDispatch, useSelector } from "react-redux";
import { ContactInterface, contactListErrorSelect, contactListStatusSelect, contactListcontactListSelect } from "../../features/contactList/contactListSlice";
import { contactListUpdateOneThunk } from "../../features/contactList/contactListUpdateOneThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { contactListReadListThunk } from "../../features/contactList/contactListReadListThunk";

export const ContactListPage = () => {
  const contactListDispatch = useAppDispatch();
  const contactListContactList = useAppSelector(contactListcontactListSelect);
  const contactListStatus = useAppSelector(contactListStatusSelect);
  const contactListError = useAppSelector(contactListErrorSelect);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [contacts, setContacts] = useState<ContactInterface[]>(contactListContactList);
  const [displayContacts, setDisplayContacts] = useState<ContactInterface[]>(contactListContactList);
  const [sortCriteria, setSortCriteria] = useState<{ headerKey: string, direction: -1 | 1 }>({headerKey: 'datetime', direction: 1})
  const [activeTab, setActiveTab] = useState<string>('');
  const [tablePageIndex, setTablePageIndex] = useState<number>(0);

  const contactsPerTablePage: number = 10;

  const formatDatetime = (datetime: string) => {
    return new Date(Number(datetime)).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      hour12: true,
      hour:"2-digit",
      minute: "2-digit"
    });
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
    contactListDispatch(contactListReadListThunk({ list: contactListContactList }))
  }, [])

  useEffect(() => {
    switch (contactListStatus) {
      case "idle":
        setIsUpdating(false);
        break;
      case "pending":
        setIsUpdating(true);
        break;
      case "fulfilled":
        setIsUpdating(false);

        setContacts(contactListContactList);
        break;
      case "rejected":
        setIsUpdating(true);
        console.log({contactListError});
        break;
      default:
        break;
    }
  }, [contactListStatus])

  useEffect(() => {
    const tabRows: ContactInterface[] = JSON.parse(JSON.stringify(contacts)).filter((contact: ContactInterface) => activeTab.length ? contact.status === activeTab : true);

    const sortedTabRows: ContactInterface[] = sortRows(tabRows, sortCriteria);

    setDisplayContacts(sortedTabRows);
  }, [contacts, activeTab, sortCriteria])

  return (
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
                    { contact.id.split("-")[contact.id.split("-").length - 1] }
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
                    ? <ContactsTableBodyRowCell key={`${contact.id}-buttons`}>
                        <>
                          <ButtonStyled 
                            styled="publish"
                            disabled={!!contact.status.length}
                            >
                              Publish
                          </ButtonStyled>
                          <ButtonStyled 
                            styled="archive" 
                            disabled={!!contact.status.length}
                            style={{marginLeft: "1em"}}
                            onClick={() => {
                              const updateContact = {
                                ...contact,
                                status: "archived" as ("" | "published" | "archived")
                              }  

                              contactListDispatch(contactListUpdateOneThunk({
                                contact: updateContact, 
                                list: contactListContactList
                              })) 
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
