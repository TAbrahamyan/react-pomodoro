import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { Button, Input, StyledText } from '../styles';
import { Context, defaultContext } from '../Context';

import { Rate, Modal } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import '../scss/components/_pomodoro_task.scss';

const chooseTime: string[] = [ '5', '10', '15', '20', '25' ];
const chooseBreak: string[] = [ '5', '10', '30' ];

export const PomodoroTask: React.FC = () => {
  const { pomodoro, setPomodoro } = React.useContext(Context);
  const history = useHistory();
  const [ taskInput, setTaskInput ] = React.useState<string>('');
  const [ customTime, setCustomTime ] = React.useState<string>('');
  const [ inputDisabled, setInputDisabled ] = React.useState<boolean>(false);
  const [ visibleModal, setVisibleModal ] = React.useState<boolean>(false);
  const [ showChoosing, setShowChoosing ] = React.useState<boolean>(false);

  React.useEffect((): void => {
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
    history.push('/timer');
  };

  const cancelTaskHandler: any = (): void => {
    setVisibleModal(false);
    setPomodoro(defaultContext);
    localStorage.removeItem('pomodoro');
  }

  const goHandler: Function = (): void => {
    localStorage.setItem('pomodoro', JSON.stringify(pomodoro));
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

      { !showChoosing
        ? (<>
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
              Your task: <strong>{ pomodoro.taskOutput }</strong>
            </StyledText>

            <StyledText>
              Pomodoro count: <strong>{ pomodoro.pomodoroCount }</strong>
            </StyledText>

            <StyledText>
              Your time: <strong>{ pomodoro.initialTime }</strong>
            </StyledText>

            <StyledText>
              Your time: <strong>{ pomodoro.userBreak }</strong>
            </StyledText>

            <NavLink to={'/timer'}>
              <Button onClick={goHandler}>
                Go!
              </Button>
            </NavLink>
          </div>)
      }
    </div>
  );
}
