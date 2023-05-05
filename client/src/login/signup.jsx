import React from "react";
import { useCreateUserMutation } from "../main/apiSlice";
import { GoogleLogin } from "./google";

export function SignUp() {
    let [username, changeUsername] = React.useState("");
    let [password, changePassword] = React.useState("");

    const [createUser] = useCreateUserMutation();

    function createU() {
        let u = {username: username, password: password, role: 'user'};
        createUser(u).unwrap()
            .then((payload) => console.log('Ok', payload))
    }

    return <div>
            <div>
                <input id='txt-username' value={username} onChange={ev => changeUsername(ev.target.value)} placeholder='Username' />
                <input id='txt-password' value={password} onChange={ev => changePassword(ev.target.value)} type=' password' placeholder='Password' />
            </div>
            <div>
            </div>
            <div>
                <input type='button' className="button muted-button" value='Luo käyttäjä' onClick={() => createU()} />
                <GoogleLogin />
            </div>
    </div>
}