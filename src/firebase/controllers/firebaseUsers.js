import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export async function signUp({
  email,
  password,
  fullName = "",
  role = "employee",
}) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  const userRef = doc(db, "users", user.uid);
  const profile = {
    id: user.uid,
    email,
    fullName,
    role,
    avatarUrl: null,
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef, profile);

  return profile;
}

export async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const profile = userDoc.exists() ? userDoc.data() : null;

  return { authUser: user, profile };
}

export async function signOut() {
  return firebaseSignOut(auth);
}
