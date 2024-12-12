import { ref } from "vue";
import { AUTH } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";


const user =ref(null);

onAuthStateChanged(AUTH,(authUser)=>{
    if(authUser){
        user.value = authUser;
    } else {
        user.value = null;
    }
})

export default function getUser() {
    return { user };
}