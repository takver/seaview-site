import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Arrange from './gallery/arrange';

const Admin: React.FC = () => {
  return (
    <Routes>
      <Route path="gallery/arrange" element={<Arrange />} />
    </Routes>
  );
};

export default Admin; 