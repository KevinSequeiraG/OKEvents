import { CreateEventNew, ValidateEventId } from "@/DAO/event";
import ImageUplaod from "@/UI-Components/layout/imageUpload";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    eventId: "",
    imageUrl: "",
    description: "",
    eventType: "",
    startDate: "",
  });
  const router = useRouter();
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
          eventId += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }

        exists = await ValidateEventId(eventId);
      } while (exists);

      setEvent((prevEvent) => ({ ...prevEvent, eventId }));
    };

    generateRandomEventId();
  }, []);

  const handleCreate = () => {
    if (formValidation()) {
      CreateEventNew(event);
      router.push("/home");
    }
  };

  const [errors, setErrors] = useState({});

  const formValidation = () => {
    const validationErrors = {};
    setErrors({});
    if (event.name.trim() === "") {
      validationErrors.name = "El nombre es requerido";
    }
    if (event.description.trim() === "") {
      validationErrors.description = "La descripción es requerida";
    }
    if (
      event.eventType.trim() === "" ||
      event.eventType.trim() === "Seleccionar"
    ) {
      validationErrors.eventType = "El tipo de evento es requerido";
    }
    if (!event.startDate) {
      validationErrors.startDate = "La fecha es requerida";
    }
    // Si hay errores retorna false, sino retorna true
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  return (
    <div className="w-full min-h-[100vh] bg-gray-100 md:pl-32 px-8 pt-10 md:pt-16 pb-10">
      <h1 className="text-[18px] sm:text-[28px] font-bold tracking-normal leading-5 text-black ml-0 mb-3 lg:mb-0 mt-0">
        Crear nuevo evento
      </h1>
      <div className="mt-10 grid grid-cols-6 gap-x-8 gap-y-1 w-12/12 lg:w-5/12">
        <div className="col-span-4 relative">
          <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">
            Nombre de evento
          </label>
          <input
            className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
              errors.name ? "border-red-500" : "border-[#AAB4C1]"
            }`}
            name="name"
            value={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
          ></input>
          {errors.name && (
            <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
              {errors.name}
            </p>
          )}
        </div>
        <div className="col-span-2">
          <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600">
            ID del evento
          </label>
          <input
            className="w-full border font-normal border-[#AAB4C1] rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black cursor-not-allowed"
            value={event.eventId}
            disabled
          ></input>
        </div>
        <div className="col-span-6 sm:col-span-4">
          <label
            className={
              "inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px]"
            }
          >
            Imagen de portada
          </label>
          <ImageUplaod
            containerClassName={
              "flex justify-center items-center w-full h-24 bg-[#F3F4F5] rounded-[10px] hover:bg-gray-200 border-[#8B9592]"
            }
            setEvent={setEvent}
            event={event}
            imageUrl={event.imageUrl}
          />
        </div>
        <div className="col-span-6 relative">
          <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600">
            Descripción
          </label>
          <textarea
            className={`h-20 w-full border rounded-[10px] px-4 text-[16px] text-[#899592] focus:text-black py-2 ${
              errors.description ? "border-red-500" : "border-[#AAB4C1]"
            }`}
            name="description"
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <p className="absolute text-[10px] -bottom-3 text-red-500 font-medium w-full text-end">
              {errors.description}
            </p>
          )}
        </div>
        <div className="col-span-3 relative">
          <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">
            Tipo de evento
          </label>
          <select
            name="eventType"
            id="eventType"
            className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
              errors.eventType ? "border-red-500" : "border-[#AAB4C1]"
            }`}
            value={event.eventType}
            onChange={(e) => setEvent({ ...event, eventType: e.target.value })}
          >
            <option value="">Seleccionar</option>
            <option value="Concierto">Concierto</option>
            <option value="Charla">Charla</option>
            <option value="Feria">Feria</option>
            <option value="Deportivo">Deportivo</option>
            <option value="Capacitación">Capacitación</option>
            <option value="Evento privado">Evento privado</option>
          </select>
          {errors.eventType && (
            <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
              {errors.eventType}
            </p>
          )}
        </div>

        <div className="col-span-3 relative">
          <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">
            Fecha del evento
          </label>
          <input
            name="startDate"
            value={event.startDate}
            onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
            type="date"
            id="startDate"
            className={`w-full border rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black ${
              errors.startDate ? "border-red-500" : "border-[#AAB4C1]"
            }`}
            // value={startDate}
            // onChange={(e) => setStartDate(e.target.value)}
          />
          {errors.startDate && (
            <p className="absolute text-[10px] -bottom-4 text-red-500 font-medium w-full text-end">
              {errors.startDate}
            </p>
          )}
        </div>
        {/* <div className="col-span-3 mt-2">
          <label className="inline-block  !bg-transparent font-bold text-[12px] tracking-normal text-[#272E45] leading-4 mb-[7px] after:content-['*'] after:ml-0.5 after:text-red-600 ">
            Fecha de finalización
          </label>
          <input
            value={event.finishDate}
            onChange={(e) => setEvent({ ...event, finishDate: e.target.value })}
            type="date"
            id="startDate"
            className="w-full border font-normal border-[#AAB4C1] rounded-[10px] h-[47px] px-3 text-[16px] text-[#AAB4C1] focus:text-black   "
            // value={startDate}
            // onChange={(e) => setStartDate(e.target.value)}
          />
        </div> */}
      </div>
      <div className="flex justify-between w-12/12 lg:w-5/12 mt-5">
        <button
          onClick={() => router.push("/home")}
          className="bg-gray-500 text-gray-100 px-5 py-2 rounded-xl mt-4 hover:bg-gray-400"
        >
          Regresar
        </button>
        <button
          onClick={() => handleCreate()}
          className="bg-[#426CB4] text-gray-100 px-8 py-2 rounded-xl mt-4 hover:bg-[#204585]"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
