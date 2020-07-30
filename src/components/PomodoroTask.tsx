import React from 'react';

import { Button, Input, StyledText } from '../styles';
import { Context } from '../Context';

import { Rate, Modal } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import '../scss/components/_pomodoro_task.scss';

type Props = { setWriteableTask: Function };

const chooseTime: string[] = [ '5', '10', '15', '20', '25' ];
const chooseBreak: string[] = [ '5', '10', '30' ];

export const PomodoroTask: React.FC<Props> = ({ setWriteableTask }) => {
  const { pomodoro, setPomodoro } = React.useContext(Context);
  const [ taskInput, setTaskInput ] = React.useState<string>('');
  const [ customTime, setCustomTime ] = React.useState<string>('');
  const [ inputDisabled, setInputDisabled ] = React.useState<boolean>(false);
  const [ visibleModal, setVisibleModal ] = React.useState<boolean>(false);
  const [ showChoosing, setShowChoosing ] = React.useState<boolean>(false);

  React.useEffect(() => {
    const savedPomodoro = localStorage.getItem('pomodoro') as string;

    if (JSON.parse(savedPomodoro)) {
      setVisibleModal(true);
    }
  }, []);

  const addTaskHandler: Function = (): void => {
    const input: string = taskInput.trim();

    if (!input) return;

    setPomodoro({ ...pomodoro, taskOutput: input });
    setInputDisabled(true);
  }

  const choosePomodoroCountHandler: any = (value: number): void => {
    setPomodoro({ ...pomodoro, pomodoroCount: value });
  }

  const chooseTimeHandler: Function = ({ target: { textContent: t } }: any): void => {
    setPomodoro({ ...pomodoro, initialTime: t });
    setCustomTime('');
  }

  const chooseBreakHandlder: Function = ({ target: { textContent: t } }: any): void => {
    setPomodoro({ ...pomodoro, userBreak: t });
    setShowChoosing(true);
  }

  const customTimeHandler: Function = ({ target: { value: v } }: any): void => {
    const searchNumbers = /\D/g;

    if (v.match(searchNumbers) || v.length > 2 || +v > 25 || v.startsWith('0')) {
      return;
    }

    const replacedText = v.replace(searchNumbers, '');
    setCustomTime(replacedText);
    setPomodoro({ ...pomodoro, initialTime: replacedText });
  }

  const continueTaskHandler: any = (): void => {
    const savedPomodoro = localStorage.getItem('pomodoro') as string;
    setPomodoro(JSON.parse(savedPomodoro));
    setWriteableTask(true);
  };

  const cancelTaskHandler: any = (): void => {
    setVisibleModal(false);
    localStorage.removeItem('pomodoro');
  }

  const goHandler: Function = (): void => {
    localStorage.setItem('pomodoro', JSON.stringify(pomodoro));
    setWriteableTask(true);
  }

  const modalTextColor = { color: 'black' };

  return (
    <div className="pomodoro__task">
      <Modal
        visible={visibleModal}
        maskClosable={false}
        closable={false}
        onOk={continueTaskHandler}
        onCancel={cancelTaskHandler}
      >
        <StyledText style={modalTextColor}>You have a uncompleted task.</StyledText>
        <StyledText style={modalTextColor}>Do you want to continue?</StyledText>
      </Modal>

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

      { !showChoosing
        ? (<>
          { pomodoro.taskOutput.length > 0 &&
            <>
              <div className="pomodoro-count">
                <StyledText>
                  Choose pomodoro count
                </StyledText>

                <div className="choose-pomodoro-count">
                  <Rate
                    character={<FieldTimeOutlined />}
                    style={{ fontSize: 36 }}
                    value={pomodoro.pomodoroCount}
                    onChange={choosePomodoroCountHandler}
                  />
                </div>
              </div>

              { pomodoro.pomodoroCount !== 0 &&
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

              { pomodoro.initialTime.length > 0 &&
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
        </>)
        : (<div>
            <StyledText>
              Pomodoro count: { pomodoro.pomodoroCount }
            </StyledText>

            <StyledText>
              Your time: { pomodoro.initialTime }
            </StyledText>

            <StyledText>
              Your time: { pomodoro.userBreak }
            </StyledText>

            <Button onClick={goHandler}>
              Go!
            </Button>
          </div>)
      }
    </div>
  );
}
