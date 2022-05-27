
const deviceIDObj = (localStorage.getItem('deviceID') !== "undefined" && localStorage.getItem('deviceID') !== null) ? JSON.parse(localStorage.getItem('deviceID')) : false;
console.log("~initialState deviceID: ", deviceIDObj)
const token = (localStorage.getItem('token') !== "undefined" && localStorage.getItem('token') !== null) ? localStorage.getItem('token') : '';
const currentUserObj = (localStorage.getItem('currentUser') !== "undefined" && localStorage.getItem('currentUser') !== null) ? JSON.parse(localStorage.getItem('currentUser')) : { "jwt": token, 'role': 0 };
console.log("localStorage.getItem('currentUser'): ", localStorage.getItem('currentUser'))
console.log("currentUserObj: ", currentUserObj)
const initialState = {
    deviceID: deviceIDObj,
    currentUser: currentUserObj,
    selectedTutors: [],
    selectUserOrders: { "current": "", "response": "" },
    error: '',
    message: ''
}
console.log("~initialState state.deviceID: ", initialState.deviceID)
const reducer = (state = initialState, action) => {
    console.log("action.type");
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case 'DEVICE_ID':
            console.log('DEVICE_ID')
            console.log(action.payload)
            console.log(state.deviceID)
            let deviceID = Object.assign({}, state.deviceID, action.payload);
            console.log(deviceID)
            localStorage.setItem('deviceID', JSON.stringify(deviceID));
            console.log('//LOGIN_USER')
            return { ...state, deviceID: deviceID }
        case 'LOGIN_USER':
            console.log('LOGIN_USER')
            console.log(action.payload)
            console.log(state.currentUser)
            let obj = Object.assign({}, state.currentUser, action.payload);
            console.log(obj)
            localStorage.setItem('currentUser', JSON.stringify(obj));
            console.log('//LOGIN_USER')
            return { ...state, currentUser: obj }
        case 'AVATAR':
            state.currentUser.avatar.src = "/handler/uploads/" + action.payload + ".png";
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
            return { ...state, currentUser: state.currentUser }
        case 'LOGOUT_USER':
            localStorage.setItem('token', null);
            localStorage.setItem('currentUser', JSON.stringify({ 'jwt': '', 'role': 0 }));
            return { ...state, currentUser: { 'jwt': '', 'role': 0 } }
        case 'ERROR':
            return { ...state, error: action.payload }
        case 'MESSAGE':
            return { ...state, message: action.payload }
        case 'SWITCH_MENU':
            return { ...state }
        case 'TUTOR_FORM':
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            return { ...state, currentUser: action.payload }
        case 'SELECT_TUTORS':
            return { ...state, selectedTutors: action.payload }
        case 'USER_ORDERS':
            console.log('~~~~~ reduser USER_ORDERS: ' + action.payload)
            state.selectUserOrders.response = action.payload
            return { ...state, selectUserOrders: state.selectUserOrders }
        default:
            return state;
    }
}
export default reducer;