import React from 'react';
import { IPomodroContext } from '../interfaces';

export const defaultContext: IPomodroContext = {
  pomodoroCount: 0,
  initialTime: '',
  userBreak: '',
  taskOutput: '',
};

export const PomodoroContext = React.createContext<any>(defaultContext);
