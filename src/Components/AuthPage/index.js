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
    // localStorage.setItem('user',JSON.stringify(user))
    dispatch({type:'SET_USER',payload:user})
    // console.log(user)
    const docRef = doc(db, "userData", user.uid);
    const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    
    const userType=docSnap.data().type

    if(userType && userType===type){
      // localStorage.setItem('userInfo',JSON.stringify(docSnap.data()))
      dispatch({type:'SET_USER_INFO',payload:docSnap.data()})
      //profile
      setTimeout(()=>{navigate(`/${type}/profile`)},1000)
      // navigate(`/${type}/profile`)
    }
    else if(userType && userType!==type){
      //invalid access  or invalid type user accessing
      alert(`Invalid access as you are trying to signIn as ${type} but you onboarded as ${userType} using this email`)
    }
    else{
      //onBoarding
      setTimeout(()=>{navigate(`/${type}/onboarding`)},1000)
      // navigate(`/${type}/onboarding`)
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