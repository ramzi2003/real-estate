import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/authSlice";
import { displayAlert } from "../redux/features/alertSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);

  const displayHambugerItems = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="flex fixed top-0 left-0 right-0 justify-between items-center bg-slate-900 px-4 py-5 z-10">
        <div className="text-3xl font-semibold text-white cursor-default">
            Real Estate
        </div>
        <div
          className={
            "hidden md:flex items-center justify-between space-x-6 text-white text-md"
          }
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? " bg-slate-950 px-4 py-1 rounded-md" : "px-4 py-1 rounded-md hover:bg-slate-700"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/listings"
            className={({ isActive }) =>
              isActive ? " bg-slate-950 px-4 py-1 rounded-md" : "px-4 py-1 rounded-md hover:bg-slate-700"
            }
          >
            Listings
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? " bg-slate-950 px-4 py-1 rounded-md" : "px-4 py-1 rounded-md hover:bg-slate-700"
            }
          >
            About
          </NavLink>

          {localStorage.getItem("token") ? (
            <NavLink
              to="/login"
              className="hover:bg-blue-400 py-2 px-4 bg-blue-500 rounded-md"
              onClick={() => {
                dispatch(logout());
                dispatch(
                  displayAlert({
                    alertType: "info",
                    message: "Logged out successfully.",
                  })
                );
              }}
            >
              Log Out
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:bg-blue-400 py-2 px-4 bg-blue-500 rounded-md"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="hover:bg-blue-400 py-2 px-4 bg-blue-500 rounded-md"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
        <div
          className="md:hidden flex flex-col space-y-1 block z-20 p-2 hover:bg-slate-700 rounded-md cursor-pointer"
          id="hamburgerBtn"
          onClick={displayHambugerItems}
        >
          <div className="w-6 h-0.5 bg-white rounded-sm"></div>
          <div className="w-6 h-0.5 bg-white rounded-sm"></div>
          <div className="w-6 h-0.5 bg-white rounded-sm"></div>
        </div>

        <div
          className={
            open
              ? "hidden"
              : "block absolute top-0 left-0 -z-1 p-10 space-y-6 text-center w-full bg-slate-900 flex flex-col text-white text-lg rounded-b-xl md:hidden"
          }
        >
          <a href="/" className="text-lg hover:bg-slate-700">
            Home
          </a>
          <a href="/listings" className="text-lg hover:bg-slate-700">
            Listings
          </a>
          <a href="/about" className="text-lg hover:bg-slate-700">
            About
          </a>
          {localStorage.getItem("token") ? (
            <a
              href="/login"
              className="text-lg hover:bg-slate-700"
              onClick={() => {
                dispatch(logout());
                dispatch(
                  displayAlert({
                    alertType: "info",
                    message: "Logged out successfully.",
                  })
                );
              }}
            >
              Log Out
            </a>
          ) : (
            <>
              <a href="/login" className="text-lg hover:bg-slate-700">
                Log In
              </a>
              <a href="/signup" className="text-lg hover:bg-slate-700">
                Sign Up
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
