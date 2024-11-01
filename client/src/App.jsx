import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ToDoList from './pages/ToDo/ToDoList'
import '../node_modules/antd/dist/reset.css'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todolist" element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;