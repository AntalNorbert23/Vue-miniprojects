
import { doc, updateDoc } from 'firebase/firestore';
import { DB } from '@/firebase/config';
import getUser from './getUser';
const{user}=getUser();

export default function useActivityTracking() {

    const inactivity_timer = 0.01 * 60 * 1000;

    let activityTimeout;

    const setActive = async () => {
        if (user.value) {
            const userDocRef = doc(DB, 'users', user.value.uid);
            await updateDoc(userDocRef, { online: true });
            
        }
    };

    const setInactive = async () => {
        if (user.value && user.value.uid) {
            const userDocRef = doc(DB, 'users', user.value.uid);
            await updateDoc(userDocRef, { online: false });
        }
    };

    const resetActivityTimeout = () => {
        clearTimeout(activityTimeout);
        setActive();
        activityTimeout = setTimeout(setInactive, inactivity_timer);
    };

    const trackActivity = () => {
        window.addEventListener('mousemove', resetActivityTimeout);
        window.addEventListener('keypress', resetActivityTimeout);
        window.addEventListener('scroll', resetActivityTimeout);
    };

    const stopTrackingActivity = () => {
        window.removeEventListener('mousemove', resetActivityTimeout);
        window.removeEventListener('keypress', resetActivityTimeout);
        window.removeEventListener('scroll', resetActivityTimeout);
    };

    return {
        setActive,
        setInactive,
        resetActivityTimeout,
        trackActivity,
        stopTrackingActivity,
    };
}
