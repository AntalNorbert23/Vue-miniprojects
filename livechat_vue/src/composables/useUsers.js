//vue imports
import { computed,ref } from 'vue';

//firebase imports
import { DB } from '@/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

//composable imports
import getUser from './getUser';
import { useLoader } from '@/composables/useLoading';

//composables usage
const { user } = getUser();
const { setLoading } = useLoader();

//constants
let unsubscribe;
const users=ref([]);
const isLoaded = ref(false);
const currentUser = computed(() => user.value);

//function for fetching users from firebase
export const fetchUsers =  () => {
    if (isLoaded.value && unsubscribe) return { users };

    setLoading(true);
    const usersCollection = collection(DB, 'users');

      unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      isLoaded.value=true;
    });

    return {users};
}

  //filter users that is not the current user
  export const filteredUsers=computed(()=>{
    if(!users.value || !user.value) return [];
    return users.value.filter(otherUser=>otherUser.id !== user.value.uid);
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
        currentUser
    };
};