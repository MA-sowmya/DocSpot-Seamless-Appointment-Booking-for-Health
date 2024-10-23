import React, { createContext, useState, useContext } from "react";

const LoaderContext = createContext();

// A provider to wrap the application
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoading = () => useContext(LoaderContext);
