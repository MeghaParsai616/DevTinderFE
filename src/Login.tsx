import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser,removeUser } from "./store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants";


const Login = () => {
  const [emailId, setEmailId] = useState("sanskriti@gmail.com");
  const [password, setPassword] = useState("Swadhika@2021");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(()=>{
       dispatch(removeUser())
  },[])

  const handleLoginRequest = async() =>{
    try{

      const resp = await  axios.post(`${BASE_URL}/login`,
        {emailId, password}, 
        {withCredentials : true});
       console.log(resp.data)
       dispatch(addUser(resp.data.data))
     //  navigate("/")
      navigate("/", { replace: true }); 
    }catch(err){

    }
   

  }

  return (
    <div className="flex justify-center  my-15">
      <div className="card bg-amber-400 w-96     shadow-sm">
        <div className="card-body">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              placeholder="Email ID"
              value={emailId}
              onChange={handleEmailChange}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
          </fieldset>

          <div className="card-actions justify-center my-5">
            <button className="btn btn-primary" onClick={handleLoginRequest}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
