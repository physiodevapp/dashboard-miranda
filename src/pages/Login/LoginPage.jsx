

import React, { useContext, useState } from 'react'
import { Button, Form, Input, Wrapper } from './LoginStyled';
import { AuthContext } from '../../context/AuthProvider';

export const LoginPage = () => {
  const [user, setUser] = useState({email: '', password: ''})

  const { login } = useContext(AuthContext);

  const handleChangeInput = ({target}) => {
    setUser((prevUser) => (
      {
        ...prevUser, 
        [target.name]: target.value
      }
    ))
  }

  const handleClickSubmit = (event) => {
    event.preventDefault();
    login(user);
  }

  return (
    <>
      <Wrapper>
        <Form action="">
          <Input onChange={handleChangeInput} value={user.email} key={'email'} placeholder='email@example.com' type="email" name="email" id="email" />
          <Input onChange={handleChangeInput} value={user.password} key={'password'} placeholder='password' type="password" name="password" id="password" />
          <Button onClick={handleClickSubmit} type='submit'>Log in</Button>
        </Form>
      </Wrapper>
    </>
  )
}
