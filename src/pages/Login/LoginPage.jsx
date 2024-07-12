import React, { useContext, useEffect, useState } from "react";
import { Form, FormLogo, Input, SubmitButton, Wrapper } from "./LoginStyled";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userListErrorSelect, userListStatusSelect, userListUserListSelect, userListUserSelect } from "../../features/userList/userListSlice";
import { userListCanLoginThunk } from "../../features/userList/userListCanLoginThunk";
import logoImage from '../../assets/dashboard-logo.png';

export const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { userDispatch } = useContext(AuthContext);

  const userListDispatch = useDispatch();
  const userListError = useSelector(userListErrorSelect);
  const userListStatus = useSelector(userListStatusSelect);
  const userListUserList = useSelector(userListUserListSelect);
  const userListUser = useSelector(userListUserSelect);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = ({ target }) => {
    setUser((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  };

  const isValidForm = () => {
    const validUser = {
      email: user.email.trim().length ? user.email.trim() : null,
      password: user.password.trim().length ? user.password.trim() : null
    }
    return validUser.email && validUser.password;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(isValidForm())
      userListDispatch(userListCanLoginThunk({email: user.email, password: user.password, list: userListUserList}))    
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
          userDispatch({type: 'login', payload: {
            email: userListUser.email,
          }});
          navigate('/dashboard');
        }

        break;
      case "rejected":
        setIsLoading(false);
        console.log({userListError});
        break;
      default:
        break;
    }
  }, [userListStatus])

  return (
    <>
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
