import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/features/auth/authSlice";
import { Button, Input } from "@chakra-ui/react";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

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
      const res = await login(user).unwrap();
      dispatch(setToken({ token: res.token }));
      alert(res.message || "Logged In Successfully");
    } catch (error) {
      console.log(error);
      alert(error.data.errors[0].msg || "Failed to Login. Please try again");
    }
  };

  return (
    <div className="card flex flex-col gap-5">
      <h1 className="text font-[500] text-3xl">Login</h1>
      {isLoading && <h1>Loading...</h1>}
      <form onSubmit={handleSubmit}>
        <Input
          size="sm"
          name="email"
          isInvalid={!user.email}
          value={user.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="mb-4"
          rounded={5}
          required={true}
          focusBorderColor={!user.email ? "#F5E9DD" : "#E85D56"}
          errorBorderColor="#E85D56"
          color={isDarkMode ? "#F5E9DD" : "#494949"} 
          _placeholder={{
            opacity: 1,
            color: !user.email ? "#E85D56" : "#F5E9DD",
          }}
        />
        <Input
          size="sm"
          name="password"
          rounded={5}
          required={true}
          isInvalid={!user.password}
          focusBorderColor={!user.password ? "#F5E9DD" : "#E85D56"}
          value={user.password}
          onChange={handleChange}
          type="password"
          color={isDarkMode ? "#F5E9DD" : "#494949"} 
          errorBorderColor="#E85D56"
          placeholder="Password"
          className="mb-4"
          _placeholder={{
            opacity: 1,
            color: !user.email ? "#E85D56" : "#F5E9DD",
          }}
        />
        <Button
          background={"#E85D56"}
          color={"#F5E9DD"}
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md"
        >
          Login
        </Button>
        <h1 className="text">
          Don't Have an Account? <Link to={"/register"} className="text-primary">Register</Link>
        </h1>
      </form>
    </div>
  );
};

export default Login;
