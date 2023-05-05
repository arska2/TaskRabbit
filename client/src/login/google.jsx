import React from 'react';
import jwt_decode from "jwt-decode";
import { useState } from 'react';
import {  useCreateUserMutation, useLoginUserMutation } from '../main/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../main/store';

export function GoogleLogin() {
  const [create] = useCreateUserMutation();
  const [login] = useLoginUserMutation();
  let user = useSelector(state => state.userReducer.user) || {};

  const dispatch = useDispatch();

  console.log(user);

  function signOut() {
    dispatch(setUser({}))
    document.getElementById("signInDiv").hidden = false;
  }

  function createUser(user, token) {
    let u = {username: user, password: token, role: 'user'};
    create(u).unwrap()
      .then((payload) => console.log('Ok', console.log(payload)))
  }

  function logIn(user, token) {
    let u = {username: user, password: token};
    console.log(u);
    login(u).unwrap()
            .then((payload) => console.log('Ok', dispatch(setUser(payload))))
            .catch((err) => createUser(user, token));
        //dispatch(setUser(user));
  }

  //Saa kirjautuessaan käyttäjän tiedot, VAIN TESTIYMPÄRISTÖSSÄ LISÄTYT EMAILIT TOIMII
  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    let user = userObject.name;
    let token = userObject.sub;
    logIn(user, token);
    document.getElementById("signInDiv").hidden = true;
  }

  React.useEffect(() => {
    /* global google */
    
    google.accounts.id.initialize({
      client_id: "1051092928864-nkgf2cp4biii83l9qmc4ubq351d4e62j.apps.googleusercontent.com",
      callback: handleCallBackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

    return (
      <div>
        <div id="signInDiv"></div>
        {user.id &&
          <button onClick={() => signOut()} >Kirjaudu ulos</button>
        }
        {user.id &&
        <div>
          <h3>{user.username}</h3>
        </div>
        }
      </div>
    )
}

