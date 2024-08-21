import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";

const getContactList = async <T extends ContactInterface>(): Promise<T[]> => {

  const apiUrl = 'http://localhost:3000/contacts';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData: T[] = await response.json();
    
    console.log('Success:', responseData);
    return responseData;
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const contactListReadListThunk = createAsyncThunk<ContactInterface[]>("contactList/contactListReadList", async () => {
  const contactList: ContactInterface[] = await getContactList();

  return contactList;
})