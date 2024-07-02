import React, { useContext, useState } from "react";
import { Form, Input, SubmitButton, Wrapper } from "./LoginStyled";
import { AuthContext } from "../../context/AuthContext";

export const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const { userDispatch } = useContext(AuthContext);

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
    isValidForm() && userDispatch({type: 'login', payload: user});
  };

  return (
    <>
      <Wrapper>
        <Form action="" onSubmit={handleSubmit}>
          <Input
            onChange={handleChangeInput}
            value={user.email}
            key={"email"}
            placeholder="email@example.com"
            type="email"
            name="email"
            id="email"
          />
          <Input
            onChange={handleChangeInput}
            value={user.password}
            key={"password"}
            placeholder="password"
            type="password"
            name="password"
            id="password"
          />
          <SubmitButton styled="secondary" type="submit">
            Log in
          </SubmitButton>
        </Form>
      </Wrapper>
    </>
  );
};
