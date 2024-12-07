import { AUTH } from "@/firebase/config";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import errorCode from "./getErrors";
import { useToast } from "vue-toast-notification";
import useActivityTracking from '@/composables/useActivityTracking';

const error =ref(null);

const login = async (email,password)=>{
    const $toast=useToast();
    error.value=null;

    try{
        const response= await signInWithEmailAndPassword(AUTH,email,password);
        error.value=null;

         const {setActive,trackActivity,resetActivityTimeout}=useActivityTracking();
         await setActive();
         trackActivity()
         resetActivityTimeout();
        
        $toast.success("Successfully logged in");
        return response;
    }catch(err){
        error.value=new Error(errorCode(err.code));
        $toast.error(error.value);
    }
}

const useLogin=()=>{
    return { error, login }
}

export default useLogin