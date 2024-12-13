import { ref } from "vue";

const isLoading = ref(false);
const isLoggingOut = ref(false); 

export const useLoader = ()=>{
    const setLoading = (value)=>{
        isLoading.value= value
    }

    const setLogoutLoading = (value) => {
        isLoggingOut.value = value;
      }

    return { isLoading, setLoading, isLoggingOut, setLogoutLoading  };
}