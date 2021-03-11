import React from 'react';

import Activity from './components/Activity';
import FooterBar from './components/FooterBar';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <div className="top-bar">
        <span className="top-title">Tech Challenge</span>
      </div>
      <Activity />
      <FooterBar />
    </div>
  );
};

export default App;
