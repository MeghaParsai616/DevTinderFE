import Footer from "./Footer";
import NavBar from "./Navbar";
import { Navigate, Outlet,useNavigate } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./store/slices/userSlice";


function App() {
   console.log("data from App.... ")
const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector(store=> store.user)
  const fetchUserData = async() =>{
    try{
      if (user) return;
 const resp = await axios.get(`${BASE_URL}/profile/view`,{withCredentials: true});
              dispatch(addUser(resp?.data))
                console.log("data is fetching afain from App ")
              console.log(resp.data)
     }catch(err){
          console.log("errr: navigated to login", err)
          if(err.status === 401){
            if (window.location.pathname !== "/login") {
              dispatch(removeUser()); 
          return navigate("/login", { replace: true }); 
    } 
           
             
          }
  
      }
   
  }

  useEffect(()=>{

  fetchUserData();

    }
  ,[])

  //   useEffect(() => {
  //   // 1. Component Mounts: Fetch data here if needed
  //   console.log("Profile view mounted");

  //   // 2. THE CLEANUP FUNCTION: Runs automatically when the user leaves this specific page
  //   return () => {
  //     console.log("Profile view unmounted! Erasing sensitive page data...");
  //     dispatch(removeUser()); // Resets this specific page data to null
  //   };
  // }, []);

  //  if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  //  useEffect(() => {
  //   if (!user) {
  //     navigate("/login", { replace: true });
  //     dispatch(removeUser())
  //   }
  // }, [user, navigate]);


  return (
    <div className="app-container">
      <NavBar />

      {/* This main tag will expand and force the footer downwards */}
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
