import React, { createContext, useEffect, useState } from 'react'

export const FormModeContext = createContext();

export const FormModeProvider = ({children}) => {

  const [isEditingForm, setIsEditingForm] = useState(false);

  return (
    <FormModeContext.Provider value={{ isEditingForm, setIsEditingForm }}>
      { children }
    </FormModeContext.Provider>
  )
}
