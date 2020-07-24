import React from 'react';

import { Timer } from './pages/Timer';

import './scss/_app.scss';

export const App: React.FC = () => {
  return (
    <div className="pomodoro">
      <Timer />
    </div>
  );
}
