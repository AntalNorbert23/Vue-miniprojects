<template>
  <div>
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id" @click="enterChat(user.id)">
        {{ user.displayName }}
      </li>
    </ul>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { collection, getDocs } from 'firebase/firestore';
    import { useRouter } from 'vue-router';
    import { DB } from "@/firebase/config";

    const users = ref([]);
    const router = useRouter();

    const fetchUsers = async () => {
   
    const usersCollection = collection(DB, 'users');
    const usersSnapshot = await getDocs(usersCollection);

    users.value = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const enterChat = (userId) => {
        router.push({ name: 'chatroom', params: { userId } });
    };

    onMounted(fetchUsers);
</script>

<style scoped>
    ul {
    list-style-type: none;
    padding: 0;
    }
    li {
    cursor: pointer;
    padding: 10px;
    margin: 5px 0;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    }
</style>
