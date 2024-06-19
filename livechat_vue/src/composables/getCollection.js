import { ref } from "vue";
import { DB } from "@/firebase/config";
import { collection, query,orderBy,onSnapshot } from "firebase/firestore";


const getCollection=(collectionName)=>{
    const documents=ref(null);
    const error=ref(null);

    let colRef=collection(DB,collectionName);
    const q=query(colRef,orderBy('createdAt'));
    
    onSnapshot(q,(snapshot)=>{
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

    return{ documents,error }
}

export default getCollection