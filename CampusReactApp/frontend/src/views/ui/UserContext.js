import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage or initialize as null
    return localStorage.getItem("user") || null;
  });

  // Update localStorage whenever the user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user"); // Clean up if user is logged out
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
