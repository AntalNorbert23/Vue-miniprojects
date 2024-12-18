//firebase imports
import { AUTH } from "@/firebase/config";
import { signOut } from "firebase/auth";

//vue imports
import { ref } from "vue";

//toast-notification import
import { useToast } from "vue-toast-notification";

//current user import
import getUser from "./getUser";

//import for loader on logout
import { useLoader } from "./useLoading";

//import for tracking user activity, setting user inactive
import useActivityTracking from "./useActivityTracking";

//use imports
const $toast =useToast();
const {user}=getUser();
const {setLogoutLoading} = useLoader();
const {setInactive} = useActivityTracking();

//constants
const error=ref(null);

const logout=async ()=>{
    error.value=null;

    try{
        setLogoutLoading(true);
        if(user.value){
            //set user inactive
            await setInactive();
        }
        //sign out from firebase
        await signOut(AUTH);
        $toast.success('Successfully logged out')
    }
    catch(err) { 
        console.log(err)
        error.value=err.message
        $toast.error("Something happened try again")
    }finally{
        setLogoutLoading(false);
    }
}

const useLogout=()=>{
    return { logout,error };
}

export default useLogout