import { computed,ref,onScopeDispose } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import getUser from './getUser';
import { DB } from '@/firebase/config';

let unsubscribe;
const users=ref([]);
const { user } = getUser();

export const fetchUsers =  () => {
    const usersCollection = collection(DB, 'users');

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });

    onScopeDispose(() => {
        unsubscribe();
      });

    return {users};
}

export const filteredUsers=computed(()=>{
    if(!users.value || !user.value) return [];
    return users.value.filter(otherUser=>otherUser.id !== user.value.uid);
  })

  export const stopListeningToUsers = () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null; 
    }
  };