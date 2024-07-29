import { AUTH } from "@/firebase/config";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import errorCode from "./getErrors";

const error =ref(null);

const login = async (email,password)=>{
    error.value=null;

    try{
        const response= await signInWithEmailAndPassword(AUTH,email,password);
        error.value=null;

        return response;
    }catch(err){
        error.value=new Error(errorCode(err.code));
    }
}

const useLogin=()=>{
    return { error, login }
}

export default useLogin