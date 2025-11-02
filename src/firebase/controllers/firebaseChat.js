import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getEmployees = (callback) => {
  const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(employees);
  });

  return unsubscribe;
};

export const createConversation = async (userId, hrId, hrName) => {
  const q = query(
    collection(db, "conversations"),
    where("participantIds", "array-contains", userId),
  );

  const querySnapshot = await getDocs(q);
  const existingDoc = querySnapshot.docs.find((d) => {
    const participantIds = d.data().participantIds || [];
    return participantIds.includes(userId) && participantIds.includes(hrId);
  });

  if (existingDoc) {
    return existingDoc.id;
  }

  const userDoc = await getDoc(doc(db, "users", userId));
  if (!userDoc.exists()) return null;
  const userData = userDoc.data();

  const conversationRef = doc(collection(db, "conversations"));
  const conversationId = conversationRef.id;

  await setDoc(conversationRef, {
    id: conversationId,
    participantIds: [userId, hrId],
    participantNames: [
      userData.fullName || userData.email?.split("@")[0] || userId,
      hrName,
    ],
    lastMessage: "",
    lastMessageTimestamp: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
  return conversationId;
};

export const sendMessage = async (conversationId, senderId, text) => {
  const messagesRef = collection(
    db,
    "conversations",
    conversationId,
    "messages",
  );

  await addDoc(messagesRef, {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });

  const conversationRef = doc(db, "conversations", conversationId);
  await setDoc(
    conversationRef,
    {
      lastMessage: text,
      lastMessageTimestamp: serverTimestamp(),
    },
    { merge: true },
  );
};

export const listenToConversation = (conversationId, callback) => {
  const conversationRef = doc(db, "conversations", conversationId);

  const unsubscribeConversation = onSnapshot(conversationRef, (docSnap) => {
    const conversationData = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    const messagesQuery = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("timestamp", "asc"),
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback({
        conversation: conversationData,
        messages,
      });
    });

    return () => unsubscribeMessages();
  });

  return () => unsubscribeConversation();
};

export const listenToConversations = (userId, callback) => {
  const q = query(
    collection(db, "conversations"),
    where("participantIds", "array-contains", userId),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const conversations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(conversations);
  });

  return unsubscribe;
};
