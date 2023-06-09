const CalendarIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17.303"
            height="19.225"
            viewBox="0 0 17.303 19.225"
        >
            <g
                id="Grupo_355"
                data-name="Grupo 355"
                transform="translate(0 0)"
            >
                <path
                    id="Icon_material-event"
                    data-name="Icon material-event"
                    d="M17.958,12.074H13.151V16.88h4.806ZM17,1.5V3.423H9.306V1.5H7.384V3.423H6.423A1.914,1.914,0,0,0,4.51,5.345L4.5,18.8a1.922,1.922,0,0,0,1.923,1.923H19.88A1.928,1.928,0,0,0,21.8,18.8V5.345A1.928,1.928,0,0,0,19.88,3.423h-.961V1.5ZM19.88,18.8H6.423V8.229H19.88Z"
                    transform="translate(-4.5 -1.5)"
                    fill={
                        props.router.pathname == "/eventsList"
                            ? "#35ca75"
                            : "#899592"
                    }
                />
            </g>
        </svg>
    )
}

const UserNavIcon = () => {
    return (
        <svg   
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17 17"
        >
            <g id="ico_usuario" transform="translate(7.125 -3.5)">
                <path
                    id="Trazado_150"
                    d="M16.375,13a4.25,4.25,0,1,0-4.25-4.25A4.262,4.262,0,0,0,16.375,13Zm0,2.125c-2.816,0-8.5,1.434-8.5,4.25V21.5h17V19.375C24.875,16.559,19.191,15.125,16.375,15.125Z"
                    transform="translate(-15 -1)"
                    fill={"#426CB4"}
                />
            </g>
        </svg>
    )
}

const RolesIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.006"
            height="16.629"
            viewBox="0 0 19.006 16.629"
        >
            <path
                id="Icon_awesome-users-cog"
                data-name="Icon awesome-users-cog"
                d="M26.913,13.736a4.355,4.355,0,0,0,0-1.582l.958-.553a.269.269,0,0,0,.123-.316,5.571,5.571,0,0,0-1.233-2.131.271.271,0,0,0-.334-.052l-.958.553a4.359,4.359,0,0,0-1.37-.791V7.759a.27.27,0,0,0-.212-.264,5.6,5.6,0,0,0-2.458,0,.27.27,0,0,0-.212.264V8.865a4.359,4.359,0,0,0-1.37.791L18.89,9.1a.272.272,0,0,0-.334.052,5.571,5.571,0,0,0-1.233,2.131.273.273,0,0,0,.123.316l.958.553a4.355,4.355,0,0,0,0,1.582l-.958.553a.269.269,0,0,0-.123.316,5.6,5.6,0,0,0,1.233,2.131.271.271,0,0,0,.334.052l.958-.553a4.359,4.359,0,0,0,1.37.791v1.106a.27.27,0,0,0,.212.264,5.6,5.6,0,0,0,2.458,0,.27.27,0,0,0,.212-.264V17.026a4.359,4.359,0,0,0,1.37-.791l.958.553a.272.272,0,0,0,.334-.052,5.571,5.571,0,0,0,1.233-2.131.273.273,0,0,0-.123-.316l-.958-.553Zm-4.251,1.01a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,22.662,14.746Zm-6.534-4.177c.071,0,.137-.019.208-.022a6.844,6.844,0,0,1,1.348-2.2,1.463,1.463,0,0,1,1.073-.468,1.427,1.427,0,0,1,.728.2l.293.171c.03-.019.059-.033.089-.052a4.109,4.109,0,0,0,.416-1.782,4.156,4.156,0,1,0-4.154,4.154Zm3.906,7.221c-.085-.045-.171-.1-.252-.145a1.834,1.834,0,0,1-1.021.364,1.476,1.476,0,0,1-1.073-.468,6.77,6.77,0,0,1-1.492-2.584,1.584,1.584,0,0,1,.958-1.867q-.006-.145,0-.29l-.293-.171a1.512,1.512,0,0,1-.364-.3c-.123.007-.241.022-.364.022a5.861,5.861,0,0,1-2.543-.594h-.308A4.279,4.279,0,0,0,9,16.034V17.1a1.782,1.782,0,0,0,1.782,1.782h9.482a1.429,1.429,0,0,1-.23-.754Z"
                transform="translate(-9 -2.257)"
                fill="#899592"
            />
        </svg>
    )
}

export { CalendarIcon, UserNavIcon, RolesIcon }