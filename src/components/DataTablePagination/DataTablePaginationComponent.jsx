import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ButtonStyled } from '../ButtonStyled';
import { NavigationButton, PaginationInfo, DataTablePagination } from './DataTablePaginationStyled';

export const DataTablePaginationComponent = ({rowsLength, rowsPerTablePage = 10, paginationButtonsMax = 5, onTablePageChange}) => {
  const [tablePageIndex, setTablePageIndex] = useState(0);

  const prevButton = useRef();
  const nextButton = useRef();
  const beforeMiddleButton = useRef();
  const middleButton = useRef();
  const afterMiddleButton = useRef();

  const tableTotalPages = Math.floor(rowsLength / rowsPerTablePage);

  useEffect(() => {
    const updatePagination = () => {      
      const current = tablePageIndex + 1;

      document.querySelectorAll(".pagination-button").forEach(element => {
        element?.classList.remove('active')
      }); 
      if (current >= 3 && current < tableTotalPages - 1 && tableTotalPages > paginationButtonsMax)
        middleButton.current.classList.add("active");
      else
        document.querySelector(`[data-index='${tablePageIndex}']`)?.classList.add("active")

      if (middleButton.current) {
        if (current > tableTotalPages - 2) {
          middleButton.current.innerHTML = tableTotalPages - 2;
          middleButton.current.dataset.index = tableTotalPages - 3;
        } else if (current <= 3 ) {
          middleButton.current.innerHTML = 3;
          middleButton.current.dataset.index = 2;
        } else if (current >= 3 && current < tableTotalPages - 1 && tableTotalPages > paginationButtonsMax) {
          middleButton.current.innerHTML = current;
          middleButton.current.dataset.index = current - 1;
        }
      }

      if (beforeMiddleButton.current) {
        if (current > 3 && tableTotalPages > paginationButtonsMax) {
          beforeMiddleButton.current.classList.add("dots");
          beforeMiddleButton.current.removeAttribute("data-index");
          beforeMiddleButton.current.innerHTML = `...`;
        } else {
          beforeMiddleButton.current.classList.remove("dots");
          beforeMiddleButton.current.dataset.index = 1;
          beforeMiddleButton.current.innerHTML = `${2}`;       
        } 
      }

      if (afterMiddleButton.current) {
        if (current >= tableTotalPages - 2) {
          afterMiddleButton.current.classList.remove("dots");
          afterMiddleButton.current.dataset.index = `${tableTotalPages - 2}`;
          afterMiddleButton.current.innerHTML = `${tableTotalPages - 1}`;
        } else if (tableTotalPages > paginationButtonsMax) {
          afterMiddleButton.current.classList.add("dots");
          afterMiddleButton.current.removeAttribute("data-index");
          afterMiddleButton.current.innerHTML = `...`;
        } 
      }
    } 

    const updateNavigation = () => {
      if (tablePageIndex === tableTotalPages - 1)
        nextButton.current.classList.add('disabled');
      else 
        nextButton.current.classList.remove('disabled');
  
      if (tablePageIndex === 0)
        prevButton.current.classList.add('disabled');
      else 
        prevButton.current.classList.remove('disabled');
    }

    updatePagination();

    updateNavigation();

    onTablePageChange(tablePageIndex);

  }, [tablePageIndex])

  return (
    <>
      <DataTablePagination>
        <PaginationInfo>{`Showing from ${(tablePageIndex + 1) * rowsPerTablePage} to ${(tablePageIndex + 1) * rowsPerTablePage + rowsPerTablePage} (of ${rowsLength})`}</PaginationInfo>
        <NavigationButton ref={prevButton} styled="secondary" onClick={() => tablePageIndex && setTablePageIndex(tablePageIndex - 1)}>Prev</NavigationButton>
          {
            Array(tableTotalPages).fill().map((page, index) => {
              const total = tableTotalPages
              const middle = Math.floor(tableTotalPages / 2);
              const current = index + 1;
              
              if (current === 1 || current === total || total <= paginationButtonsMax)
                return <ButtonStyled key={index} data-index={current - 1} styled="primary" className={`pagination-button ${current === 1 && "active"}`} onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>{current}</ButtonStyled>
              else if (current === 2)
                return <ButtonStyled ref={beforeMiddleButton} key={index} data-index={current - 1} styled="primary" className="pagination-button" onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>{current}</ButtonStyled>
              else if (current === total - 1)
                return <ButtonStyled ref={afterMiddleButton} key={index} styled="primary" className="pagination-button dots" onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>...</ButtonStyled>
              else if (current === middle)
                return <ButtonStyled ref={middleButton} key={index} data-index={2} styled="primary" className="pagination-button middle" onClick={(event) => event.target.dataset.index && setTablePageIndex(Number(event.target.dataset.index))}>{3}</ButtonStyled>
              else
                return <ButtonStyled key={index} className="pagination-button hide"></ButtonStyled>
            })
          }
        <NavigationButton ref={nextButton} styled="secondary" onClick={() => tablePageIndex < tableTotalPages - 1 && setTablePageIndex(tablePageIndex + 1)}>Next</NavigationButton>
      </DataTablePagination>
    </>
  )
}
