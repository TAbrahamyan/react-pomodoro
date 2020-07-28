import React from 'react';

export const defaultContext: any = {
  pomodoroCount: 0,
  initialTime: '',
  userBreak: '',
  taskOutput: '',
};

export const PomodoroContext = React.createContext(defaultContext);
