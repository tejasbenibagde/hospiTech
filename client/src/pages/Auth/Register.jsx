import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../../redux/api';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToken } from "../../redux/features/auth/authSlice";

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
        const loginRes = await login({ email: user.email, password: user.password }).unwrap();
        dispatch(setToken({ token: loginRes.token }));
        alert("Registered and logged in successfully");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.errors[0].msg || "Failed to register. Please try again");
    }
  };

  return (
    <div className='card'>
      <h1 className="text font-[500] text-3xl">Register</h1>
      {(isLoading || loginLoading) && <h1>Loading...</h1>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={user.username}
          onChange={handleChange}
          type="text"
          placeholder="Username"
          className="mb-4"
        />
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="mb-4"
        />
        <input
          name="password"
          value={user.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="mb-4"
        />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md">
          Register
        </button>
        <h1>Already have an account? <Link to={"/login"}>Login</Link></h1>
      </form>
    </div>
  );
};

export default Register;
