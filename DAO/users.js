import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { database } from "@/BAO/firebaseConfig";
import Swal from "sweetalert2";
import { addUserMailToEvent } from "./event";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const RegisterNewUserFromLoginPage = async (user, authUid) => {
  const usersRef = doc(database, "okevents/data/users", authUid);
  await setDoc(usersRef, {
    imageUrl: user.imageUrl,
    name: user.name.trim().toLowerCase(),
    identification: user.identification,
    email: user.email.trim().toLowerCase(),
    phoneNumber: user.phoneNumber,
  }, {merge:true})
    .then((docRef) => {
      Toast.fire({
        icon: "success",
        title: `Usuario registrado correctamente`,
      });
      return true;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      Toast.fire({
        icon: "error",
        title: `No se pudo registrar el usuario`,
      });
      return false;
    });
};

const RegisterNewUserFromEvent = async (user, authUid, eventId) => {
  const usersRef = doc(database, "okevents/data/users", authUid);
  await setDoc(usersRef, {
    imageUrl: user.imageUrl,
    name: user.name.trim().toLowerCase(),
    identification: user.identification,
    email: user.email.trim().toLowerCase(),
    phoneNumber: user.phoneNumber,
  }, {merge:true})
    .then(async () => {
      await addUserMailToEvent(eventId, user.userType, user.email.trim().toLowerCase());
      Toast.fire({
        icon: "success",
        title: `Usuario registrado correctamente`,
      });
      return true;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      Toast.fire({
        icon: "error",
        title: `No se pudo registrar el usuario`,
      });
      return false;
    });
};

const ValidateUserExists = async (identification, email) => {
  try {
    const usersRef = collection(database, "okevents/data/users");
    // const qUserIdentification = query(usersRef, where("identification", "==", identification));
    const qUserEmail = query(usersRef, where("email", "==", email));
    // const querySnapshotId = await getDocs(qUserIdentification);
    const querySnapshotEmail = await getDocs(qUserEmail);
    // if (!querySnapshotId.empty || !querySnapshotEmail.empty) {
    //   Toast.fire({
    //     icon: "error",
    //     title: `El usuario ingresado ya existe en la base de datos`,
    //   });
    // }
    // return querySnapshotId.empty && querySnapshotEmail.empty;
    return querySnapshotEmail.empty;
  } catch (error) {
    console.error("Error al validar el usuario:", error);
    return false;
  }
};

const getUserByUid = async (uid) => {
  try {
    const userRef = doc(database, "okevents/data/users", uid);
    const userDoc = await getDoc(userRef)

    if (userDoc.exists) {
      const userData = userDoc.data();
      return { uid: userDoc.id, ...userData };
    } else {
      console.log(`No se encontró el usuario con UID ${uid}.`);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener el usuario con UID ${uid}:`, error);
    return null;
  }
};


export { getUserByUid, RegisterNewUserFromLoginPage, ValidateUserExists, RegisterNewUserFromEvent };
