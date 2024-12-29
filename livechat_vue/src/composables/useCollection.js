//vue imports
import { ref } from "vue";

//firebase imports
import { DB } from "@/firebase/config";
import { collection, addDoc,setDoc,doc, deleteDoc } from "firebase/firestore";


const useCollection=(collectionName)=>{
    const error=ref(null);
    let typingTimeout = null;
    //add doc to collection
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

    //set typingstatus to true
    const setTypingStatus=async(user,chatId)=>{
        const typingDocRef=doc(collection(DB,'typingStatuses'),user.uid);
        await setDoc(typingDocRef,{name: user.displayName, uid:user.uid, isTyping:true,chatId})
    
        if (typingTimeout) clearTimeout(typingTimeout);

        typingTimeout=setTimeout(async() => {
            await deleteDoc(typingDocRef);
        }, 1000);
    }
    return { error, addDocToCollection,setTypingStatus }
}


export default useCollection