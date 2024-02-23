import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Dashboard from './page/Dashboard';
import Campaign from './page/Campaign';
import Audience from './page/Audience';
import Flows from './page/Flows';
import Content from './page/Content';
import Settings from './page/Settings';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/audience");
  }, []);

  return (
    <div className='app-container'>
        <Sidebar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/campaign' element={<Campaign />} />
          <Route path='/audience' element={<Audience />} />
          <Route path='/flows' element={<Flows />} />
          <Route path='/content' element={<Content />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
    </div>
    
  );
}

export default App;
