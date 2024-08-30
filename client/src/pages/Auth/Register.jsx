import React, { useState } from "react";
import { useRegisterMutation, useLoginMutation } from "../../redux/api";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setToken } from "../../redux/features/auth/authSlice";
import { Input, Button } from "@chakra-ui/react";
const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [register, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerRes = await register(user).unwrap();
      if (registerRes) {
        const loginRes = await login({
          email: user.email,
          password: user.password,
        }).unwrap();
        dispatch(setToken({ token: loginRes.token }));
        alert("Registered and logged in successfully");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.errors[0].msg || "Failed to register. Please try again");
    }
  };

  return (
    <div className="card flex flex-col gap-5">
      <h1 className="text font-[500] text-3xl">Register</h1>
      {(isLoading || loginLoading) && <h1>Loading...</h1>}
      <form onSubmit={handleSubmit}>
        <Input
          size="sm"
          name="username"
          isInvalid={!user.username}
          value={user.username}
          onChange={handleChange}
          type="text"
          placeholder="username"
          className="mb-4"
          rounded={5}
          required={true}
          focusBorderColor={!user.username ? "#F5E9DD" : "#E85D56"}
          errorBorderColor="#E85D56"
          color="#F5E9DD"
          _placeholder={{
            opacity: 1,
            color: !user.username ? "#E85D56" : "#F5E9DD",
          }}
        />
        <Input
          size="sm"
          name="email"
          isInvalid={!user.email}
          value={user.email}
          onChange={handleChange}
          type="email"
          placeholder="email"
          className="mb-4"
          rounded={5}
          required={true}
          focusBorderColor={!user.email ? "#F5E9DD" : "#E85D56"}
          errorBorderColor="#E85D56"
          color="#F5E9DD"
          _placeholder={{
            opacity: 1,
            color: !user.email ? "#E85D56" : "#F5E9DD",
          }}
        />
        <Input
          size="sm"
          name="password"
          isInvalid={!user.password}
          value={user.password}
          onChange={handleChange}
          type="password"
          placeholder="password"
          className="mb-4"
          rounded={5}
          required={true}
          focusBorderColor={!user.password ? "#F5E9DD" : "#E85D56"}
          errorBorderColor="#E85D56"
          color="#F5E9DD"
          _placeholder={{
            opacity: 1,
            color: !user.password ? "#E85D56" : "#F5E9DD",
          }}
        />
        <Button
          background={"#E85D56"}
          color={"#F5E9DD"}
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md"
        >
          Register
        </Button>
        <h1 className="text">
          Already have an account? <Link to={"/login"} className="text-primary">Login</Link>
        </h1>
      </form>
    </div>
  );
};

export default Register;
