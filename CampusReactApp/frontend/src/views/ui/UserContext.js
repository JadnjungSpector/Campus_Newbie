import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from sessionStorage or initialize as null
    return sessionStorage.getItem("user") || null;
  });

  // Update sessionStorage whenever the user changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user);
    } else {
      sessionStorage.removeItem("user"); // Clean up if user is logged out
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
