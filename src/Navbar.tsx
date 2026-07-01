import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "./store/slices/userSlice";
import { BASE_URL } from "./constants";
import axios from "axios";

const NavBar = () =>{
const user =  useSelector((store) => store.user);
const dispatch = useDispatch();
const navigate = useNavigate();
console.log("data from navdat")
console.log(user?.data);


  const handleLogout = async (e) => {
    // Prevent the default link redirect so the API can finish first
    e.preventDefault(); 
    
    try {
      // 1. Fire the logout request to clean up server session cookies
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      
      // 2. Clear the authenticated user from the local Redux state
      dispatch(removeUser());
      
      // 3. Clear the browser history stack and force navigate to /login
     return  navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
    return(
   <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">👩🏻‍💻 Dev Tinder</Link>
  </div>
  {user &&  <div className="flex gap-2">
   
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="">Settings</Link></li>
        <li>   <button onClick={handleLogout} className="text-left w-full block px-4 py-2">
                  Logout
                </button></li>
      </ul>
    </div>
  </div>}
 
    </div>
    )
}
export default NavBar