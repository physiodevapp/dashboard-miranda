import React, { useContext, useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { Form, FormLogo, Input, SubmitButton, Wrapper } from "./LoginStyled";
import { AuthContext, AuthContextInterface } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userListErrorSelect, userListStatusSelect, userListUserListSelect, userListUserSelect } from "../../features/userList/userListSlice";
import { userListCanLoginThunk } from "../../features/userList/userListCanLoginThunk";
import logoImage from '../../assets/dashboard-logo.png';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {
  const [user, setUser] = useState<{ email: string, password: string }>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();
  
  const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  const { userDispatch } = useAuth();

  const userListDispatch = useAppDispatch();
  const userListError = useAppSelector(userListErrorSelect);
  const userListStatus = useAppSelector(userListStatusSelect);
  const userListUserList = useAppSelector(userListUserListSelect);
  const userListUser = useAppSelector(userListUserSelect);

  const handleChangeInput = ( event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  };

  const isValidForm = (): string | null => {
    const validUser: { email: string | null, password: string | null} = {
      email: user.email.trim().length ? user.email.trim() : null,
      password: user.password.trim().length ? user.password.trim() : null
    }
    return validUser.email && validUser.password;
  };

  const handleSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(isValidForm())
      userListDispatch(userListCanLoginThunk({email: user.email, password: user.password}))    
  };

  useEffect(() => {
    switch (userListStatus) {
      case "idle":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
      case "fulfilled":
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        if (userListUser) {
          userDispatch({ type: 'login', payload: userListUser });
          navigate('/dashboard');
        }

        break;
      case "rejected":
        setIsLoading(false);
        
        toast.error(userListError, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
        });
        break;
      default:
        break;
    }
  }, [userListStatus])

  return (
    <>
      <ToastContainer/>
      <Wrapper>
        <Form action="" onSubmit={handleSubmit}>
          <FormLogo src={logoImage}/>
          <Input
            onChange={handleChangeInput}
            value={user.email}
            key={"email"}
            placeholder="Try: admin.miranda@example.com"
            type="email"
            name="email"
            id="email"
          />
          <Input
            onChange={handleChangeInput}
            value={user.password}
            key={"password"}
            placeholder="Try: 0000"
            type="password"
            name="password"
            id="password"
          />
          <SubmitButton styled="primary" type="submit">
            Log in
          </SubmitButton>
        </Form>
      </Wrapper>
    </>
  );
};
