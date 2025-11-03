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