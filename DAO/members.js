import { database } from "@/BAO/firebaseConfig";
import { collection, getDocs, query, where, addDoc, orderBy, doc, updateDoc, getDoc } from "firebase/firestore";
export { getMembersByEventId };

import Swal from "sweetalert2";

const getMembersByEventId = async (eventId) => {
  try {
    const membersCollection = collection(database, "okevents/data/members");
    const q = query(
      membersCollection,
      where("eventId", "==", eventId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const members = querySnapshot.docs.map((doc) => {
      const memberData = doc.data();
      return { ...memberData, id: doc.id }; // Agregar el ID como propiedad "id"
    });

    return members;
  } catch (error) {
    console.error("Error al obtener los miembros por eventId:", error);
    return [];
  }
};


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

const downloadFileBulkUpload = () => {
  var link = document.createElement("a");
  link.href =
    "https://firebasestorage.googleapis.com/v0/b/okevents-f3a50.appspot.com/o/bulkLoad%2FCarga%20Masiva%20OKEvents.xlsx?alt=media&token=309ed0f7-6987-41b0-8edb-3b42142c3273";
  link.download = "Carga Masiva.xlsx";
  link.dispatchEvent(new MouseEvent("click"));
};

const bulkMemberUpload = async (members, eventId) => {
  const memberRef = collection(database, "okevents/data/members");
  const date = new Date();
  const memberDontExist = await memberNoExistsBulk(eventId, members);
  if (memberDontExist.length!=0) {
    memberDontExist.map((data) => {
      addDoc(memberRef, {
        eventId: eventId,
        imageUrl: "",
        confirmation: `${
          data.hasOwnProperty("Estatus_2") ? data.Estatus_1.toString().trim().toLowerCase() : ""
        }`,
        memberID: `${
          data.hasOwnProperty("Id") ? data.Id.toString().trim().toLowerCase() : ""
        }`,
        name: `${
          data.hasOwnProperty("Nombre") ? data.Nombre.trim().toLowerCase() : ""
        }`,
        identification: `${
          data.hasOwnProperty("Número_Cédula")
            ? data.Número_Cédula.toString().trim().toLowerCase()
            : ""
        }`,
        email: `${
          data.hasOwnProperty("Correo")
            ? data.Correo.trim().toLowerCase()
            : ""
        }`,
        phoneNumber: `${
          data.hasOwnProperty("Teléfono")
            ? data.Teléfono.toString().trim().toLowerCase()
            : ""
        }`,
        status: `${
          data.hasOwnProperty("Estatus_1") ? data.Estatus_1.trim() : ""
        }`,
        createdAt: date,
        present: false,
        arrivalDate: "",
        registeredBy: "",
      })
       .then((docRef) => {
          Toast.fire({
            icon: "success",
            title: `Validación y creación de los miembros correctamente`,
          });
          return true;
       })
       .catch((error) => {
         Toast.fire({
           icon: "error",
           title: `No se pudo crear los miembros`,
         });
         return false;
       });
  }); 
  }else{
    Toast.fire({
      icon: "error",
      title: `Los miembro ingresados ya se encuentran ingresados en el evento`,
    });
    return true;
  }
};

const addMember = async (user, eventId) => {
  const memberDontExist = await memberNoExists(eventId, user.memberID, user.identification);
  if (memberDontExist) {
    const memberRef = collection(database, "okevents/data/members");
    const date = new Date();
    await addDoc(memberRef, {
      eventId: eventId,
      confirmation: user.confirmation,
      memberID: user.memberID,
      imageUrl: user.imageUrl,
      name: user.name.trim().toLowerCase(),
      identification: user.identification,
      email: user.email.trim().toLowerCase(),
      phoneNumber: user.phoneNumber,
      status: user.status,
      createdAt: date,
      present: false,
      arrivalDate: "",
      registeredBy: "",
    });
    return true;
  }
};

const memberNoExists = async (eventId, memberID, identification) => {
  const memberRef = collection(database, "okevents/data/members");

  const qMemberID = query(memberRef, where("eventId", "==", eventId), where("memberID", "==", memberID));
  const qMemberIdentification = query(memberRef, where("eventId", "==", eventId), where("identification", "==", identification));

  const querySnapshotId = await getDocs(qMemberID);
  const querySnapshotIdentif = await getDocs(qMemberIdentification);
  console.log(memberID, identification)
  console.log("whyyy", !querySnapshotId.empty || !querySnapshotIdentif.empty)
  if (!querySnapshotId.empty || !querySnapshotIdentif.empty) {
    Toast.fire({
      icon: "error",
      title: `El miembro ingresado ya se encuentra ingresado en el evento`,
    });
  }

  return querySnapshotId.empty && querySnapshotIdentif.empty;
};

const memberNoExistsBulk = async (eventId, members) => {
  const memebersGood = [];
  
  for (const data of members) {
    const memberRef = collection(database, "okevents/data/members");
    const qMemberID = query(memberRef, where("eventId", "==", eventId), where("memberID", "==", data.Id));
    const qMemberIdentification = query(memberRef, where("eventId", "==", eventId), where("identification", "==", data.Número_Cédula));
  
    const querySnapshotId = await getDocs(qMemberID);
    const querySnapshotIdentif = await getDocs(qMemberIdentification);
    
    if (querySnapshotId.empty || querySnapshotIdentif.empty) {
      memebersGood.push(data);
    }
  }
  
  return memebersGood;
};

const getMemberById = async (memberId) => {
  try {
    const memberRef = doc(database, "okevents/data/members", memberId);
    const memberDoc = await getDoc(memberRef);

    if (memberDoc.exists()) {
      const memberData = memberDoc.data();
      return { id: memberDoc.id, ...memberData };
    } else {
      console.log(`No se encontró el miembro con ID ${memberId}.`);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener el miembro con ID ${memberId}:`, error);
    return null;
  }
};

const UpdatePresentState = async (memberId, loggedUserUid) => {
  try {
    const memberRef = doc(database, "okevents/data/members", memberId);
    const currentTime = new Date();

    await updateDoc(memberRef, { present: true, arrivalDate: currentTime, registeredBy: loggedUserUid });

    console.log(`Campo "present" actualizado correctamente para el miembro con ID ${memberId}.`);
  } catch (error) {
    console.error(`Error al actualizar el campo "present" del miembro con ID ${memberId}:`, error);
  }
};

export { downloadFileBulkUpload, bulkMemberUpload, memberNoExists, addMember, UpdatePresentState, getMemberById };
