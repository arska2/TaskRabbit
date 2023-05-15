import React from 'react';
import './content.css';
import { ProfilePage } from '../features/profiles/ProfilePage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TaskPage } from '../features/tasks/TaskPage';
import { TaskContainer } from '../features/tasks/taskContainer';
import { StyledEngineProvider } from '@mui/material/styles';
import { EditProfile } from '../features/profiles/EditProfile';
import { Login } from '../login/login';
import { MyTasks } from '../features/tasks/MyTasks';
import { useSelector } from 'react-redux';
import { WebSocketClient } from '../websocket/socketPage';
import ImageUploader from '../features/images/ImageUploader';
import { SignUp } from '../login/signup';
import { AdminView } from './adminView';
import { useGetImageInfoQuery } from './apiSlice';
import { CircleImage } from '../features/images/CircleImage';
import { ProfileList } from '../features/profiles/ProfileList';



export function Navbar() {
  const location = useLocation()
  console.log('location', location)
  const user = useSelector(state => state.userReducer.user) || {};
  const { data: imageInfo } = useGetImageInfoQuery(user.id)
  let msgs = useSelector((state) => state.userReducer.notifications) || [];
  return <nav className="navbar">
    <div>
      <img src='TaskRabbitLogo.png' height={"50px"} />
    </div>
    <div className="navbar__left">
      <Link to="/">
        <img src='TaskRabbitSlogan.png' height={"60px"} />
      </Link>

      {/* <Link to="/" className='navbar__button'><a href="/" className="navbar__title">TaskRabbit</a></Link> */}
    </div>
    <div className="navbar__right">
      <Link to="/" className="navbar__button" style={{ backgroundColor: location.pathname === "/" ? "#4FFBDF" : "" }}>Home</Link>

      {user.id === 1 && <div className="navbar__right">
        <Link to="/admin" className='navbar__button'>Admin View</Link>
      </div>}
      {user.id && <div className='navbar__right'>
        <Link id='nav-btn-myTasks' to="/mytasks" className='navbar__button' style={{ backgroundColor: location.pathname === "/mytasks" ? "#4FFBDF" : "" }}>My Tasks</Link>
        <Link id='nav-btn-profile' to={"/profile"} className='navbar__button' style={{ backgroundColor: location.pathname === "/profile" ? "#4FFBDF" : "" }}>Profile</Link>
        <Link id='nav-btn-users' to={"/profiles"} className='navbar__button' style={{ backgroundColor: location.pathname === "/profiles" ? "#4FFBDF" : "" }}>Users</Link>
      </div>
      }
      {!user.id &&
        <div className='navbar__right'>
          <Link id='nav-btn-login' to="/login" className='navbar__button'>Log in</Link>
          <Link id='nav-btn-signup' to="/signup" className='navbar__button'>Sign up</Link>
        </div>
      }
      {user.id &&
        <Link id='nav-btn-logout' to="/login" className='navbar__button'>Log Out</Link>
      }
      {/* {user.id &&
        <Link to="/ws" className='navbar__button'>Notifications ({msgs.length})</Link>
      } */}
      {user.id && imageInfo?.profileImageUrl &&
        <CircleImage size={50} imageSrc={imageInfo.profileImageUrl} />
      }
    </div>
  </nav>
}

export function Main() {
  //Lisää tähän notifications koko, joka annetaan numerona perään, jotta tilan vaikutukset näkee heti

  return <main>
    <Routes>
      <Route path="/mytasks" element={<MyTasks />} />
      <Route path="/" element={<TaskPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profiles" element={<ProfileList />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/ws' element={<WebSocketClient />} />
      <Route path='/iu' element={<ImageUploader />} />
      <Route path='/admin' element={<AdminView />} />
    </Routes>
  </main>
}

export default Navbar;