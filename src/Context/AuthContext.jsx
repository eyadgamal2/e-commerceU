import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("tkn");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}