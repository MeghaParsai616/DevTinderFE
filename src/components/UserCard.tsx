const UserCard = ({user} : any) => {
const {photoUrl,about,  age, gender, firstName, lastName}  = user;

    return (      <div className="flex justify-center my-15">
      <div className="card bg-black w-96 shadow-sm">
       <img className="w-100 h-100 " src={photoUrl}></img>
       <div className="my-3 mx-2">
       <p>{firstName} {lastName}</p>
       <p>{age} {age ? `,` : ""} {gender}</p>
 <p className="my-5 ">{about}</p>

       </div>
      </div>
    </div>)
}
export default UserCard