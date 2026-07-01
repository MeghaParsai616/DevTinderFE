import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../Login";
import Feed from "../Feed";

// export const appRoutes = createBrowserRouter([
// {path:"/", element: <App />, children:[
//      { index: true, element: <Feed/> }, 
//      { path: "login", element: <Login/>} ,
//      { path: "profile", element: <div>Profile</div> } 
// ]}
// ]);

export const appRoutes = createBrowserRouter([
  // 1. PUBLIC ROUTE (Completely separate root - App layout will NEVER touch this)
  {
    path: "/login",
    element: <Login />
  },

  // 2. PROTECTED ROUTES (Requires auth, uses App layout navbar/footer wrappers)
  {
    path: "/",
    element: <App />, 
    children: [
      { 
        index: true, 
        element: <Feed /> 
      }, 
      { 
        path: "profile", 
        element: <div>Profile</div> 
      } 
    ]
  },

//   // 3. CATCH-ALL FALLBACK
//   {
//     path: "*",
//     element: <Navigate to="/" replace />
//   }
]);