import React from 'react';

import { IContext } from '../interfaces';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { PomodoroTask } from '../components/PomodoroTask';
import { Context, defaultContext } from '../Context';

export const Timer: React.FC = () => {
  const [ writeableTask, setWriteableTask ] = React.useState<boolean>(false);
  const [ pomodoro, setPomodoro ] = React.useState<IContext>(defaultContext);

  return (
    <Context.Provider value={{ pomodoro, setPomodoro }}>
      { writeableTask
        ? <PomodoroTimer setWriteableTask={setWriteableTask} />
        : <PomodoroTask setWriteableTask={setWriteableTask} />
      }
    </Context.Provider>
  );
}
