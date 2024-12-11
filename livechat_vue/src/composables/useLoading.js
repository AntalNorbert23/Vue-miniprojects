import { ref } from "vue";

const isLoading = ref(false);

export const useLoader = ()=>{
    const setLoading = (value)=>{
        isLoading.value= value
    }

    return { isLoading, setLoading };
}