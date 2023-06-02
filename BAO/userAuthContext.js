import { createContext, useContext, useEffect, useState } from "react";
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({});
  const [loggedUserUid, setLoggedUserUid] = useState("");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // TEST
  const provider = new GoogleAuthProvider();
  function loginWithGoogle() {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        const uid = user.uid;
        // const userRef = firebase.firestore().collection("users").doc(uid);

        // // Verificar si el documento del usuario ya existe
        // userRef.get().then((doc) => {
        //   if (doc.exists) {
        //     console.log("El usuario ya tiene un documento asociado");
        //     // Aquí puedes realizar acciones adicionales o redirigir al usuario a otra página
        //   } else {
        //     // Crear un nuevo documento solo si no existe
        //     userRef.set({
        //       name: user.displayName,
        //       email: user.email,
        //       photoURL: user.photoURL,
        //     }).then(() => {
        //       console.log("Información del usuario asociada con éxito");
        //     }).catch((error) => {
        //       console.error("Error al asociar información del usuario:", error);
        //     });
        //   }
        // }).catch((error) => {
        //   console.error("Error al verificar el documento del usuario:", error);
        // });



      }).catch((error) => {
        console.log("error", error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  // FINISH TEST

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
  const router = useRouter();
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
          // setLoggedUser(JSON?.parse(sessionStorage.getItem("data")));
          setLoggedUserUid(currentUser.uid);
        });
      } else if (router.route != "/") {
        window.location.href = "/";
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
        loginWithGoogle,
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
