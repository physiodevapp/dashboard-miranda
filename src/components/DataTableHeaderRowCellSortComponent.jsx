
import React, { useEffect, useRef, useState } from 'react'
import { DataTableHeaderRowCell } from './DataTableStyled';

export const DataTableHeaderRowCellSortComponent = ({scope = "col", colSpan = 1, headerKey, onSort, initialSortDirection = -1, toggleSortCriteria = false, activeTab, className = {}, style = {}, children}) => {
  const [sortCriteria, setSortCriteria] = useState({header: headerKey, direction: initialSortDirection});
  const headerRowCell = useRef();

  useEffect(() => {

    onSort(sortCriteria);
    
  }, [sortCriteria, activeTab])

  return (
    <>
      <DataTableHeaderRowCell 
        ref={headerRowCell}
        scope={scope} 
        colSpan={colSpan} 
        className={`${className} ${sortCriteria.direction === -1 ? 'down' : 'up'}`}
        style={style} 
        onClick={() => {
          if (toggleSortCriteria)
            setSortCriteria({...sortCriteria, direction: -1 * sortCriteria.direction})
          else
            setSortCriteria({header: headerKey, direction: initialSortDirection});
        }}>
        { children }
      </DataTableHeaderRowCell>
    </>
  )
}
