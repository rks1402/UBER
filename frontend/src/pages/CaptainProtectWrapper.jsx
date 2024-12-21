import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaptainData = async () => {
      if (!token) {
        navigate('/captain-login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setCaptain(data.captain);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching captain profile:', error);

        // Handle network error or unauthorized request
        if (!navigator.onLine) {
          console.error('Network error: Check your internet connection.');
        }

        // Handle unauthorized request
        localStorage.removeItem('token');
        navigate('/captain-login');
      }
    };

    fetchCaptainData();
  }, [token, navigate, setCaptain]);

  // Show a loading message while fetching data
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Render children components if captain is logged in
  return captain ? <>{children}</> : null;
};

export default CaptainProtectWrapper;