
import React, { useEffect, useRef, useState } from 'react'
import { DataTableHeaderRowCell } from './DataTableStyled';

export const DataTableHeaderRowCellSortComponent = ({scope = "col", colSpan = 1, rows, headerKey, onSort, initialSortCriteria = -1, toggleSortCriteria = false, initialSort = false, className = {}, style = {}, children}) => {
  const [sortCriteria, setSortCriteria] = useState(initialSortCriteria);
  const headerRowCell = useRef();

  const sortByKey = (rows, key, criteria = -1) => {
    return rows.sort((current, next) => {
      if (current[key] < next[key])
        return criteria

      if (current[key] > next[key])
        return -1 * criteria
      
      return 0;
    })
  }

  useEffect(() => {
    if (initialSort)
      headerRowCell.current.click()
  }, [])

  return (
    <>
      <DataTableHeaderRowCell 
        ref={headerRowCell}
        scope={scope} 
        colSpan={colSpan} 
        className={className}
        style={style} 
        onClick={() => {
          if (toggleSortCriteria)
            setSortCriteria(-1 * sortCriteria)
          else
            setSortCriteria(initialSortCriteria);

          const criteria = toggleSortCriteria ? sortCriteria : initialSortCriteria;
          onSort(sortByKey(rows, headerKey, criteria), headerKey)
        }}>
        { children }
      </DataTableHeaderRowCell>
    </>
  )
}
