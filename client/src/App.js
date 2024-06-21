import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './Navbar';
import Complaint from './Complaint';
import View from './View';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import { useState } from 'react';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="App"> 
      <Router>
      <Navbar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/view" element={<View searchQuery={searchQuery} />} />
        <Route path="/raise" element={<Complaint />} />
        <Route path="/user" element={<Profile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
