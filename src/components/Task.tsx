import React from 'react';

import { ITask } from '../interfaces';
import { Button, Input, StyledText } from '../styles';

import '../scss/components/_task.scss';

export const Task: React.FC<ITask> = ({
  chooseTime,
  chooseBreak,
  taskOutput,
  setTaskOutput,
  setWriteableTask,
  setInitialTime,
  setUserBreak,
}) => {
  const [ taskInput, setTaskInput ] = React.useState<string>('');
  const [ taskWrited, setTaskWrited ] = React.useState<boolean>(false);
  const [ inputDisabled, setInputDisabled ] = React.useState<boolean>(false);
  const [ chooseInitialTime, setChooseInitialTime ] = React.useState<boolean>(false);

  const addTaskHandler: Function = (): void => {
    if (!taskInput.trim()) {
      return;
    }

    setTaskOutput([ ...taskOutput, taskInput ]);
    setTaskInput('');
    setTaskWrited(true);
    setInputDisabled(true);
  }

  const chooseTimeHandler: Function = ({ target: { textContent: t } }: any): void => {
    setInitialTime(t);
    setChooseInitialTime(true);
  }

  const chooseBreakHandlder: Function = ({ target: { textContent: t } }: any): void => {
    setUserBreak(t);
    setWriteableTask(true);
  }

  return (
    <div className="pomodoro__task">
      <StyledText large="true">
        Write a task you want to focus on
      </StyledText>

      <div>
        <Input
          value={taskInput}
          onChange={({ target: { value: v } }: any) => setTaskInput(v)}
          onPressEnter={addTaskHandler}
          disabled={inputDisabled}
        />

        <Button onClick={addTaskHandler}>
          Add
        </Button>
      </div>

      { taskWrited &&
        <div className='task-content'>
          <StyledText>
            Choose how many minutes you want to focus
          </StyledText>

          <div className="choose-time">
            {
              chooseTime?.map((time: string, i: number) =>
                <StyledText key={i} large="true" onClick={chooseTimeHandler}>{ time ?? '' }</StyledText>)
            }
          </div>

          { chooseInitialTime &&
            <div className="break-content">
              <StyledText>
                Choose break
              </StyledText>

              <div className="choose-break">
                {
                  chooseBreak?.map((userBreak: string, i: number) =>
                    <StyledText key={i} onClick={chooseBreakHandlder}>{ userBreak }</StyledText>)
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
}
