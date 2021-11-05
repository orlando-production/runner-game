import React from 'react';
import './App.css';
import orlandoImg from '../assets/orlando.jpg';

export function App() {
  return (
    <div>
      <h1>I ❤️ Orlando!</h1>
      <img src={orlandoImg} alt="Orlando" />
    </div>
  );
}
