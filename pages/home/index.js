import { getAllEvents } from "@/DAO/event";
import EventCard from "@/UI-Components/event/eventCard";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
    const [eventsData, setEventsData] = useState([])

    const getEventsData = async () => {
        try {
            const events = await getAllEvents();
            setEventsData(events)
            // Realiza acciones adicionales con los eventos obtenidos
        } catch (error) {
            console.error("Error al obtener los eventos:", error);
        }
    }

    useEffect(() => {
        getEventsData()
    }, [])


    return (
        <div className="w-full min-w-[100vh] min-h-[100vh] bg-gray-100 md:pl-24 px-8 pt-10 md:pt-16 pb-10">
            <h1 className="font-bold tracking-normal leading-5 text-black ml-0 mb-3 lg:mb-0 mt-0 text-[1.5rem]">
                Eventos
            </h1>
            <Link href={"createEvent"}><button className="bg-[#426CB4] text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-[#204585]">Crear evento nuevo</button></Link>

            <div className="grid md:grid-cols-4 gap-y-5 mt-5 md:mt-10">
                {eventsData.map(eventData => {
                    return (<EventCard eventData={eventData} />)
                })}
            </div>

        </div>
    )
}

export default Home;