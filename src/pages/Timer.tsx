import React from 'react';

import { PomodoroTimer } from '../components/PomodoroTimer';

export const Timer: React.FC = () => {
  return (
    <div className="pomodoro">
      <PomodoroTimer />
    </div>
  );
}
