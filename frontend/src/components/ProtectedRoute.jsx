// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUser } from "../redux/feature/user/userSlice";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/user/check-auth", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIsAuthenticated(data.success);
          const { id, username, role, email } = data.user;
          dispatch(setUser({ id, username, role, email }));
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // While loading, you could return a spinner or loader
  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
