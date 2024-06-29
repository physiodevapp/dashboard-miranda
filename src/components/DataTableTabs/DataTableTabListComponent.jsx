
import React, { useEffect, useState } from 'react'
import { TabItem, TabList } from './DataTableTabListStyled';

export const DataTableTabListComponent = ({tabItems, tablePageIndex = 0, rows, rowsPerPage = 10, onTabChange}) => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {  
    const tabContacts = [...rows].filter((row) => activeTab.length ? row.status === activeTab : true);
    
    const pageRows = [...tabContacts].slice((tablePageIndex * rowsPerPage), (tablePageIndex * rowsPerPage) + rowsPerPage);

    onTabChange(pageRows, activeTab);
  },[activeTab])

  return (
    <TabList>
      {
        tabItems.map((item) => (
          <TabItem
            key={ item.key } 
            className={activeTab === item.key && 'active'} 
            onClick={() => setActiveTab(item.key)}>
            { item.htmlContent }
          </TabItem>
        ))
      }
    </TabList>
  )
}

