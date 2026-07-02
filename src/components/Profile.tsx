import EditProfile from "./EditProfile";
import { useAppSelector } from "../store/hooks";

const Profile =() =>{
 const user :any =  useAppSelector((store) => store?.user);
    return <>{user && <EditProfile user={user}/>}</>
}
export default Profile;