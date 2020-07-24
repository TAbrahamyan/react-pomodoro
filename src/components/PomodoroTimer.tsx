import React from 'react';

import { IPomodoroTask } from '../interfaces';
import { Button, TimerText, StyledText } from '../styles';

import { Modal } from 'antd';
import '../scss/components/_pomodoro_timer.scss';

let initialTimeinterval: any;
let userBreakInterval: any;

export const PomodoroTimer: React.FC<IPomodoroTask> = ({
  taskOutput,
  initialTime,
  userBreak,
  setWriteableTask,
}) => {
  const [ secondTimer, setSecondTimer ] = React.useState<string>('00');
  const [ breakSecondTimer, setBreakSecondTimer ] = React.useState<string>('00');
  const [ countdownInitialTime, setCountdownInitialTime ] = React.useState<string>(initialTime);
  const [ countdownUserBreak, setCountdownUserBreak ] = React.useState<string>(userBreak);
  const [ disabledStartButton, setDisabledStartButton ] = React.useState<boolean>(false);
  const [ showBreakTime, setShowBreakTime ] = React.useState<boolean>(false);
  const [ visibleModal, setVisibleModal ] = React.useState<boolean>(false);

  const startTimer: Function = (): void => {
    let newInitialTime: any = countdownInitialTime;
    let newSecondTime: any = secondTimer;

    setDisabledStartButton(true);

    if (newInitialTime !== '0' && showBreakTime === false) {
      initialTimeinterval = setInterval(() => {
        if (newInitialTime !== +'0' && newSecondTime === '00') {
          newInitialTime = newInitialTime - 1;
          newSecondTime = '59';

          setCountdownInitialTime(newInitialTime);
          setSecondTimer(newSecondTime);
        } else if (newSecondTime !== '00') {
          newSecondTime = newSecondTime - 1;

          if (newSecondTime < '10') {
            newSecondTime = `0${newSecondTime}`;
          }

          setCountdownInitialTime(newInitialTime);
          setSecondTimer(newSecondTime);
        } else {
          clearInterval(initialTimeinterval);
          setShowBreakTime(true);
        }
      }, 1);
    }
  }

  React.useEffect(() => {
    let newUserBreakTime: any = countdownUserBreak;
    let newSecondBreakTime: any = breakSecondTimer;

    if (newUserBreakTime !== '0' && showBreakTime === true) {
      userBreakInterval = setInterval(() => {
        if (newUserBreakTime !== +'0' && newSecondBreakTime === '00') {
          newUserBreakTime = newUserBreakTime - 1;
          newSecondBreakTime = '59';

          setCountdownUserBreak(newUserBreakTime);
          setBreakSecondTimer(newSecondBreakTime);
        } else if (newSecondBreakTime !== '00') {
          newSecondBreakTime = newSecondBreakTime - 1;

          if (newSecondBreakTime < '10') {
            newSecondBreakTime = `0${newSecondBreakTime}`;
          }

          setCountdownUserBreak(newUserBreakTime);
          setBreakSecondTimer(newSecondBreakTime);
        } else {
          clearInterval(userBreakInterval);
          setVisibleModal(true);
        }
      }, 1);
    }
  }, [ showBreakTime ]);

  const resetTimer: Function = (): void => {
    setCountdownInitialTime(initialTime);
    setSecondTimer('00');
    setDisabledStartButton(false);
    clearInterval(initialTimeinterval);
  }

  const stopTimer: Function = (): void => {
    setDisabledStartButton(false);
    clearInterval(initialTimeinterval);
  };

  const hideModalHandler: any = (): void => {
    setVisibleModal(false);
    setWriteableTask(false);
  };

  return (
    <div className="pomodoro__timer">
      <div style={{ display: 'flex' }}>
        { !showBreakTime
          ? <TimerText>{ countdownInitialTime }:{ secondTimer }</TimerText>
          : (<div>
              <StyledText>Your break started!</StyledText>
              <TimerText>{ countdownUserBreak }:{ breakSecondTimer }</TimerText>
            </div>)
        }
      </div>

      { !showBreakTime &&
        <>
          <div className="timer__buttons">
            <Button onClick={stopTimer}>
              Stop
            </Button>

            <Button primary="true" large="true" onClick={startTimer} disabled={disabledStartButton}>
              Start
            </Button>

            <Button onClick={resetTimer}>
              Reset
            </Button>
          </div>

          <div className="your-task">
            <StyledText large="true">Your task</StyledText>

            {
              taskOutput?.map((task: string, i: number) =>
                <StyledText key={i}>{ task ?? '' }</StyledText>)
            }
          </div>
        </>
      }

      <Modal
        visible={visibleModal}
        maskClosable={false}
        onOk={hideModalHandler}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <StyledText bold="true" color="true" large="true">Break is over</StyledText>
        <StyledText color="true">Set a new task</StyledText>
      </Modal>
    </div>
  );
}
