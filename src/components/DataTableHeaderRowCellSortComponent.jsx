
import React, { useEffect, useRef, useState } from 'react'
import { DataTableHeaderRowCell } from './DataTableStyled';

export const DataTableHeaderRowCellSortComponent = ({scope = "col", colSpan = 1, rows, headerKey, onSort, initialSortDirection = -1, toggleSortCriteria = false, initialSort = false, activeTab, className = {}, style = {}, children}) => {
  const [sortCriteria, setSortCriteria] = useState({header: headerKey, direction: initialSortDirection});
  const headerRowCell = useRef();

  const sortByKey = (rows, key, criteria = initialSortDirection) => {
    return rows.sort((current, next) => {
      if (current[key] < next[key])
        return criteria

      if (current[key] > next[key])
        return -1 * criteria
      
      return 0;
    })
  }

  useEffect(() => {
    const sortedRows = sortByKey(rows, sortCriteria.header, sortCriteria.direction);
    onSort(sortedRows, sortCriteria.header);
  }, [sortCriteria, activeTab])

  useEffect(() => {
    if (initialSort)
      headerRowCell.current.click();
  }, [])

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
