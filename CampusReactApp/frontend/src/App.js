// // src/App.js
// import { useRoutes } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import Themeroutes from "./routes/Router";

// const App = () => {
//   const routing = useRoutes(Themeroutes);

//   return (
//     <AuthProvider>
//       <div className="dark">{routing}</div>
//     </AuthProvider>
//   );
// };

// export default App;

import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Themeroutes from "./routes/Router";
import SingleActivity from "./views/ui/SingleActivity"; // Import SingleActivity

const App = () => {
  const routing = useRoutes([
    ...Themeroutes, // Existing routes from Themeroutes
    { path: "/activity/:id", element: <SingleActivity /> }, // Add SingleActivity route
  ]);

  return (
    <AuthProvider>
      <div className="dark">{routing}</div>
    </AuthProvider>
  );
};

export default App;