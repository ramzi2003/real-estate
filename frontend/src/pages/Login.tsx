import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/features/authSlice";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  // After login success, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Log In | RealEstate</title>
        <meta name="description" content="Real Estate Log In Page" />
      </Helmet>

      <div className="w-full flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-semibold text-slate-900">Log In</h1>

        <form
          action=""
          className="w-full md:w-1/2 p-3"
          onSubmit={handleOnSubmit}
        >
          <div className="mt-4">
            <p>Email*</p>
            <p>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                name="email"
                required
                className="w-full py-2 px-2 border"
                value={email}
                onChange={handleOnChange}
              />
            </p>
          </div>
          <div className="mt-4">
            <p>Password*</p>
            <p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                className="w-full py-2 px-2 border"
                value={password}
                onChange={handleOnChange}
              />
            </p>
          </div>

          <button className="mt-3 py-2 px-4 bg-blue-400 rounded-md hover:bg-blue-300">
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
