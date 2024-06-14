import { ref } from "vue";
import { AUTH } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";


const user =ref(AUTH.currentUser);

onAuthStateChanged(AUTH,(_user)=>{
    user.value=_user;
})

const getUser=()=>{
    return { user }
}


export default getUser