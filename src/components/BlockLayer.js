import styled from "styled-components";

export const BlockLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1.2px);
  transition: opacity 0.2s ease-in-out, z-index 0s ease-in-out 0.3s;
  z-index: -10;
  opacity: 0;

  &.show {
    transition: opacity 0.2s ease-in-out, z-index 0s ease-in-out 0s;
    z-index: 10;
    opacity: 1;
  }
`