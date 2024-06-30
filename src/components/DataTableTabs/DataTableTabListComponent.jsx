
import React, { useEffect, useState } from 'react'
import { TabItem, TabList } from './DataTableTabListStyled';

export const DataTableTabListComponent = ({tabItems, tablePageIndex = 0, rows, rowsPerPage = 10, onTabChange}) => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {  
    const tabRows = [...rows].filter((row) => activeTab.length ? row.status === activeTab : true);
    
    const pageRows = [...tabRows].slice((tablePageIndex * rowsPerPage), (tablePageIndex * rowsPerPage) + rowsPerPage);

    onTabChange(activeTab, tabRows, pageRows);
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

