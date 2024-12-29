//vue imports
import { ref,watchEffect } from "vue";

//firebase imports
import { DB } from "@/firebase/config";
import { collection, query,orderBy,onSnapshot, where } from "firebase/firestore";

//composable import and usage
import getUser from "./getUser";
const { user }=getUser();

//get collection of documents 
const getCollection=(collectionName)=>{
    const documents=ref(null);
    const error=ref(null);
    const typingUsers=ref([]);

    let colRef=collection(DB,collectionName);
    const q=query(colRef,orderBy('createdAt'));
    
    const unsub=onSnapshot(q,(snapshot)=>{
        let results=[];
        snapshot.docs.forEach(doc => {
            const data=doc.data();

            if(data.createdAt){
                results.push({...data, id: doc.id})
            }
        });
        documents.value=results;
        error.value=null;
    },(err)=>{
        console.log(err.message);
        documents.value=null;
        error.value='Could not fetch data';
    })

    //get  typingquery
    const typingQuery=query(collection(DB,'typingStatuses'),where('isTyping','==',true),where('chatId', '==', collectionName))
    const unsubTyping=onSnapshot(typingQuery,(snapshot)=>{
        //filter users that is typing
        typingUsers.value=snapshot.docs.map(doc=>doc.data())
                                        .filter(typingUser => typingUser.uid !== user.value.uid)
    })

    watchEffect((onInvalidate)=>{
        onInvalidate(()=>{
            unsub();
            unsubTyping();
        })
    })
    return{ documents,error,typingUsers }
}

export default getCollection