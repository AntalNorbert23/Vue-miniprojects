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

        const haveTwoNames= computed(()=>{
            return data.names.length>1
        })
        const generateLooser=()=>{
            let random=getRandomName();

            if(data.result !==""){
                while(random === data.result){
                    random=generateLooser();
                }
            }

            data.result=random;
        }

        const showResult=()=>{
            generateLooser();
            data.state=false;
        }

        const validate=(inputValue)=>{
            data.error="";

            if(inputValue===""){
                data.error="No empty name!";
                return false;
            }else if(inputValue.length<3){
                data.error="Name can't be that short!";
                return false;
            }else if(inputValue.length>15){
                data.error="Name can't be that long!";
                return false;
            }
            if(data.names.includes(inputValue)){
                data.error="Names must be unique!";
                return false;
            }

            return true;
        }

        const addNameToList= ()=>{
            const userName=data.inputName;

            if(validate(userName)){
                data.names.push(userName);
                data.inputName="";
                data.showError=false;
                //console.log(data.names)
            }else{
                data.showError=true;
            }
            
        }

        const getRandomName=()=>{
            return data.names[Math.floor(Math.random()*data.names.length)]
        }
       
        const removeName=(index)=>{
            data.names.splice(index,1);
        }

        const resetApp=()=>{
            data.state=true;
            data.inputName="";
            data.names=[];
            data.error="";
            data.showError=false;
            data.result="";
        }
        
        const getNewName=()=>{
            generateLooser();
        }

        return{ data, addNameToList, removeName, haveTwoNames, showResult, resetApp, getNewName }
    }
}).mount("#app")