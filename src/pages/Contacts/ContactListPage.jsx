import React, { useEffect, useState } from "react";
import { RecentContactListComponent } from "../../components/RecentContacts/RecentContactListComponent";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import { ContactsTableBodyRowCell, ContactsTableContainer } from "./ContactListStyled";
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from "../../components/DataTableStyled";
import { DataTablePaginationComponent } from "../../components/DataTablePagination/DataTablePaginationComponent";
import { DataTableHeaderRowCellSortComponent } from "../../components/DataTableHeaderRowCellSortComponent";
import { ButtonStyled } from "../../components/ButtonStyled";
import { DataTableTabListComponent } from "../../components/DataTableTabs/DataTableTabListComponent";
import { FaArrowUp } from "react-icons/fa6";

//import dataContacts from "../../data/mock_contacts.json";
import { useDispatch, useSelector } from "react-redux";
import { contactListErrorSelect, contactListStatusSelect, contactListcontactListSelect } from "../../features/contactList/contactListSlice";
import { contactListUpdateOneThunk } from "../../features/contactList/contactListUpdateOneThunk";

export const ContactListPage = () => {
  const contactListDispatch = useDispatch();
  const contactListContactList = useSelector(contactListcontactListSelect);
  const contactListStatus = useSelector(contactListStatusSelect);
  const contactListError = useSelector(contactListErrorSelect);
  const [isUpdating, setIsUpdating] = useState(false);

  const [contacts, setContacts] = useState(contactListContactList);
  const [displayContacts, setDisplayContacts] = useState(contactListContactList);

  const [sortCriteria, setSortCriteria] = useState({headerKey: 'datetime', direction: -1})
  
  const [activeTab, setActiveTab] = useState('');

  const [tablePageIndex, setTablePageIndex] = useState(0);

  const contactsPerTablePage = 10;

  const formatDatetime = (datetime) => {
    return new Date(Number(datetime)).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      hour12: true,
      hour:"2-digit",
      minute: "2-digit"
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
    const tabRows = JSON.parse(JSON.stringify(contacts)).filter((contact) => activeTab.length ? contact.status === activeTab : true);

    const sortedTabRows = sortRows(tabRows, sortCriteria);

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
          onTabChange={(currentTab) => {
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
                className={`${sortCriteria.headerKey === 'datetime' && "active"}`}
                style={{cursor: "pointer"}}
                activeTab={activeTab}
                headerKey={'datetime'}
                toggleSortCriteria={true}
                initialSortDirection={1}
                onSort={({header, direction}) => {
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
                    { contact.id }
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
                            disabled={contact.status.length}
                            >
                              Publish
                          </ButtonStyled>
                          <ButtonStyled 
                            styled="archive" 
                            disabled={contact.status.length}
                            style={{marginLeft: "1em"}}
                            onClick={() => {
                              const updateContact = {
                                ...contact,
                                "status": "archived"
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
          onTablePageChange={(pageIndex) => {
            setTablePageIndex(pageIndex);
          }}
        />
      </PageElementContainerStyled>
    </>
  );
};
