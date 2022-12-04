import React,{useReducer} from "react"
export const ColorContext=React.createContext()

const initialState={
    darkMode:JSON.parse(localStorage.getItem('mode')||false)
}

function reducer(state, action) {
    switch(action.type){
        case 'Dark':
            localStorage.setItem('mode',JSON.stringify(true))
            return{
                ...state,
                darkMode:true
            }
        case 'Light':
            localStorage.setItem('mode',JSON.stringify(false))
            return{
                ...state,
                darkMode:false
            }
        default:
            throw new Error()      
    }
}

function DarkModeContext(props){
    const [state, dispatch] = useReducer(reducer,initialState);
    console.log(state)
    return (<ColorContext.Provider value={[state,dispatch]}>
        {props.children}
    </ColorContext.Provider>);
}
export default DarkModeContext