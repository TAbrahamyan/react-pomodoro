import React from 'react';
import { IContext } from './interfaces';

export const defaultContext: IContext = {
  pomodoroCount: 0,
  initialTime: '',
  userBreak: '',
  taskOutput: '',
};

export const Context = React.createContext<any>(defaultContext);
