import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const Home = () => {
  const [user,loading]=useAuthState(auth)
  const [number, setNumber] = useState(0);
  useEffect(()=> {
    const getCount = async()=> {
      const snapshot =await  getCountFromServer((collection(db, "users", user.uid, 'posts')))
      console.log('count', snapshot.data().count)
      setNumber(snapshot.data().count)
      }
      getCount()
    },[]
  )
   
  return (
      <div className="h-[200px] ">
        <div className='my-40 w-full h-[300px] '>
          <img className='opacity-80 h-[400px] w-full' src='/blog.jpg' alt='example'/>
        </div>
        <div className='text-3xl text-center pb-10 '>
          <p>You have {number} blog posts so far</p>
          <p>{number>2?'keep going':'keep it up'}</p>
        </div>
    </div>
      )
  };
  
  export default Home;