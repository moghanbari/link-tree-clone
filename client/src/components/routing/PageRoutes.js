import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPage from '../pages/UserPage';
import NotFound from '../pages/NotFound';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';

const PageRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/user/:user" element={<UserPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PageRoutes;
