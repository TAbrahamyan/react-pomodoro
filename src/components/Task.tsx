import React from 'react';

import { Button, Input, StyledText } from '../styles';
import '../scss/components/_task.scss';

interface IProps {
  selectedTime: string[],
  taskOutput: string[],
  setTaskOutput: Function,
  setWriteableTask: Function,
  setInitialTime: Function,
}

export const Task: React.FC<IProps> = ({
  selectedTime,
  taskOutput,
  setTaskOutput,
  setWriteableTask,
  setInitialTime,
}) => {
  const [ taskInput, setTaskInput ] = React.useState<string>('');
  const [ taskWrited, setTaskWrite ] = React.useState<boolean>(false);
  const [ inputDisabled, setInputDisabled ] = React.useState<boolean>(false);

  const addTaskHandler: Function = (): void => {
    if (!taskInput.trim()) {
      return;
    }

    setTaskOutput([ ...taskOutput, taskInput ]);
    setTaskInput('');
    setTaskWrite(true);
    setInputDisabled(true);
  }

  const selectedTimeHandler: Function = ({ target: { textContent: t } }: any): void => {
    setInitialTime(t);
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
        <div>
          <StyledText style={{ marginTop: '2rem' }}>
            Choose how many minutes you want to focus
          </StyledText>

          <div className="select-time">
            {
              selectedTime?.map((time: string, i: number) =>
                <StyledText key={i} large="true" onClick={selectedTimeHandler}>{ time ?? '' }</StyledText>)
            }
          </div>
        </div>
      }
    </div>
  );
}
