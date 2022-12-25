import React,{useReducer} from "react"
export const UserContext=React.createContext()

const initialState={
    user:JSON.parse(localStorage.getItem('user'))||null,
    userInfo:JSON.parse(localStorage.getItem('userInfo'))||null
}

function reducer(state, action){
    switch(action.type){
        case 'SET_USER':
            localStorage.setItem('user',JSON.stringify(action.payload))
            return{
                user:action.payload
            }
        case 'SET_USER_INFO':
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
            return{
                userInfo:action.payload
            }
        default:
            throw new Error()      
    }
}

function UserContextProvider(props){
    const [state, dispatch] = useReducer(reducer,initialState);
    console.log(state)
    return (<UserContext.Provider value={[state,dispatch]}>
        {props.children}
    </UserContext.Provider>);
}
export default UserContextProvider