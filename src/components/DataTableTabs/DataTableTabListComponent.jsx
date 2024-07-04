
import React, { useEffect, useState } from 'react'
import { TabItem, TabList } from './DataTableTabListStyled';

export const DataTableTabListComponent = ({tabItems, onTabChange}) => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {  
    
    onTabChange(activeTab);

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

