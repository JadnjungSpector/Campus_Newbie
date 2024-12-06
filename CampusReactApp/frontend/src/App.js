import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Themeroutes from "./routes/Router";
import SingleActivity from "./views/ui/SingleActivity"; // Import SingleActivity
import {UserProvider} from "./views/ui/UserContext";
const App = () => {
  const routing = useRoutes([
    ...Themeroutes, // Existing routes from Themeroutes
    { path: "/activity/:id", element: <SingleActivity /> }, // Add SingleActivity route
  ]);

  return (
    <AuthProvider>
      <UserProvider>
          <div className="dark">{routing}</div>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;