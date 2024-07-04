
import React, { useEffect, useRef, useState } from 'react'
import { DataTableHeaderRowCell } from './DataTableStyled';

export const DataTableHeaderRowCellSortComponent = ({scope = "col", colSpan = 1, headerKey, onSort, initialSortDirection = -1, toggleSortCriteria = false, className = {}, style = {}, children}) => {
  const [sortCriteria, setSortCriteria] = useState({header: headerKey, direction: initialSortDirection});
  const headerRowCell = useRef();

  return (
    <>
      <DataTableHeaderRowCell 
        ref={headerRowCell}
        scope={scope} 
        colSpan={colSpan} 
        className={`${className} ${sortCriteria.direction === -1 ? 'down' : 'up'}`}
        style={style} 
        onClick={() => {
          const updateSortCriteria = JSON.parse(JSON.stringify(sortCriteria));

          if (toggleSortCriteria)
            updateSortCriteria.direction = -1 * sortCriteria.direction
          else
            updateSortCriteria.direction = initialSortDirection          

          setSortCriteria(updateSortCriteria);

          onSort(updateSortCriteria);
        }}>
        { children }
      </DataTableHeaderRowCell>
    </>
  )
}
