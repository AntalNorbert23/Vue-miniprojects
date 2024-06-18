import { ref } from "vue";
import { DB } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";


const useCollection=(collectionName)=>{
    const error=ref(null);

    const addDocToCollection=async(doc)=>{
        error.value=null;

        try{
            const colRef=collection(DB,collectionName);
            await addDoc(colRef,doc)
        }catch(err){
            console.log(err.message);
            err.value='Could not send the message';
        }
    }
    return { error, addDocToCollection }
}


export default useCollection