import {auth , googleprovider} from '../config/firebase';
import {createUserWithEmailAndPassword ,signInWithPopup,signOut} from 'firebase/auth';
import {useState} from 'react';


export const Auth = () =>{
    const [email,setEmail]=useState("");
    const [pass,setpass]=useState("");


    


    const signinwithgoogle = async () => {
        try{
            await signInWithPopup(auth,googleprovider);
        }
        catch(err){
            console.error(err);
        }
        
    };
    const logout = async () => {
        try{
            await signOut(auth);
        }
        catch(err){
            console.error(err);
        }
        
    };

    const signin = async () => {
        try{
            await createUserWithEmailAndPassword(auth,email,pass);
        }
        catch(err){
            console.error(err);
        }
        
    };

    return (

        
        
        <div>
            <input placeholder = "email" onChange={(e)=>setEmail(e.target.value)} ></input>
            <input type='password' placeholder = "password" onChange={(e)=>setpass(e.target.value)}></input>
            <button onClick={signin}>Sign in</button>
            <button onClick={signinwithgoogle}>Sign in with google</button>
            <button onClick={logout}>Log out</button>
        </div>
    );
}