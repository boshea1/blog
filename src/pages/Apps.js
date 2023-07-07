import { onSnapshot,collection, addDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../firebase"

const Dot = ({color}) => {
    const style = {
      height: 25,
      width: 25,
      margin: '0px 10px',
      backgroundColor: color,
      borderRadius: '50%',
      display: 'inline-block',
    }
    return <span style={style}></span>
}



const Apps = () => { 
 const [colors,setColors] = useState([{name:'loading...', id:'initial'}])

useEffect(()=> onSnapshot(collection(db,'colors'),(snapshot)=>{
    console.log(snapshot.docs.map(doc => doc.data()))
    console.log(snapshot.docs.map(doc => doc.id))
    setColors(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
  }),
  [])

const handleNew = async () => {
  const name = prompt('Enter color name');
  const value = prompt('Enter value');
  const collectionRef = collection(db,'colors');
  const payload = {name, value};
  const docRef = await addDoc(collectionRef, payload);
  console.log('the new id is', docRef)
}
  return (
    <div className="m-4">
    <button className={'ml-5 mb-5 p-4 border-2 border-black'}onClick={handleNew}>New</button>
    <ul>
      {colors.map((color)=> (
        <li key={color.id}>
          <a href='#'>edit</a><Dot color={color.value}/>{color.name}
        </li>
      ))}
    </ul>
    </div>
  )
}

export default Apps