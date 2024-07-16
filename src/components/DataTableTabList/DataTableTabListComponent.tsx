
import React, { useEffect, useState } from 'react'
import { TabItem, TabList } from './DataTableTabListStyled';

interface TabItemInterface {
  key: string,
  htmlContent: string,
}

interface DataTableTabListComponentProps {
  style?: {},
  tabItems: TabItemInterface[],
  onTabChange: (activeTab: string) => void,
}

export const DataTableTabListComponent = ({style = {}, tabItems, onTabChange}: DataTableTabListComponentProps) => {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {  
    
    onTabChange(activeTab);

  },[activeTab])

  return (
    <TabList style={style}>
      {
        tabItems.map((item) => (
          <TabItem
            key={ item.key } 
            className={activeTab === item.key ? 'active' : ''} 
            onClick={() => setActiveTab(item.key)}>
            { item.htmlContent }
          </TabItem>
        ))
      }
    </TabList>
  )
}

