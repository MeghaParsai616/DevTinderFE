import Footer from "./Footer";
import NavBar from "./Navbar";
import { Outlet,useNavigate } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./store/slices/userSlice";
import type { RootState } from "./store/store";


function App() {
   console.log("data from App.... ")
const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector((store:RootState) => store?.user )
  const fetchUserData = async() =>{
    try{
      if (user) return;
 const resp = await axios.get(`${BASE_URL}/profile/view`,{withCredentials: true});
              dispatch(addUser(resp?.data))
                console.log("data is fetching afain from App ")
              console.log(resp.data)
     }catch(err : any){
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
