import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogout = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const captainLogout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/captain-login");
        }
      } catch (error) {
        console.error("Error during logout:", error);
        navigate("/captain-login");
      }
    };

    captainLogout();

  },[token, navigate]);

  return (
    <div>Logging User Out ......</div>
  )
}

export default CaptainLogout