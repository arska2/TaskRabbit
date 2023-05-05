import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, deleteNotification } from "../main/store";
import { useContext } from "react";
import WebSocketContext from "./socket";

export function WebSocketClient(){
    let user = useSelector((state) => state.userReducer.user) || {};
    let msgs = useSelector((state) => state.userReducer.notifications) || [];
    let ws = useContext(WebSocketContext); //tätä voi käyttää missä vain WebSockettina
    let dispatch = useDispatch();
    

    React.useEffect(() => {
        console.log(msgs);
        ws.onmessage = ev => {
            console.log(ev.data);
            let data = ev.data.split(" ");
            let msg = null;
            if (data.length == 2) {
                msg = data[0] + " suoritti juuri tehtävän!";
            } else {
                console.log(data);
                msg = "Käyttäjä " + data[0] + " otti tehtävänne !";
            }
            if(user.id==data[1]) dispatch(addNotification(msg));
        }
    }, [])

    function dltNotification(id) {
        console.log(id);
        dispatch(deleteNotification(id));
    }

    let rows = msgs.map(m => <p key={m.id} >{m}
        <input type="button" value='Poista' onClick={() => dltNotification(m)}/>
    </p>) //tämä viesti ominaisuutena näkyviin

    return <div className="web-socket">
        <h2>Ilmoitukset</h2>
        {rows}
    </div>
}
