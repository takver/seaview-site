import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Arrange from './gallery/arrange';

const Admin = () => {
  return (
    <Routes>
      <Route path="gallery/arrange" element={<Arrange />} />
    </Routes>
  );
};

export default Admin; 