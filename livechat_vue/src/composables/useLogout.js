import { AUTH } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import useActivityTracking from '@/composables/useActivityTracking';
import getUser from "./getUser";
const {user}=getUser();
import { stopListeningToUsers } from "./useUsers";
import { useLoader } from "./useLoading";
const {setLoading} = useLoader();

const $toast =useToast();

const error=ref(null);

const logout=async ()=>{
    error.value=null;

    try{
        setLoading(true);
        if (!user.value) return;
        if(user.value){
            const {setInactive,stopTrackingActivity}=useActivityTracking();
            

            stopListeningToUsers();
            await setInactive();
            
            await signOut(AUTH);
            setLoading(false);
        }
         
        $toast.success('Successfully logged out')
    }
    catch(err) {
        console.log(err)
        error.value=err.message
        $toast.error("Something happened try again")
    }
}

const useLogout=()=>{
    return { logout,error };
}

export default useLogout