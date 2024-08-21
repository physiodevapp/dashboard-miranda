import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";

const updateContact = async <T extends ContactInterface>(updateContact: T): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/contacts/${updateContact.id}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateContact), 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData: T = await response.json();
    
    return responseData;  
    
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const contactListUpdateOneThunk = createAsyncThunk<void, { contact: ContactInterface }>("contactList/contactListUpdateOne", async ({contact}) => {
  await updateContact(contact);
})