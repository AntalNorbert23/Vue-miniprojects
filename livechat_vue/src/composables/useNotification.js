
import { ref } from "vue";

const notificationPermission=ref(Notification.permission);

const requestNotificationPermission=()=>{
    if(notificationPermission.value !=='granted'){
        Notification.requestPermission().then(permission=>{
            notificationPermission.value=permission;
        });
    }
};

const showNotification=(title,options)=>{
    if(notificationPermission.value === 'granted'){
        const notification=new Notification(title,options);
        notification.onclick=(event)=>{
            event.preventDefault();
            if(options.onclick){
                options.onclick();
            }
        }
    } else {
        console.log("Notification permission not granted.")
    }
}


export default function useNotification(){
    return {requestNotificationPermission,showNotification}
}