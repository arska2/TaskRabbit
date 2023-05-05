import 'bootstrap/dist/css/bootstrap.min.css';
import { setSocket, store } from './main/store';
import { Provider, useDispatch } from "react-redux";
import Navbar, { Header } from './main/content'
import { TaskContainer } from './features/tasks/taskContainer';
import { Profile } from './features/profiles/ProfilePage';
import { Main } from './main/content';
import { GoogleLogin } from './login/google';
import { Login } from './login/login';
import React from 'react';
import { addNotification } from './main/store';
import WebSocketContext from './websocket/socket';
import './App.css';
import './features/profiles/ProfileStyles.css'


function App() {


  const ws = new WebSocket('ws://localhost:8080/my/uri');

  return (
    //Avaa websocketin koko sovelluksen auetessa
    <WebSocketContext.Provider value={ws}>
      <div className="App">
        <Navbar />
        <Main />
      </div>
    </WebSocketContext.Provider>

  );
}

export default App;


