import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { ButtonStyled } from '../src/components/ButtonStyled';

describe("Testing ButtonStyled component", () => {
  test("Color of ButtonStyled component with styled='primary'", () => {
    render(<ButtonStyled styled="primary">Test Me!</ButtonStyled>);
    
    const button = screen.getByText("Test Me!");

    expect(button).toHaveStyleRule("color", "#ebf1ef")
  });

  test("Background color of ButtonStyled component with styled='deny'", () => {
    render(<ButtonStyled styled="deny">Test Me!</ButtonStyled>);
    
    const button = screen.getByText("Test Me!");

    expect(button).toHaveStyleRule("background-color", "#E23428")
  });

  test("Background color on hover of ButtonStyled component with styled='tertiary'", () => {
    render(<ButtonStyled styled="tertiary">Test Me!</ButtonStyled>);
    
    const button = screen.getByText("Test Me!");

    fireEvent.mouseEnter(button);

    setTimeout(() => {      
      expect(button).toHaveStyleRule("color", "#EBF1EF");
    }, 200);
  });
});