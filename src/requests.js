import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase";

export const addData = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            post: "Ada",
            title: "Lovelace",
            date: 1815,
            id: 324
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

