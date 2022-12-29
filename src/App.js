import './App.css';
import Navs from './Navs';
import React from 'react'
import DarkModeContext from './Context/DarkMode';
import UserContextProvider from './Context/UserContext';

function App(){
  // const [darkModeOn,setDarkModeOn]=React.useState(false)
  return(
    <div className="App" style={{minWidth:'100vw'}}>
      <UserContextProvider>
        <DarkModeContext>
          <Navs/>
        </DarkModeContext>
      </UserContextProvider>
    </div>
  );
}
export default App;
