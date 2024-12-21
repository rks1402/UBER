import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during logout:", error);
        // Optionally navigate to login on error (e.g., if the token is invalid or already expired)
        navigate("/login");
      }
    };

    logout();
  }, [token, navigate]); // Dependencies ensure it runs on component mount and uses the latest navigate reference.

  return <div>Logging out...</div>;
};

export default UserLogout;