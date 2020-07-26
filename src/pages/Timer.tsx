import React from 'react';

import { PomodoroTimer } from '../components/PomodoroTimer';
import { PomodoroTask } from '../components/PomodoroTask';

// let chooseTime: any = [ '5', '10', '15', '20', '25' ];
const chooseBreak: any[] = [ '5', '10', '30' ];

export const Timer: React.FC = () => {
  const [ chooseTime, setChooseTime ] = React.useState<any[]>([ '5', '10', '15', '20', '25' ]);
  const [ taskOutput, setTaskOutput ] = React.useState<any>([]);
  const [ pomodoroCount, setPomodoroCount ] = React.useState<number>(0);
  const [ writeableTask, setWriteableTask ] = React.useState<boolean>(false);
  const [ initialTime, setInitialTime ] = React.useState<string>('');
  const [ userBreak, setUserBreak ] = React.useState<string>('');

  return (
    <>
      { writeableTask
        ? (<PomodoroTimer
            taskOutput={taskOutput}
            setTaskOutput={setTaskOutput}
            initialTime={initialTime}
            userBreak={userBreak}
            setWriteableTask={setWriteableTask}
            pomodoroCount={pomodoroCount}
            setPomodoroCount={setPomodoroCount}
          />)
        : (<PomodoroTask
            pomodoroCount={pomodoroCount}
            setPomodoroCount={setPomodoroCount}
            chooseTime={chooseTime}
            setChooseTime={setChooseTime}
            chooseBreak={chooseBreak}
            taskOutput={taskOutput}
            setTaskOutput={setTaskOutput}
            setWriteableTask={setWriteableTask}
            setInitialTime={setInitialTime}
            setUserBreak={setUserBreak}
            initialTime={initialTime}
          />)
      }
    </>
  );
}
