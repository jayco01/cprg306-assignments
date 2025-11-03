import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

const getItems = async (userId) => {
  const q = query(collection(db, "users", userId, "items"));

  const querySnapshot = await getDocs(q);

  const itemArr = [];
  querySnapshot.docs.forEach((doc) => {
    itemArr.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return itemArr;
}

const addItem = async (userId, item) => {
  const itemsCollectionRef = await collection(db, "users", userId, "items");

  const docRef = await addDoc(itemsCollectionRef, item)

  return docRef.id;
}

export {getItems, addItem};