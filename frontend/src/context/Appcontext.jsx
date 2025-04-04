import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_Backend_URL;
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Sync token from localStorage whenever it changes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/display/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Important for cookie-based authentication
      });

      if (data.success) {
        setUserData(data.userData);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
      setLoggedIn(false);
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  // Effect to fetch user data when the token changes
  useEffect(() => {
    if (token) getUserData();
  }, [token]);

  const value = {
    backend_url,
    loggedIn,
    setLoggedIn,
    userData,
    setUserData,
    getUserData,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
