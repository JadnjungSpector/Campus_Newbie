import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from sessionStorage or initialize as null
    return sessionStorage.getItem("user") || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in based on sessionStorage
    return !!sessionStorage.getItem("user");
  });

  // Update sessionStorage whenever the user changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user);
      setIsLoggedIn(true); // Set logged-in status when user exists
    } else {
      sessionStorage.removeItem("user"); // Clean up if user is logged out
      setIsLoggedIn(false); // Set logged-out status
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
