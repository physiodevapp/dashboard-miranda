import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { ButtonStyled } from '../ButtonStyled';
import { NavigationButton, PaginationInfo, DataTablePagination } from './DataTablePaginationStyled';

interface DataTablePaginationComponentProps {
  rowsLength: number,
  rowsPerPage: number,
  paginationButtonsMax: number,
  onTablePageChange: (pageIndex: number) => void,
  tablePageIndex?: number,
}

export const DataTablePaginationComponent = ({rowsLength, rowsPerPage = 10, paginationButtonsMax = 5, onTablePageChange, tablePageIndex = 0}: DataTablePaginationComponentProps) => {
  const [pageIndex, setPageIndex] = useState<number>(tablePageIndex);

  const prevButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const beforeMiddleButton = useRef<HTMLButtonElement>(null);
  const middleButton = useRef<HTMLButtonElement>(null);
  const afterMiddleButton = useRef<HTMLButtonElement>(null);

  const tableTotalPages: number = rowsLength%rowsPerPage === 0
    ? Math.floor(rowsLength / rowsPerPage)
    : Math.floor(rowsLength / rowsPerPage) + 1
  
  useEffect(() => {
    setPageIndex(tablePageIndex)
  }, [rowsLength])

  useEffect(() => {
    const updatePagination = (): void => {      
      const current = pageIndex + 1;

      document.querySelectorAll(".pagination-button").forEach(element => {
        element?.classList.remove('active')
      }); 
      if (current >= 3 && current < tableTotalPages - 1 && tableTotalPages > paginationButtonsMax)
        middleButton.current?.classList.add("active");
      else
        document.querySelector(`[data-index='${pageIndex}']`)?.classList.add("active")

      if (middleButton.current) {
        if (current > tableTotalPages - 2) {
          middleButton.current.innerHTML = `${tableTotalPages - 2}`;
          middleButton.current.dataset.index = (tableTotalPages - 3).toString();
        } else if (current <= 3 ) {
          middleButton.current.innerHTML = `${3}`;
          middleButton.current.dataset.index = (2).toString();
        } else if (current >= 3 && current < tableTotalPages - 1 && tableTotalPages > paginationButtonsMax) {
          middleButton.current.innerHTML = `${current}`;
          middleButton.current.dataset.index = (current - 1).toString();
        }
      }

      if (beforeMiddleButton.current) {
        if (current > 3 && tableTotalPages > paginationButtonsMax) {
          beforeMiddleButton.current.classList.add("dots");
          beforeMiddleButton.current.removeAttribute("data-index");
          beforeMiddleButton.current.innerHTML = `...`;
        } else {
          beforeMiddleButton.current.classList.remove("dots");
          beforeMiddleButton.current.dataset.index = (1).toString();
          beforeMiddleButton.current.innerHTML = `${2}`;       
        } 
      }

      if (afterMiddleButton.current) {
        if (current >= tableTotalPages - 2) {
          afterMiddleButton.current.classList.remove("dots");
          afterMiddleButton.current.dataset.index = (tableTotalPages - 2).toString();
          afterMiddleButton.current.innerHTML = `${tableTotalPages - 1}`;
        } else if (tableTotalPages > paginationButtonsMax) {
          afterMiddleButton.current.classList.add("dots");
          afterMiddleButton.current.removeAttribute("data-index");
          afterMiddleButton.current.innerHTML = `...`;
        } 
      }
    } 

    updatePagination();

    onTablePageChange(pageIndex);

  }, [pageIndex])

  return (
    <DataTablePagination>
      <PaginationInfo>
        {
          rowsLength > rowsPerPage 
          ? `Showing from ${(pageIndex * rowsPerPage) + 1} to ${(pageIndex * rowsPerPage) + rowsPerPage} (of ${rowsLength} results)`
          : `Showing ${rowsLength} results`
        }
      </PaginationInfo>
      <NavigationButton ref={prevButton} styled="secondary" className={`${tableTotalPages < 2 && "hide"} ${!pageIndex && "disabled"}`} onClick={() => pageIndex && setPageIndex(pageIndex - 1)}>Prev</NavigationButton>
        {
          Array(tableTotalPages).fill('').map((page, index) => {
            const total = tableTotalPages
            const middle = Math.floor(tableTotalPages / 2);
            const current = index + 1;
            
            if (current === 1 || current === total || total <= paginationButtonsMax)
              return <ButtonStyled key={index} data-index={current - 1} styled="primary" className={`pagination-button ${current === 1 ? "active" : ""} ${tableTotalPages < 2 ? "hide" : ""}`} onClick={(event: MouseEvent<HTMLButtonElement>) => {
                const target = event.target as HTMLButtonElement;
                target.dataset.index && setPageIndex(Number(target.dataset.index));
              }}>{ current }</ButtonStyled>
            else if (current === 2)
              return <ButtonStyled ref={beforeMiddleButton} key={index} data-index={current - 1} styled="primary" className="pagination-button" onClick={(event: MouseEvent<HTMLButtonElement>) => {
                const target = event.target as HTMLButtonElement;
                target.dataset.index && setPageIndex(Number(target.dataset.index));
              }}>{ current }</ButtonStyled>
            else if (current === total - 1)
              return <ButtonStyled ref={afterMiddleButton} key={index} styled="primary" className="pagination-button dots" onClick={(event: MouseEvent<HTMLButtonElement>) => {
                const target = event.target as HTMLButtonElement;
                target.dataset.index && setPageIndex(Number(target.dataset.index))
              }}>...</ButtonStyled>
            else if (current === middle)
              return <ButtonStyled ref={middleButton} key={index} data-index={2} styled="primary" className="pagination-button middle" onClick={(event: MouseEvent<HTMLButtonElement>) => {
                const target = event.target as HTMLButtonElement;
                target.dataset.index && setPageIndex(Number(target.dataset.index));
              }}>{3}</ButtonStyled>
            else
              return <ButtonStyled key={index} className="pagination-button hide"></ButtonStyled>
          })
        }
      <NavigationButton ref={nextButton} styled="secondary" className={`${tableTotalPages < 2 && "hide"} ${pageIndex === tableTotalPages - 1 && "disabled"}`} onClick={() => pageIndex < tableTotalPages - 1 && setPageIndex(pageIndex + 1)}>Next</NavigationButton>
    </DataTablePagination>
  )
}
