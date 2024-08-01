import { ref } from "vue";
import { DB } from "@/firebase/config";
import { collection, addDoc,setDoc,doc, deleteDoc } from "firebase/firestore";


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

    const setTypingStatus=async(user)=>{
        const typingDocRef=doc(collection(DB,'typingStatuses'),user.uid);
        await setDoc(typingDocRef,{name: user.displayName, uid:user.uid, isTyping:true})
    
        setTimeout(async() => {
            await deleteDoc(typingDocRef);
        }, 4000);
    }
    return { error, addDocToCollection,setTypingStatus }
}


export default useCollection