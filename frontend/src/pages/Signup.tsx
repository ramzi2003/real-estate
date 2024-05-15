import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signup } from "../redux/features/authSlice";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Signup = () => {
  const { registered } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { first_name, last_name, email, password, password2 } = formData;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords don't match");
    } else {
      dispatch(signup({ first_name, last_name, email, password, password2 }));
    }
  };

  //
  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Helmet>
        <title>Sign Up | RealEstate</title>
        <meta name="description" content="Real Estate Sign Up Page" />
      </Helmet>

      <div className="w-full flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-semibold text-emerald-500">Sign Up</h1>

        <form
          action=""
          className="w-full md:w-1/2 p-3"
          onSubmit={handleOnSubmit}
        >
          <div className="mt-4">
            <p>First Name*</p>
            <p>
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                required
                className="w-full py-2 px-2 border"
                value={first_name}
                onChange={handleOnChange}
              />
            </p>
          </div>
          <div className="mt-4">
            <p>Last Name*</p>
            <p>
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                required
                className="w-full py-2 px-2 border"
                value={last_name}
                onChange={handleOnChange}
              />
            </p>
          </div>
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
          <div className="mt-4">
            <p>Confirm Password*</p>
            <p>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                required
                className="w-full py-2 px-2 border"
                value={password2}
                onChange={handleOnChange}
              />
            </p>
          </div>
          <button className="mt-3 py-2 px-4 bg-emerald-400 hover:bg-emerald-500">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
