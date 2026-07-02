
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./store/slices/userSlice";
import { BASE_URL } from "./constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState(""); // Removed hardcoded credentials
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear errors when the user types
  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
    setError("");
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit
    setError("");

    // Simple client-side validation
    if (!emailId || !password || (!hasAccount && (!firstName || !lastName))) {
      setError("Please fill out all required fields.");
      return;
    }

    const endpoint = hasAccount ? `${BASE_URL}/login` : `${BASE_URL}/signup`;
    const payload = hasAccount 
      ? { emailId, password } 
      : { firstName, lastName, emailId, password };

    try {
      const resp = await axios.post(endpoint, payload, { withCredentials: true });
      console.log(resp.data);
      dispatch(addUser(resp.data.data));
      navigate("/", { replace: true });
    } catch (err) {
      // Axios error status is inside err.response
      if (err.response && err.response.status === 400) {
        setError(hasAccount ? "Entered credentials are not valid" : "SignUp Not Successful");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  // Toggle between Login and Signup modes
  const toggleAuthMode = () => {
    setHasAccount((prev) => !prev);
    setError(""); // Clear errors when switching modes
  };

  return (
    <div className="flex justify-center my-15">
      <div className="card bg-orange-300 w-96 shadow-sm">
        {/* Changed wrapper to a form for keyboard form submission */}
        <form className="card-body" onSubmit={handleFormSubmit} noValidate >
          
          {!hasAccount && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name *</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name *</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </fieldset>
            </>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID *</legend>
            <input
              type="email" // Changed to type="email" for mobile keyboard optimization
              className="input"
              placeholder="Email ID"
              value={emailId}
              onChange={handleEmailChange}
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password *</legend>
            <input
              type="password" // SECURE: Changed from text to password
              className="input"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </fieldset>

          {error && <div className="font-bold text-red-600 mt-2">{error}</div>}

          <div className="card-actions justify-center my-5">
            {/* type="submit" fires the form's onSubmit event */}
            <button type="submit" className="btn btn-primary">
              {hasAccount ? "LogIn" : "Sign Up"}
            </button>
          </div>

          {/* Simplified and unified bottom toggle block */}
          <div className="text-center text-sm">
            <span>{hasAccount ? "Create an Account: " : "Already Have An Account: "}</span>
            <button
              type="button" // Prevents this button from triggering a form submit
              className="btn btn-link p-0 inline-block align-baseline"
              onClick={toggleAuthMode}
            >
              {hasAccount ? "SignUp" : "LogIn"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser,removeUser } from "./store/slices/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "./constants";


// const Login = () => {
//   const [emailId, setEmailId] = useState("");
//   const [password, setPassword] = useState("Swadhika@2021");
//   // const [emailId, setEmailId] = useState("sanskriti@gmail.com");
//   // const [password, setPassword] = useState("Swadhika@2021");
//     const [firstName, setFirstName] = useState("");
//       const [lastName, setLastName] = useState("");
//       const [hasAccount, setHasAccount] = useState(true)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const [error, setError] = useState("")
//   const handleEmailChange = (e) => {
//     setEmailId(e.target.value);
//     setError("")
//   };
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setError("")
//   };

//   const handleFirstName =(e) =>{
// setFirstName(e.target.value)
//   }

//   const handleLastNameChange =(e) =>{
//     setLastName(e.target.value)
//   }

//   const handleLoginRequest = async(e) =>{
// e.preventDefault();
//     if(hasAccount){
//          try{

//       const resp = await  axios.post(`${BASE_URL}/login`,
//         {emailId, password}, 
//         {withCredentials : true});
//        console.log(resp.data)
//        dispatch(addUser(resp.data.data))
//      //  navigate("/")
//       navigate("/", { replace: true }); 
//     }catch(err){
//           if(err.status ==400){
//                setError("Entered credentials are not valid")
//           }
//     }
//     }else{

//         try{

//       const resp = await  axios.post(`${BASE_URL}/signup`,
//         {firstName, lastName ,emailId, password}, 
//         {withCredentials : true});
//        console.log(resp.data)
//        dispatch(addUser(resp.data.data))
//      //  navigate("/")
//       navigate("/", { replace: true }); 
//     }catch(err){
//           if(err.status ==400){
//                setError("SignUp Not SuccessFull")
//           }
//     }
//     }
//   }


//   return (
//     <div className="flex justify-center  my-15">
//       <div className="card bg-orange-300 w-96     shadow-sm">
//         <form className="card-body" onSubmit={handleLoginRequest}>
//         <div className="card-body">

//          {!hasAccount && <> 
//            <fieldset className="fieldset">
//             <legend className="fieldset-legend">First Name</legend>
//             <input
//               type="text"
//               className="input"
//               placeholder="First Name"
//               value={firstName}
//               onChange={handleFirstName}
//             />
//           </fieldset>
//             <fieldset className="fieldset">
//             <legend className="fieldset-legend">Last Name</legend>
//             <input
//               type="text"
//               className="input"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={handleLastNameChange}
//             /> 
//           </fieldset>
//           </> }
//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Email ID</legend>
//             <input
//               type="text"
//               className="input"
//               placeholder="Email ID"
//               value={emailId}
//               onChange={handleEmailChange}
//             />
//           </fieldset>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Password</legend>
//             <input
//               type="text"
//               className="input"
//               placeholder="Password"
//               value={password}
//               onChange={handlePassword}
//             />
//           </fieldset>

//           <div className="font-bold text-red-600"> {error}</div>

//           <div className="card-actions justify-center my-5">
//             <button type="submit" className="btn btn-primary" onClick={handleLoginRequest}>{hasAccount ? "Log In" : "Sign Up" }</button>
          
//           </div>
//            <div> { !hasAccount  ?  <div>
//             <span>Already Have An Account: </span>
//             <button 
//             className="btn btn-link p-0" 
//             onClick={()=>setHasAccount(prev=> !prev)}
//             >LogIn</button>
//             </div> : <div>
//                <span>Create an Account: </span>
//             <button 
//             className="btn btn-link p-0"
//              onClick={()=>setHasAccount(prev=> !prev)}
//             >SignUp</button>
//             </div> } </div>
//         </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;
