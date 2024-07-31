
const errorCode=(code)=>{
    let message ="Sorry, try again later";

    switch(code){
        case "auth/user-not-found":
            message='Sorry, user not found, check your email'
            break;
        case "auth/email-already-in-use":
            message='Email already in use!'
            break;
        case "auth/wrong-password":
            message='Wrong password!'
            break;
        case "auth/invalid-credential":
            message='Invalid credential'
            break;
        case "auth/weak-password":
            message='Password must be longer than 6 characters'
            break;
        case "auth/too-many-requests":
            message='Try again later!'
            break;
            
        default:
            message=code;
    }

    return message;
}

export default errorCode;
