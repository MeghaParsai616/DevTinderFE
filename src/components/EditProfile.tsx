import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import ToastMsg from "../ToastMsg";

const EditProfile = ({ user }) => {
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age); // Removed hardcoded credentials
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [response, setResponse] = useState("");
  const handleFormSubmit = async(e) => {
    e.preventDefault();

    try {
      setResponse("");
      const resp = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true },
      );
      console.log("resp?.message..",resp)
      setResponse("Your Data has been saved successfully");
    } catch (err) {
      console.log(err);
      setResponse("Try Again , Your Data could not be saved");
    }
  };
  return (
    <>
      <div className="flex gap-5 justify-center">
        <div className="flex justify-center my-15">
          <div className="card bg-black w-96 shadow-sm">
            {/* Changed wrapper to a form for keyboard form submission */}
            <form className="card-body" onSubmit={handleFormSubmit} noValidate>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
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
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                />
              </fieldset>
              <div className="card-actions justify-center my-5">
                {/* type="submit" fires the form's onSubmit event */}
                <button type="submit" className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
     {response  &&  <ToastMsg message={response} type="Error"/>}
   
    </>
  );
};
export default EditProfile;
