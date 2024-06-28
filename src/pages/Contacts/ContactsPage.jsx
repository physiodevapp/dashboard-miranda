import React, { useEffect, useState } from "react";
import { RecentContactsComponent } from "../../components/RecentContacts/RecentContactsComponent";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import contacts from "../../data/mock_contacts.json"
import { ContactsTableBodyRowCell, ContactsTableContainer } from "./ContactsStyled";
import { DataTable, DataTableBody, DataTableBodyRow, DataTableBodyRowCell, DataTableHeader, DataTableHeaderRow, DataTableHeaderRowCell, DataTableRowCellContentMultipleEllipsis } from "../../components/DataTableStyled";
import { DataTablePaginationComponent } from "../../components/DataTablePagination/DataTablePaginationComponent";
import { DataTableHeaderRowCellSortComponent } from "../../components/DataTableHeaderRowCellSortComponent";
import { ButtonStyled } from "../../components/ButtonStyled";

export const ContactsPage = () => {
  const [displayContacts, setDisplayContacts] = useState([])
  const [tablePageIndex, setTablePageIndex] = useState(0);
  const [sortByHeaderKey, setSortByHeaderKey] = useState('datetime');

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

  useEffect(() => {
    setDisplayContacts([...contacts].slice((tablePageIndex * contactsPerTablePage), (tablePageIndex * contactsPerTablePage) + contactsPerTablePage));    

  }, [tablePageIndex]) 

  return (
    <>
      <PageElementContainerStyled>
        <RecentContactsComponent />
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
                rows={contacts}
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
              <DataTableHeaderRowCell scope="col">Action</DataTableHeaderRowCell>        
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
                  <ContactsTableBodyRowCell key={`${contact.id}-buttons`}>
                    <>
                      <ButtonStyled styled="publish">Publish</ButtonStyled>
                      <ButtonStyled styled="archive" style={{marginLeft: "1em"}}>Archive</ButtonStyled>
                    </>                    
                  </ContactsTableBodyRowCell>
                </DataTableBodyRow>
              ))
            }
          </DataTableBody>
        </DataTable>
      </ContactsTableContainer>
      <PageElementContainerStyled>
        <DataTablePaginationComponent
          rowsLength={contacts.length}
          rowsPerTablePage={contactsPerTablePage}
          paginationButtonsMax={5}
          onTablePageChange={(tablePageIndex) => setTablePageIndex(tablePageIndex)}
        />
      </PageElementContainerStyled>
    </>
  );
};
