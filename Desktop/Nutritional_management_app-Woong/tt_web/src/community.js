// Community.js
import React from 'react';
import './App.css';
import Board from './community/Board';

function Community() {
  return (
    <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <h1 style={{ textAlign: 'center' }}>게시판</h1>
      <Board />
    </div>
  );
}

export default Community;
