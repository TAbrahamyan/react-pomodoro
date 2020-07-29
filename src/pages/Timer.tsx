import React from 'react';

import { IPomodroContext } from '../interfaces';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { PomodoroTask } from '../components/PomodoroTask';
import { PomodoroContext, defaultContext } from '../context/PomodoroContext';

export const Timer: React.FC = () => {
  const [ writeableTask, setWriteableTask ] = React.useState<boolean>(false);
  const [ pomodoro, setPomodoro ] = React.useState<IPomodroContext>(defaultContext);

  return (
    <PomodoroContext.Provider value={{ pomodoro, setPomodoro }}>
      { writeableTask
        ? <PomodoroTimer setWriteableTask={setWriteableTask} />
        : <PomodoroTask setWriteableTask={setWriteableTask} />
      }
    </PomodoroContext.Provider>
  );
}
