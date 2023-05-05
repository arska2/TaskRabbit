import React, { useContext } from 'react';
import { useGetUserQuery, useLoginUserMutation, useLogoutUserMutation } from '../main/apiSlice';
import { GoogleLogin } from './google';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../main/store';

export function Login(props) {
    let user = useSelector(state => state.userReducer.user) || {};
    let [username, changeUsername] = React.useState("");
    let [password, changePassword] = React.useState("");
    const dispatch = useDispatch();


    console.log(user);

    const { data: u, isLoading } = useGetUserQuery();
    const [loginUser] = useLoginUserMutation();
    const [logoutUser] = useLogoutUserMutation();

    if (isLoading) return <div>Loading...</div>

    function logout() {
        logoutUser();
        dispatch(setUser({}));
    }

    function login() {
        let u = { username: username, password: password };
        loginUser(u).unwrap()
            .then((payload) => console.log('Ok', dispatch(setUser(payload))))
            .catch((err) => alert('Bad credentials', err))


    }

    return <div>
        {user.id == null &&
            <div>
                <input id='txt-username' value={user.username} onChange={ev => changeUsername(ev.target.value)} placeholder='Username' />
                <input id='txt-password' value={user.password} onChange={ev => changePassword(ev.target.value)} type='password' placeholder='Password' />
            </div>
        }

        {user.role &&
            <div>
                <p>{user.username}</p>
                <button className="button1 muted-button" onClick={() => logout()}>Kirjaudu ulos</button>
            </div>
        } {user.id == null &&
            <div>
                <input id='btn-login' className="button muted-button" type='button' value='Kirjaudu sisään' onClick={() => login()} />
                <GoogleLogin />
            </div>
        }
    </div>
}