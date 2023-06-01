import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({});
  const [loggedUserUid, setLoggedUserUid] = useState("");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function changePassword(email) {
    auth.languageCode = "es";
    // var actionCodeSettings = {
    //   // url: "https://www.eventplus.app/",
    //   handleCodeInApp: false,
    // };
    return sendPasswordResetEmail(auth, email);
  }

  function logOut() {
    setLoggedUser("");
    sessionStorage.removeItem("data");
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const databaseRef = doc(
          database,
          `okevents/data/users/${currentUser.uid}`
        );
        const codeData = getDoc(databaseRef);
        codeData.then((doc) => {
          let data = doc.data();
          sessionStorage.setItem("data", JSON.stringify(data));
          setLoggedUser(JSON.parse(sessionStorage.getItem("data")));
          setLoggedUserUid(currentUser.uid);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setLoggedUser("");
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        logIn,
        logOut,
        loggedUser,
        changePassword,
        loggedUserUid,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userAuthContext);
}
