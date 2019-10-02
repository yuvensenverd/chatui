
const INITIAL_STATE = {
    userid : null,
    username : '',
    password : '',
    isfacebook : null,
    email : '',
    chatlist : []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
 
        case 'LOG_USER':
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('password', action.payload.password)
            localStorage.setItem('userid', action.payload.userid)
            return {...INITIAL_STATE, ...action.payload}
        case 'LOG_OUT':
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            localStorage.removeItem('userid')
            return INITIAL_STATE
        case 'USER_CHANNEL':
            return {...state, chatlist : action.payload}
        default : 
            return state
    }
}