import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { database } from "@/BAO/firebaseConfig";

const CreateEventNew = (event) => {
  const eventsRef = collection(database, "okevents/data/events");

  addDoc(eventsRef, {
    name: event.name,
    eventId: event.eventId,
    description: event.description,
    eventType: event.eventType,
    startDate: event.startDate,
    endDate: event.finishDate,
    isOpen: true,
  })
    .then((docRef) => {
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
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

export { CreateEventNew, ValidateEventId };