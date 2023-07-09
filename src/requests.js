import {  setDoc,doc, deleteDoc, updateDoc,} from "firebase/firestore"; 
import { db } from "./firebase";




export const addData = async (post, title, id, date) => {

  

    try {
        const docRef = await setDoc(doc(db, 'users',id,'posts',title), {
            post: post,
            title: title,
            date: date,
            id: id
        });
        console.log("Document written with ID: ", docRef.id);
        // const x = firebase.firestore().collection('users').doc(currentUser.uid).set(currentUser)
        // console.log('x',x)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const handleDel = async(id, title) => {
        try {
                await deleteDoc(doc(db, "users", id, 'posts',title)); }
         catch(err) {
            console.log(err)
        }
    }
     
    export default handleDel;


export const handleUpdate = async(item, id) => {
    console.log(item)
    const ref = doc(db,'users',id, 'posts',item.title)
    await updateDoc(ref, item)
}




