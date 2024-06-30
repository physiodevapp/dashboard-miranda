import React, { useEffect, useState } from "react";
import { RecentContactsComponent } from "../../components/RecentContacts/RecentContactsComponent";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import dataContacts from "../../data/mock_contacts.json";
import { ContactsTableBodyRowCell, ContactsTableContainer } from "./ContactsStyled";
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from "../../components/DataTableStyled";
import { DataTablePaginationComponent } from "../../components/DataTablePagination/DataTablePaginationComponent";
import { DataTableHeaderRowCellSortComponent } from "../../components/DataTableHeaderRowCellSortComponent";
import { ButtonStyled } from "../../components/ButtonStyled";
import { DataTableTabListComponent } from "../../components/DataTableTabs/DataTableTabListComponent";
import { FaArrowUp } from "react-icons/fa6";

export const ContactsPage = () => {
  const [contacts, setContacts] = useState(dataContacts);
  const [displayContacts, setDisplayContacts] = useState(dataContacts);
  const [sortByHeaderKey, setSortByHeaderKey] = useState('datetime');
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

  return (
    <>
      <PageElementContainerStyled>
        <RecentContactsComponent />
      </PageElementContainerStyled>
      <PageElementContainerStyled>
        <DataTableTabListComponent 
          tabItems={[
            {key: '', htmlContent: 'All contacts'},
            {key: 'published', htmlContent: 'Published'},
            {key: 'archived', htmlContent: 'Archived'}
          ]}
          rows={contacts}
          tablePageIndex={tablePageIndex}
          rowsPerPage={10}
          onTabChange={(currentTab, tabRows) => {
            setTablePageIndex(0);
            setDisplayContacts(tabRows)
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
                className={`${sortByHeaderKey === 'datetime' && "active"}`}
                style={{cursor: "pointer"}}
                rows={JSON.parse(JSON.stringify(contacts)).filter((contact) => activeTab.length ? contact.status === activeTab : true)}
                activeTab={activeTab}
                headerKey={'datetime'}
                toggleSortCriteria={true}
                initialSort={true}
                onSort={(sortedRows, key) => {
                  setDisplayContacts(sortedRows);
                  setSortByHeaderKey(key);
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
                            onClick={() => {
                              const updateContacts = JSON.parse(JSON.stringify(contacts)).map((item) => {
                                return {
                                  ...item,
                                  "status": item.id === contact.id ? item.status = "published" : item.status
                                }
                              })
                              setContacts(updateContacts);
                            }}>
                              Publish
                          </ButtonStyled>
                          <ButtonStyled 
                            styled="archive" 
                            style={{marginLeft: "1em"}}
                            onClick={() => {
                              const updateContacts = JSON.parse(JSON.stringify(contacts)).map((item) => {
                                return {
                                  ...item,
                                  "status": item.id === contact.id ? item.status = "archived" : item.status
                                }
                              })
                              setContacts(updateContacts);
                            }}>
                              Archive
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
