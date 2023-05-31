import EventCard from "@/UI-Components/event/eventCard";

const Home = () => {
    return (
        <div className="w-full min-w-[100vh] min-h-[100vh] bg-gray-100 md:pl-24 px-8 pt-10 md:pt-16 pb-10">
            <h1 className="text-[18px] sm:text-[28px] font-bold tracking-normal leading-5 text-black ml-0 mb-3 lg:mb-0 mt-0 text-[1.5rem]">
                Eventos
            </h1>
            <button className="bg-[#426CB4] text-gray-100 px-5 py-3 rounded-xl mt-4">Crear evento nuevo</button>

            <div class="grid md:grid-cols-4 gap-2 mt-5 md:mt-10">
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </div>

        </div>
    )
}

export default Home;