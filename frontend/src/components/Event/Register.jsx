import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Register = () => {
    const {event_id} = useParams()
    const navigate = useNavigate();

    const register_for_event = async () => {
        const res = await fetch("https://meetupv1-flask.onrender.com/book", {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({'event_id': event_id})
        })
        if (res.status === 200) {
            console.log('successful');
            navigate('/events')
        }
    }

    useEffect(()=> {
        register_for_event();
    })

    return <>
        Registering...
    </>
}