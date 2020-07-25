import React from 'react';

import { IPomodoroTask } from '../interfaces';
import { Button, Input, StyledText } from '../styles';

import { Rate } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import '../scss/components/_pomodoro_task.scss';

export const PomodoroTask: React.FC<IPomodoroTask> = ({
  pomodoroCount,
  setPomodoroCount,
  chooseTime,
  chooseBreak,
  taskOutput,
  setTaskOutput,
  setWriteableTask,
  setInitialTime,
  setUserBreak,
  initialTime,
}) => {
  const [ taskInput, setTaskInput ] = React.useState<string>('');
  const [ customTime, setCustomTime ] = React.useState<string>('');
  const [ taskWrited, setTaskWrited ] = React.useState<boolean>(false);
  const [ inputDisabled, setInputDisabled ] = React.useState<boolean>(false);
  const [ checkPomodoroCount, setCheckPomodoroCount ] = React.useState<boolean>(false);

  const addTaskHandler: Function = (): void => {
    if (!taskInput.trim()) {
      return;
    }

    setTaskOutput([ ...taskOutput, taskInput ]);
    setTaskInput('');
    setTaskWrited(true);
    setInputDisabled(true);
  }

  const choosePomodoroCountHandler: any = (v: any): void => {
    setPomodoroCount(v);
    setCheckPomodoroCount(true);
  }

  const chooseTimeHandler: Function = ({ target: { textContent: t } }: any): void => setInitialTime(t);

  const chooseBreakHandlder: Function = ({ target: { textContent: t } }: any): void => {
    setUserBreak(t);
    setWriteableTask(true);
  }

  const customTimeHandler: Function = ({ target: { value: v } }: any): void => {
    const searchNumbers = /\D/g;

    if (v.match(searchNumbers) || v.length > 2 || +v > 25 || v.startsWith('0')) {
      return;
    }

    const replacedText = v.replace(searchNumbers, '');

    setCustomTime(replacedText);
    setInitialTime(replacedText);
  }

  return (
    <div className="pomodoro__task">
      <StyledText large="true" bold="true">
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
        <>
          <div className="pomodoro-count">
            <StyledText>
              Choose pomodoro count
            </StyledText>

            <div className="choose-pomodoro-count">
              <Rate
                character={<FieldTimeOutlined />}
                style={{ fontSize: 36 }}
                value={pomodoroCount}
                onChange={choosePomodoroCountHandler}
              />
            </div>
          </div>

          { checkPomodoroCount &&
            <div className="task-content">
              <StyledText>
                Choose how many minutes you want to focus
              </StyledText>

              <div className="choose-time">
                {
                  chooseTime?.map((time: string, i: number) =>
                    <StyledText key={i} large="true" onClick={chooseTimeHandler}>{ time ?? '' }</StyledText>)
                }
                <Input
                  placeholder="Custom"
                  value={customTime}
                  onChange={customTimeHandler}
                />
              </div>
            </div>
          }

          { initialTime.length > 0 &&
            <div className="break-content">
              <StyledText>
                Choose minutes of break
              </StyledText>

              <div className="choose-break">
                {
                  chooseBreak?.map((userBreak: string, i: number) =>
                    <StyledText key={i} onClick={chooseBreakHandlder}>{ userBreak ?? '' }</StyledText>)
                }
              </div>
            </div>
          }
        </>
      }
    </div>
  );
}
