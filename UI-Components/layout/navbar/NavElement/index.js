import Link from "next/link";

const NavElement = (props) => {
    return (
        <>
            {props.goTo != undefined ? (
                <Link
                    onClick={props.action}
                    href={props.goTo}
                    className={`sm:mx-auto h-14 fill-[#899592] flex items-center rounded-lg cursor-pointer hover:bg-[#426CB4] hover:bg-opacity-[0.1]  hover:duration-300 hover:ease-linear hover:!fill-[#426CB4] stroke-[#899592] hover:!stroke-[#426CB4] !mt-0 lg:mr-auto px-1 w-auto navElement sm:ml-5 ${props.active ? "bg-[#426CB4] bg-opacity-[0.1] fill-[#426CB4]" : ""
                        }`}
                >
                    {props.icon}
                    <p className={`ml-3 truncate text-[.7rem]`}>{props.elementName}</p>
                </Link>
            ) : (
                <div
                    onClick={props.action}
                    className={`sm:mx-auto h-14 fill-[#899592] flex items-center rounded-lg cursor-pointer hover:bg-[#426CB4] hover:bg-opacity-[0.1]  hover:duration-300 hover:ease-linear hover:!fill-[#426CB4] stroke-[#899592] hover:!stroke-[#426CB4] !mt-0 lg:mr-auto px-1 w-auto navElement sm:ml-5 ${props.active ? "bg-[#426CB4] bg-opacity-[0.1] fill-[#426CB4]" : ""
                        }`}
                >
                    {props.icon}
                    <p className={`ml-3 truncate text-[.7rem]`}>{props.elementName}</p>
                </div>
            )}
        </>
    );
};

export default NavElement;
