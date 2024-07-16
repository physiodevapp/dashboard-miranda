import React, { createContext, Dispatch, ReactNode, useState } from 'react';

interface FormModeProviderProps {
  children: ReactNode
}

interface FormModeContextInterface {
  isEditingForm: boolean,
  setIsEditingForm: Dispatch<boolean>
}

export const FormModeContext = createContext<FormModeContextInterface | null>(null);

export const FormModeProvider = ({children}: FormModeProviderProps) => {

  const [isEditingForm, setIsEditingForm] = useState<boolean>(false);

  return (
    <FormModeContext.Provider value={{ isEditingForm, setIsEditingForm }}>
      { children }
    </FormModeContext.Provider>
  )
}
