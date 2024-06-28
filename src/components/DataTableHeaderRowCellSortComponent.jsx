
import React, { useState } from 'react'
import { DataTableHeaderRowCell } from './DataTableStyled';

export const DataTableHeaderRowCellSortComponent = ({scope = "col", colSpan = 1, rows, headerKey, headerName, onSort, initialSortCriteria = -1, toggleSortCriteria = false, className = {}, style = {}}) => {
  const [sortCriteria, setSortCriteria] = useState(initialSortCriteria);

  const sortByKey = (rows, key, criteria = -1) => {
    return rows.sort((current, next) => {
      if (current[key] < next[key])
        return criteria

      if (current[key] > next[key])
        return -1 * criteria
      
      return 0;
    })
  }

  return (
    <>
      <DataTableHeaderRowCell 
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
        { headerName }
      </DataTableHeaderRowCell>
    </>
  )
}
