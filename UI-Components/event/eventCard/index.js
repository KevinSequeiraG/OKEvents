import Link from "next/link";
import { useEffect, useState } from "react";


const EventCard = (props) => {
    const [eventState, setEventState] = useState(1)
    const [data, setData] = useState({})
    const [startDate, setStartDate] = useState()
    // const [endDate, setEndDate] = useState()

    function formatDate(timestamp) {
        const date = new Date(timestamp.seconds * 1000);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses en JavaScript se indexan desde 0
        const year = date.getFullYear();

        // Agrega ceros iniciales si es necesario
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    useEffect(() => {
      setStartDate(formatDate(props.eventData.startDate));
      // setEndDate(formatDate(props.eventData.endDate))
      //today's date
      var today = new Date();

      var fecha1 = new Date(props.eventData.startDate * 1000);
      fecha1.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00

      var fecha2 = new Date(today);
      fecha2.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00

      if (fecha1 == fecha2) {
        //STARTED
        setEventState(1);
      } else if (fecha1 < fecha2) {
        //FINALIZED
        setEventState(3);
      } else if (fecha1 > fecha2) {
        //PROGRAMMED
        setEventState(2);
      }
    }, []);


    return (
        <>
            <Link
                href={{
                    pathname: "/guestUsers",
                    query: {eventId: props.eventData?.eventId}
                }}
                as="/guestUsers"
            >
                <div
                    className="rounded-[10px] relative w-[20rem] md:w-full flex flex-row md:max-w-[24rem] bg-gray-200"
                >
                    <div
                        className={`absolute top-0 left-0 px-2 py-0.5 rounded-tl-[9px] rounded-br-[12px]  ${eventState == 1
                            ? "bg-[#35CA75]"
                            : eventState == 2
                                ? "bg-[#101217]"
                                : eventState == 3
                                    ? "bg-[#899592]"
                                    : ""
                            }`}
                    >
                        <p className="text-white text-[12px] font-semibold tracking-normal leading-5">
                            {eventState == 1
                                ? "Iniciado"
                                : eventState == 2
                                    ? "Programado"
                                    : eventState == 3
                                        ? "Finalizado"
                                        : ""}
                        </p>
                    </div>
                    <img
                        className={`inline-block rounded-l-[10px] object-cover w-32 min-h-full min-w-[7.5rem] max-w-[7.5rem]`}
                        src={`${props.eventData?.imageUrl
                            ? props.eventData?.imageUrl
                            : "./Images/defaultEventPicture.png"
                            }`}
                        alt="Foto del evento"
                    />
                    <div className="px-2 py-3 flex flex-col justify-between w-full">
                        <p className="text-[10px] lg:text-[12px] font-bold text-[#899592]">
                            {props.eventData?.eventType}
                        </p>
                        <h1 className="text-[12px] lg:text-[16px] font-bold truncate my-1">
                            {props.eventData?.name}
                        </h1>
                        <h3 className="text-[10px] lg:text-[12px] text-[#899592]">
                            Inicia: {startDate}
                        </h3>
                        {/* <h3 className="text-[10px] text-[#899592]">
                            Termina: {endDate}
                        </h3> */}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default EventCard;