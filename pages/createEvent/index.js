import { CreateEventNew, ValidateEventId } from "@/DAO/event";
import { useEffect, useState } from "react";

const CreateEvent = () => {
    const [event, setEvent] = useState({});

    useEffect(() => {
        const generateRandomEventId = async () => {
            const length = 6;
            const characters = "0123456789";
            const charactersLength = characters.length;

            let eventId;
            let exists;

            do {
                eventId = "";
                for (let i = 0; i < length; i++) {
                    eventId += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                exists = await ValidateEventId(eventId);
            } while (exists);

            setEvent((prevEvent) => ({ ...prevEvent, eventId }));
        };

        generateRandomEventId();
    }, []);

    const handleCreate = () => {
        CreateEventNew(event);
    };

    return (
        <div className="w-full min-w-[100vh] min-h-[100vh] bg-gray-100 md:pl-32 px-8 pt-10 md:pt-16 pb-10">
            <h1 className="text-[18px] sm:text-[28px] font-bold tracking-normal leading-5 text-black ml-0 mb-3 lg:mb-0 mt-0 text-[1.5rem]">
                Crear nuevo evento
            </h1>
            <div className="mt-10 grid grid-cols-6 gap-x-8 gap-y-1 w-5/12">
                <div className="col-span-4">
                    <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">Nombre de evento</label>
                    <input className="w-full border font-normal border-[#AAB4C1] rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black" value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })}></input>
                </div>
                <div className="col-span-2">
                    <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600">ID del evento</label>
                    <input className="w-full border font-normal border-[#AAB4C1] rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black" value={event.eventId}></input>
                </div>
                <div className="col-span-6">
                    <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600">Descripción</label>
                    <textarea className="h-20 w-full border border-[#8B9592] rounded-[10px] px-4 text-[16px] text-[#899592] focus:text-black py-2" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })}></textarea>
                </div>
                <div className="col-span-3">
                    <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">Tipo de evento</label>
                    <select
                        id="eventType"
                        className="w-full border font-normal border-[#AAB4C1] rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black   "
                        value={event.eventType} onChange={(e) => setEvent({ ...event, eventType: e.target.value })}
                    >
                        <option value="">Seleccionar</option>
                        <option value="Concierto">Concierto</option>
                        <option value="Charla">Charla</option>
                        <option value="Feria">Feria</option>
                        <option value="Deportivo">Deportivo</option>
                        <option value="Capacitación">Capacitación</option>
                        <option value="Evento privado">Evento privado</option>
                    </select>
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-3">
                    <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">Fecha de inicio</label>
                    <input
                        value={event.startDate} onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
                        type="date"
                        id="startDate"
                        className="w-full border font-normal border-[#AAB4C1] rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black   "
                    // value={startDate}
                    // onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-span-3">
                    <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">Fecha de finalización</label>
                    <input
                        value={event.finishDate} onChange={(e) => setEvent({ ...event, finishDate: e.target.value })}
                        type="date"
                        id="startDate"
                        className="w-full border font-normal border-[#AAB4C1] rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black   "
                    // value={startDate}
                    // onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={() => handleCreate()} className="bg-[#426CB4] text-gray-100 px-5 py-3 rounded-xl mt-4 hover:bg-[#204585]">Crear</button>
        </div>
    )
}

export default CreateEvent;