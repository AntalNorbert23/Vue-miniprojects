<template>
    <nav v-if="user">
        <div>
            <p>Hey there {{ user.displayName }}</p>
            <p class="email">Currently logged in as {{ user.email }}</p>
        </div>
        <router-link :to="{name:'availableusers'}" v-if="route.name!=='availableusers'" class="fa fa-arrow-left"></router-link>
        <button @click="handleLogout">Logout</button>
    </nav>
</template>

<script setup>
    //composables import 
    import useLogout from '@/composables/useLogout';
    import getUser from '@/composables/getUser';

    //router import 
    import {useRoute, useRouter} from 'vue-router';

    //use composables
    const { logout, error }=useLogout();
    const { user }=getUser();

    //use router
    const route=useRoute();
    const router=useRouter();

    
    const handleLogout=async()=>{
        await logout();
        user.value=null;
        
        if(!error.value){
            console.log('user logged out ');
            router.push({name:'welcome'})
        }
    }
</script>

<style scoped>
    nav {
        padding:30px 20px 20px 20px;
        border-bottom:1px solid #eee;
        display:flex;
        justify-content: space-between;
        align-items: center;
        position:relative;
    }
    nav p{
        margin:2px autp;
        font-size:16px;
        color:#444;
    }
    nav p.email {
        font-size:14px;
        color:#999;

    }
    nav div{
        margin-left:60px;
    }
    a{  
        position:absolute;
        text-decoration:none;
        background-color: #5ae4ca;
        padding:10px;
        border-radius: 20px;
        color:white;
        bottom:40px;
    }
    a:visited{
        color:white;   
    }
</style>