import React,{useContext} from 'react'
import { UserContext } from '../../Context/UserContext';
import './index.css'
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

function AuthPage({type}) {
  const navigate=useNavigate()
  const [,dispatch]=useContext(UserContext)
  const signIn=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(async(result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    dispatch({type:'SET_USER',payload:user})
    // console.log(user)
    const docRef = doc(db, "userData", user.uid);
    const docSnap = await getDoc(docRef);
    const userData=docSnap.data()
    console.log(type+''+userData)
    if(userData && userData.type===type){
      dispatch({type:'SET_USER_INFO',payload:userData})
      //profile
      setTimeout(()=>{navigate(`/${type}/profile`)},2000)
    }
    else if(userData && userData.type!==type){
      //invalid access  or invalid type user accessing
      alert(`Invalid access as you are trying to signIn as ${type} but you onboarded as ${userData.type} using this email`)
    }
    else{
      //onBoarding
      console.log(type+''+userData)
      navigate(`/${type}/onboarding`)
    }
  }).catch((error) => {
    // // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.customData.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error)
  });
  }
  return(
    <div className='auth-container'>
      <h1>Welcome {type}</h1>
      <h2>Sign In</h2>
      <br/><br/>
      <button type="button" onClick={signIn}>
        <img src="https://shortcuts-france.fr/wp-content/uploads/2021/04/google-logo-carre-2015-09-400.png" alt=""/>
        <h2>Sign in</h2>
      </button>
    </div>
  )
}
export default AuthPage