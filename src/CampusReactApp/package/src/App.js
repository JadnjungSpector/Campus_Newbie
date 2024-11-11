// src/App.js
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Themeroutes from "./routes/Router";

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <AuthProvider>
      <div className="dark">{routing}</div>
    </AuthProvider>
  );
};

export default App;