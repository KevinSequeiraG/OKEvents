import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCustomToken,
} from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({});
  const [loggedUserUid, setLoggedUserUid] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logInWithToken(token) {
    return signInWithCustomToken(auth, token);
  }

  function changePassword(email) {
    auth.languageCode = "es";
    var actionCodeSettings = {
      url: "https://www.eventplus.app/",
      handleCodeInApp: false,
    };
    return sendPasswordResetEmail(auth, email, actionCodeSettings)
  }

  function logOut() {
    setLoggedUser("");
    sessionStorage.removeItem("data");
    setLoadingData(false);
    return signOut(auth);
  }

  useEffect(() => {
    setLoadingData(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const databaseRef = doc(
          database,
          `event+/data/users/${currentUser.uid}`
        );
        const codeData = getDoc(databaseRef);
        codeData.then((doc) => {
          let data = doc.data();
          sessionStorage.setItem("data", JSON.stringify(data));
          setLoggedUser(JSON.parse(sessionStorage.getItem("data")));
          setLoggedUserUid(currentUser.uid);
          //console.log(loggedUser);
          //setIsAdmin(data.userType == "Administrador");
          setLoadingData(false);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setLoadingData(false);
    setLoggedUser("");
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        logIn,
        logInWithToken,
        logOut,
        loggedUser,
        changePassword,
        loadingData,
        setIsAdmin,
        isAdmin,
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
