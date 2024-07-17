
import React, { ReactNode, useRef, useState } from 'react'
import { DataTableHeaderRowCell } from './DataTableStyled';

interface SortCriteriaInterface {
  header: string,
  direction: -1 | 1,
}

interface DataTableHeaderRowCellSortComponentProps {
  scope: "col" | "row",
  colSpan: number,
  headerKey: string,
  onSort: (sortCriteria: SortCriteriaInterface) => void,
  initialSortDirection?: (-1 | 1),
  toggleSortCriteria?: boolean,
  className: {},
  style: {},
  children: ReactNode, 
}

export const DataTableHeaderRowCellSortComponent = ({scope = "col", colSpan = 1, headerKey, onSort, initialSortDirection = -1, toggleSortCriteria = false, className = {}, style = {}, children}: DataTableHeaderRowCellSortComponentProps) => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteriaInterface>({header: headerKey, direction: initialSortDirection});
  const headerRowCell = useRef<HTMLTableCellElement>(null);

  return (
    <>
      <DataTableHeaderRowCell 
        ref={headerRowCell}
        scope={scope} 
        colSpan={colSpan} 
        className={`${className} ${sortCriteria.direction === -1 ? 'down' : 'up'}`}
        style={style} 
        onClick={() => {
          const updateSortCriteria: SortCriteriaInterface = JSON.parse(JSON.stringify(sortCriteria));

          if (toggleSortCriteria)
            updateSortCriteria.direction = ((-1 * sortCriteria.direction) as -1 | 1)
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
