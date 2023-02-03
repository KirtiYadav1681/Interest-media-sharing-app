import React from 'react';
import logo from '../assets/Logo.png';
import  jwt_decode  from 'jwt-decode';
import startVideo from '../assets/share.mp4';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    const userProfile = jwt_decode(credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(userProfile));

    const {given_name, sub, picture} = userProfile;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: given_name,
      image: picture
    };
    client.createIfNotExists(doc)
    .then(()=> {
      navigate('/', {replace: true});
    })
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video 
          src={startVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(credentialResponse) => {responseGoogle(credentialResponse)}}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login