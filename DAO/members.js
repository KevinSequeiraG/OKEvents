import { database } from "@/BAO/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const getMembersByEventId = async (eventId) => {
    try {
        const membersCollection = collection(database, "okevents/data/members");
        const q = query(membersCollection, where("eventId", "==", eventId));
        const querySnapshot = await getDocs(q);

        const members = querySnapshot.docs.map((doc) => doc.data());
        return members;
    } catch (error) {
        console.error("Error al obtener los miembros por eventId:", error);
        return [];
    }
};

export { getMembersByEventId }