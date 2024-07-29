import { useState } from "react";
import { Link } from "react-router-dom"
import { useLoginMutation } from '../../redux/api';
import { useDispatch } from 'react-redux';
import { setToken } from "../../redux/features/auth/authSlice";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
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
        <div className='card'>
            <h1 className="text font-[500] text-3xl">Login</h1>
            {isLoading && <h1>Loading...</h1>}
            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
                <h1>Don't Have an Account? <Link to={"/register"}>Register</Link></h1>
            </form>
        </div>
    );
};

export default Login;
