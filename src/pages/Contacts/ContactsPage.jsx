import React, { useEffect, useState } from "react";
import { RecentContactsComponent } from "../../components/RecentContacts/RecentContactsComponent";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import contacts from "../../data/mock_contacts.json"
import { ContactTab, ContactsTableBodyRowCell, ContactsTableContainer, ContactsTabs } from "./ContactsStyled";
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from "../../components/DataTableStyled";
import { DataTablePaginationComponent } from "../../components/DataTablePagination/DataTablePaginationComponent";
import { DataTableHeaderRowCellSortComponent } from "../../components/DataTableHeaderRowCellSortComponent";
import { ButtonStyled } from "../../components/ButtonStyled";
import { DataTableTabListComponent } from "../../components/DataTableTabs/DataTableTabListComponent";

export const ContactsPage = () => {
  const [displayContacts, setDisplayContacts] = useState([])
  const [sortByHeaderKey, setSortByHeaderKey] = useState('datetime');

  const [activeTab, setActiveTab] = useState('')

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
          rowsPerPage={10}
          onTabChange={(tablePageRows, currentTab) => {
            setDisplayContacts(tablePageRows);
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
                rows={[...contacts].filter((contact) => activeTab.length ? contact.status === activeTab : true)}
                headerKey={'datetime'}
                toggleSortCriteria={true}
                initialSortCriteria={1}
                initialSort={true}
                onSort={(displayRows, key) => {
                  setDisplayContacts(displayRows.slice(0, contactsPerTablePage));
                  setSortByHeaderKey(key);
                }}
              >Date</DataTableHeaderRowCellSortComponent>
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
              displayContacts.map((contact) => (
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
                          <ButtonStyled styled="publish">Publish</ButtonStyled>
                          <ButtonStyled styled="archive" style={{marginLeft: "1em"}}>Archive</ButtonStyled>
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
          rows={[...contacts].filter((contact) => activeTab.length ? contact.status === activeTab : true)}
          rowsPerPage={contactsPerTablePage}
          paginationButtonsMax={5}
          onTablePageChange={(tablePageRows) => {
            setDisplayContacts(tablePageRows);
          }}
        />
      </PageElementContainerStyled>
    </>
  );
};
