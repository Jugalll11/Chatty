import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import Test from './Pages/test';
import SetAvatar from './Pages/setAvatar'
import './App.css'

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/login' element={<Login />} />
      <Route path='/avatar' element={<SetAvatar />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  </BrowserRouter>)
}

export default App;