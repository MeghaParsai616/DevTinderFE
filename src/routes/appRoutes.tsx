import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../Login";
import Feed from "../Feed";
import { useSelector } from "react-redux";
import Profile from "../components/Profile";

// export const appRoutes = createBrowserRouter([
// {path:"/", element: <App />, children:[
//      { index: true, element: <Feed/> }, 
//      { path: "login", element: <Login/>} ,
//      { path: "profile", element: <div>Profile</div> } 
// ]}
// ]);

const ProtectedRoute = ({ children }) => {
  // Grab the user authentication object from your Redux store
  const user = useSelector((store) => store.user);

  // If there is no user logged in, slam the door shut and redirect to login
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

const PublicRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  // If the user is already logged in, do not let them see the login page; bounce them to home
  // if (user) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};
export const appRoutes = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/" replace />,
  // },
]);