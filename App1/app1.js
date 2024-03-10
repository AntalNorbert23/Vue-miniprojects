const { createApp, reactive, computed } = Vue;

const defaultState={
    state:true,
    inputName:"",
    names:[],
    error:"",
    showError:false,
    result:"",
}

createApp({
    setup(){

        const data= reactive(defaultState);

        const addNameToList= ()=>{
            const userName=data.inputName;

            data.names.push(userName);
            data.inputName="";

           // console.log(data.names)
        }

        return{ data, addNameToList }
    }
}).mount("#app")