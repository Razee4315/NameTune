import React, { useState } from 'react';
import MusicGenerator from './components/MusicGenerator';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <MusicGenerator />;
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="main-content">
        {renderCurrentPage()}
      </main>

      {/* Floating doodles for decoration */}
      <div className="floating-doodle"></div>
      <div className="floating-doodle"></div>
      <div className="floating-doodle"></div>
    </div>
  );
}

export default App;
