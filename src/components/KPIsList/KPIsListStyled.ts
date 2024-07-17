import styled from "styled-components";

export const KPIsList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2em;
  padding: 0em 0em 1em 0em;
  margin-bottom: 1em;
  overflow-x: auto;
  font-family: "Poppins";
  
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: grab;
  }
  &::-webkit-scrollbar-thumb:horizontal {
    border-radius: 10px;
  }
`

export const KPIsItem = styled.li`
  background-color: white;
  min-height: 113.6px;
  padding: 1.4em 1em 1.4em 6.5em;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 0.8em;
  position: relative;
  flex: 1;
  font-family: inherit;
`

export const KPIsIcon = styled.span`
  position: absolute;
  left: 0.8em;
  top: 50%;
  transform: translateY(-50%);
  background-color: #FFEDEC;
  border-radius: 0.5rem;
  line-height: 0;
  font-size: 2rem;
  padding: 0.4em 0.4em;
  color: #E23428;
  font-family: inherit;
`

export const Title = styled.h4`
  font-family: inherit;
  color: #393939;
  font-size: 1.9rem;
`

export const Subtitle = styled.h6`
  font-family: inherit;
  color: #787878;
  font-size: 0.8rem;
  font-weight: 300;
`