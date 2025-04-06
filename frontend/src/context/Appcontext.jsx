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
    // console.log(userData)
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userData]);

  // const getAuthUser = async () => {
  //   try {
  //     console.log("Checking authentication with token:", token);
  //     const response = await axios.get(`${backend_url}/api/user/is-authenticated`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("Authentication response:", response.data);
  //     if (response.data.success) {
  //       setUserData();
  //       setLoggedIn(true);
  //     } else {
  //       toast.error(response.data.message);
  //       setLoggedIn(false);
  //     }
  //   } catch (error) {
  //     console.error("Authentication error:", error);
  //     toast.error("Authentication failed. Please log in again.");
  //   }
  // };

  const fetchUser = async () => {
    try {
      // Ensure the token is correctly prefixed with "Bearer"
      const { data } = await axios.get(`${backend_url}/api/display/data`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add space after Bearer
        },
      });

      if (data.success) {
        // console.log(data.user)
        setUserData(data.user);
        // console.log(userData)
      } else {
        toast.error("Error in fetching user");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data");
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const value = {
    backend_url,
    loggedIn,
    setLoggedIn,
    userData,
    setUserData,
    
    token,
    setToken,
    fetchUser
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
