import React from 'react';

import { PomodoroTimer } from '../components/PomodoroTimer';
import { Task } from '../components/Task';

const selectedTime = [ '5', '10', '15', '20', '25' ];

export const Timer: React.FC = () => {
  const [ taskOutput, setTaskOutput ] = React.useState<string[]>([]);
  const [ writeableTask, setWriteableTask ] = React.useState<boolean>(false);
  const [ initialTime, setInitialTime ] = React.useState<string>('');

  return (
    <>
      { writeableTask
        ? <PomodoroTimer
            taskOutput={taskOutput}
            initialTime={initialTime}
          />
        : <Task
            selectedTime={selectedTime}
            taskOutput={taskOutput}
            setTaskOutput={setTaskOutput}
            setWriteableTask={setWriteableTask}
            setInitialTime={setInitialTime}
          />
      }
    </>
  );
}
