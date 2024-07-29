import React, { useState } from 'react';
import { useRegisterMutation } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {

  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await register(user).unwrap();
      alert(res.message || "Doctor Registered Successfully");
    } catch (error) {
      console.log(error);
      alert(error.data.errors[0].msg || "Failed to register. Please try again");
    }
  };

  return (
    <div className='card'>
      <h1 className="text font-[500] text-3xl">Register</h1>
      {isLoading && <h1>Loading...</h1>}
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
      </form>
    </div>
  );
};

export default Register;
