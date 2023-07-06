import { collection, addDoc,doc, deleteDoc } from "firebase/firestore"; 
import { db } from "./firebase";

export const addData = async (post, title, id, date) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            post: post,
            title: title,
            date: date,
            id: id
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export const handleDel = async(id) => {
        
        try {
                await deleteDoc(doc(db, "test_data", id)); }
         catch(err) {
            console.log(err)
        }
    }
     
    export default handleDel;





