

import React, { useEffect, useState } from 'react'
import { KPIsListComponent } from '../components/KPIsList/KPIsListComponent';
import { RecentContactListComponent } from '../components/RecentContacts/RecentContactListComponent';
import { PageElementContainerStyled } from '../components/PageElementContainerStyled';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { contactListErrorSelect, contactListStatusSelect } from '../features/contactList/contactListSlice';
import { contactListReadListThunk } from '../features/contactList/contactListReadListThunk';
import { BounceLoader } from 'react-spinners';

export const DashboardPage = () => {
  const contactListDispatch = useAppDispatch();
  const contactListStatus = useAppSelector(contactListStatusSelect);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const contactListError = useAppSelector(contactListErrorSelect);
  
  useEffect(() => {
    contactListDispatch(contactListReadListThunk())
  }, [])

  useEffect(() => {
    switch (contactListStatus) {
      case "idle":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
      case "fulfilled":
        setIsLoading(false);          
        break;
      case "rejected":
        setIsLoading(true);
        console.log({contactListError});
        break;
      default:
        break;
    }
  }, [contactListStatus])
  
  return (
    isLoading
    ? <>
        <BounceLoader
          color={"#135846"}
          loading={isLoading}
          cssOverride={{
            position: "relative",
            top: "40%",
            display: "block",
            margin: "0 auto",
            borderColor: "#135846",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </>
    :
    <>
      <PageElementContainerStyled>
        <KPIsListComponent/>
        <RecentContactListComponent/>
      </PageElementContainerStyled>
    </>
  )
}
