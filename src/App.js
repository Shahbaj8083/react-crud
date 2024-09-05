import React from 'react';
import './App.css';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import { Home } from './home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContactUs } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { Project } from './pages/Project';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element= {<ContactUs/>} />
        <Route path="/projects" element= {<Project/>} />
        <Route path="/login" element= {<Login />} />
        <Route path="/*" element= {<NotFound/>} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;