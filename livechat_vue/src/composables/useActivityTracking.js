//firestore imports
import { doc, updateDoc } from 'firebase/firestore';
import { DB } from '@/firebase/config';
//get the current user
import getUser from './getUser';
const { user } = getUser();

//state of user logging out
import { useLoader } from './useLoading';
const { isLoggingOut } = useLoader();

export default function useActivityTracking() {
    //Inactivity timer has the function of setting user for an amount of time it's just a constant 
    const inactivity_timer = 1 * 60 * 1000; 
    let activityTimeout;

    let isActive=false;

    // Set user as active
    const setActive = async () => {
        if (user.value && user.value.uid) {
            isActive=true
            console.log("Setting user Active")
            const userDocRef = doc(DB, 'users', user.value.uid);
            await updateDoc(userDocRef, { online: true });
        }else{
            console.log('setting error not working user not online')
        }
    };

    // Set user as inactive
    const setInactive = async () => {
        if (user.value && user.value.uid) {
            isActive=false;
            console.log('setting user offline')
            const userDocRef = doc(DB, 'users', user.value.uid);
            await updateDoc(userDocRef, { online: false });
        }else{
            console.log('setting user offline not working')
        }
    };

    // Reset the activity timeout (constant) if there is a user,clear the previous timeout and set again the user active
    const resetActivityTimeout = async() => {
        if (!user.value || !user.value.uid) return;
        console.log('reset activity')

        clearTimeout(activityTimeout);

        activityTimeout = setTimeout(async () => {await setInactive()}, inactivity_timer);
        await setActive();
    };

    //condition of user is logging out, if user is logging out do not reset the activity timeout
    const handleActivity =() => {
        if (isLoggingOut.value ===false && isActive ===false) {
            resetActivityTimeout(); 
            
            console.log('User is not logging out');
        }else{
            console.error("User logged out");
        }
    };

      //if tab is invisible set user as inactive
      const handleTabVisibilityChange = async () => {
        if (document.hidden) await setInactive();
    };

    //track the activity of user by adding event listeners
    const trackActivity = () => {
        if (!user.value || !user.value.uid) return;

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);
        window.addEventListener('scroll', handleActivity);
        window.addEventListener('visibilitychange', handleTabVisibilityChange);

        resetActivityTimeout();
    };

    //stop the event listeners and clear previous timeout
    const stopTrackingActivity = () => {
        clearTimeout(activityTimeout);
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keypress', handleActivity);
        window.removeEventListener('scroll', handleActivity);
        window.removeEventListener('visibilitychange', handleTabVisibilityChange);
    };

    //track user
    const trackExistingUser = () => {
        if (user.value) {
            trackActivity(); 
        }
    };

    return {
        setActive,
        setInactive,
        resetActivityTimeout,
        trackActivity,
        stopTrackingActivity,
        trackExistingUser
    };
}