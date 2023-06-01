import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { database } from "@/BAO/firebaseConfig";
import Swal from "sweetalert2";


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

const CreateEventNew = (event) => {
  const eventsRef = collection(database, "okevents/data/events");
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.finishDate);

  addDoc(eventsRef, {
    name: event.name,
    eventId: event.eventId,
    description: event.description,
    eventType: event.eventType,
    startDate: startDate,
    endDate: endDate,
    isOpen: true,
  })
    .then((docRef) => {
      Toast.fire({
        icon: "success",
        title: `Evento creado correctamente`,
      });
      return true;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      Toast.fire({
        icon: "success",
        title: `No se pudo crear el evento`,
      });
      return false;
    });
};

const ValidateEventId = async (eventId) => {
  try {
    const eventsCollection = collection(database, "okevents/data/events");
    const q = query(eventsCollection, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al validar el eventId:", error);
    return false;
  }
};

const getAllEvents = async () => {
  try {
    const eventsCollection = collection(database, "okevents/data/events");
    const querySnapshot = await getDocs(eventsCollection);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    return [];
  }
};

export { CreateEventNew, ValidateEventId, getAllEvents };