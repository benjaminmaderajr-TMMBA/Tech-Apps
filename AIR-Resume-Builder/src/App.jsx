import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import PublicResume from './pages/PublicResume';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<Editor />} />
          <Route path="/edit/:id" element={<Editor />} />
          <Route path="/resume/:publicLinkId" element={<PublicResume />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <FileText size={28} />
            <span>AIR Resume Builder</span>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">
              My Resumes
            </Link>
            <Link to="/create" className="btn btn-primary btn-small">
              Create New
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default App;
