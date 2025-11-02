import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export const listenToFeedback = (callback) => {
  const feedbackCollection = collection(db, "feedback");

  const q = query(feedbackCollection, orderBy("date", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const feedbackList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(feedbackList);
  });

  return unsubscribe;
};
