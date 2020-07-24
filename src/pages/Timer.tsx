import React from 'react';

import { PomodoroTimer } from '../components/PomodoroTimer';
import { Task } from '../components/Task';

const chooseTime = [ '5', '10', '15', '20', '25' ];
const chooseBreak = [ '5', '10', '30' ];

export const Timer: React.FC = () => {
  const [ taskOutput, setTaskOutput ] = React.useState<string[]>([]);
  const [ writeableTask, setWriteableTask ] = React.useState<boolean>(false);
  const [ initialTime, setInitialTime ] = React.useState<string>('');
  const [ userBreak, setUserBreak ] = React.useState<string>('');

  return (
    <>
      { writeableTask
        ? (<PomodoroTimer
            taskOutput={taskOutput}
            initialTime={initialTime}
            userBreak={userBreak}
            setWriteableTask={setWriteableTask}
          />)
        : (<Task
            chooseTime={chooseTime}
            chooseBreak={chooseBreak}
            taskOutput={taskOutput}
            setTaskOutput={setTaskOutput}
            setWriteableTask={setWriteableTask}
            setInitialTime={setInitialTime}
            setUserBreak={setUserBreak}
          />)
      }
    </>
  );
}
