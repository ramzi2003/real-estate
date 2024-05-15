import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { displayAlert } from "../redux/features/alertSlice";
import { useEffect } from "react";

const PrivateRoute = () => {
  const dispatch = useAppDispatch();

  if (localStorage.getItem("token") === null) {
    // need to wrap the dispatch call into useeffect
    // cannot update a component while rendering a different component
    useEffect(() => {
      dispatch(
        displayAlert({ alertType: "info", message: "You need to login first." })
      );
    }, []);

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
