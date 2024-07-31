import { AUTH } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import errorCode from "./getErrors";
import { useToast } from "vue-toast-notification";

const error =ref(null);

const signUp=async (email, password, displayName)=>{
  const $toast=useToast();
    error.value=null;

    try{
      const response=  await createUserWithEmailAndPassword(AUTH,email, password);
      if(!response){
        throw new Error('Could not complete the signup');
      }
      await updateProfile(response.user, { displayName });
      error.value=null;

      $toast.success("Successfully signed up");
      return response;
    }catch(err){
        error.value=new Error(errorCode(err.code));
        $toast.error(error.value)
    }
};

const useSignup=()=>{
    return {error, signUp }
};

export default useSignup