export const logUser = (data)=>{
    return {
        type : "LOG_USER",
        payload : data
    }
}

export const logOut = () =>{
    return {
        type : 'LOG_OUT'
    }
}

export const userChannel = (arr) =>{
    return{
        type : 'USER_CHANNEL',
        payload : arr
    }
}