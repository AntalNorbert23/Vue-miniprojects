//imports from firebase
import { AUTH } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

//imports from vue
import { ref } from "vue";

//import errors
import errorCode from "./getErrors";

//toast import 
import { useToast } from "vue-toast-notification";

//use imports
const $toast=useToast();

//constants
const error =ref(null);

const login = async (email,password)=>{
    error.value=null;

    try{
        //login with email and password firebase
        const response= await signInWithEmailAndPassword(AUTH,email,password);
        error.value=null;
        
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