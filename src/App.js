
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db,auth,storage } from './config/firebase';
import { getDocs,collection,addDoc, deleteDoc,doc, updateDoc,query,where,getDoc} from 'firebase/firestore';
import {ref,uploadBytes} from "firebase/storage";


function App() {

const [movielist,setmovielist]=useState([]);
const moviecollectionref=collection(db,"movies");



//new movie states

const [newmovie,setnewmovie]=useState("");
const [newdate,setnewdate]=useState(0);
const [isoscar,setisoscar]=useState(false);

//updatetitle state

const [updatedtitle,setupdatedtitle]=useState("");







useEffect(()=>{
  
  try {
    const userId = auth?.currentUser?.uid;
    if (!userId) return; // Make sure the user is authenticated

    getDocs(
      query(moviecollectionref, where('userId', '==', userId))
    ).then((querySnapshot)=>{
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })).then((filteredData)=>{setmovielist(filteredData);})
    })

    

    
  } catch (err) {
    console.error(err);
  }
},[moviecollectionref]);

const submitmovie = async () => {
  try{
    await addDoc(moviecollectionref,{title:newmovie,releaseDate: newdate,oscar: isoscar,userId: auth?.currentUser?.uid,});

    
  }
  catch(err){
    console.error(err);
  }
}

const deletemovie = async (id) => {
  try {
    const moviedoc = doc(db, 'movies', id);
    const movieSnapshot = await getDoc(moviedoc);
    const movieData = movieSnapshot.data();
    
    if (movieData.userId === auth?.currentUser?.uid) {
      await deleteDoc(moviedoc);
      
    }
  } catch (err) {
    console.error(err);
  }
};

const updatetitle = async (id) => {
  try {
    const moviedoc = doc(db, 'movies', id);
    const movieSnapshot = await getDoc(moviedoc);
    const movieData = movieSnapshot.data();
    
    if (movieData.userId === auth?.currentUser?.uid) {
      await updateDoc(moviedoc, { title: updatedtitle });
    }
  } catch (err) {
    console.error(err);
  }
};
const [updateddate,setupdateddate]=useState(0);

const updatedate = async(id)=>{
  try{
    const moviedoc=doc(db,"movies",id);
    await updateDoc(moviedoc,{releaseDate:updateddate});

  }catch(err){
    console.error(err);
  }
}

const [file,setfile]=useState(null);
const uploadfile = async () => {
  try{
    if(!file) return; 
    const filesfolderref =ref(storage,`projectfiles/${file.name}`);
    await uploadBytes(filesfolderref,file);

  }catch(err){
    console.error(err);
  }
}


  return (
    <div>
      <h1>healthconnect</h1>
      <Auth />
      <div>
        <input placeholder='moviename' onChange={(e) => setnewmovie(e.target.value)}></input>
        <input placeholder='releasedate...' onChange={(e) => setnewdate(Number(e.target.value))}></input>
        <input type="checkbox" checked={isoscar} onChange={(e)=>setisoscar(e.target.checked)}></input>
      <label>Received</label>
      <button onClick={submitmovie}>Submit movie</button>
    </div><div>
        {movielist.map((movie) => (
          <div>
            <h1 style={{color: movie.oscar?'green':'red'}}>
              {movie.title}
            </h1>
            <p>
              Date : {movie.releaseDate}
            </p>
            <div>
              <button onClick={()=>deletemovie(movie.id)}>Delete movie</button>
            </div>
            <div>
              <input placeholder='Update movietitle' onChange={(e)=>setupdatedtitle(e.target.value)}></input>
              <button onClick={()=>updatetitle(movie.id)}>Update title</button>
              <input placeholder='update release date' onChange={(e)=>setupdateddate(e.target.value)}></input>
              <button onClick={()=>{updatedate(movie.id)}}>update date</button>
              

            </div>
            <div>
              <input type='file' onChange={(e)=>setfile(e.target.files[0])}></input>
              <button onClick={uploadfile}>upload file</button>
            </div>

          </div>
          
        ))}
      </div>
      
    </div>
    
  );
}

export default App;
