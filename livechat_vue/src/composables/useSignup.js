import { AUTH } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";

const error =ref(null);

const signUp=async (email, password, displayName)=>{
    error.value=null;

    try{
      const response=  await createUserWithEmailAndPassword(AUTH,email, password);
      if(!response){
        throw new Error('Could not complete the signup');
      }
      await updateProfile(response.user, { displayName });
      error.value=null;

      return response;
    }catch(err){
        error.value=err.message;
    }
};

const useSignup=()=>{
    return {error, signUp }
};

export default useSignup