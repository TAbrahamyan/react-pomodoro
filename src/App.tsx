import React from 'react';

import { Timer } from './components/Timer';

import './scss/components/_app.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Timer />
    </div>
  );
}
