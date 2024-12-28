import { computed,ref,onScopeDispose } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import getUser from './getUser';
import { DB } from '@/firebase/config';

let unsubscribe;
const users=ref([]);
const isLoaded = ref(false);
const { user } = getUser();

import { useLoader } from '@/composables/useLoading';
const { setLoading } = useLoader();

const currentUser = computed(() => user.value);

export const fetchUsers =  () => {
    if (isLoaded.value && unsubscribe) return { users };

    setLoading(true);
    const usersCollection = collection(DB, 'users');

      unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      isLoaded.value=true;
    });

    // onScopeDispose(() => {
    //    stopListeningToUsers();
    //   });

    return {users};
}

export const filteredUsers=computed(()=>{
    if(!users.value || !user.value) return [];
    return users.value.filter(otherUser=>otherUser.id !== user.value.uid);
  })

export const filteredUser=computed(()=>{
  if(!users.value || !user.value) return [];
  
  return users.value.filter(otherUser=>otherUser.id == user.value.uid);
})

  export const stopListeningToUsers = () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
      users.value = [];
      isLoaded.value = false;
    }
  };

  export const useUsers = () => {
    return {
        users,
        filteredUsers,
        fetchUsers,
        filteredUser,
        currentUser
    };
};