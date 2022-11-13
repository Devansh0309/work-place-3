import React from 'react'
import './index.css'
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { useNavigate } from "react-router-dom";

function AuthPage({type}) {
  const navigate=useNavigate()
  // const navigateToPage=(path)=>{
  //   navigate(path)
  // }
  const signIn=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    localStorage.setItem('user',JSON.stringify(user))
    console.log(user)
    if(type==='candidate'){
      if(false){
        //profile
        navigate('candidate/profile')
      }
      else{
        //onBoarding
        navigate("/candidate/onboarding" )
      }
    }
    else{
      if(false){
        //profile
        navigate("employer/profile")
      }
      else{
        //onBoarding
        navigate("/employer/onboarding")
      }
    }
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
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