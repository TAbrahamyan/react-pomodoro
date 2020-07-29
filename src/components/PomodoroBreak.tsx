import React from 'react';

import { IPomodoroBreak } from '../interfaces';
import { TimerText, StyledText } from '../styles';
import { PomodoroContext, defaultContext } from '../context/PomodoroContext';

import { Modal } from 'antd';

let userBreakInterval: ReturnType<typeof setInterval>;

export const PomodoroBreak: React.FC<IPomodoroBreak> = ({
  countdownUserBreak,
  setCountdownUserBreak,
  secondTimer,
  setSecondTimer,
  showBreakTime,
  setShowBreakTime,
  setCountdownInitialTime,
  setWriteableTask,
}) => {
  const { pomodoro, setPomodoro } = React.useContext(PomodoroContext);
  const [ visibleModal, setVisibleModal ] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (countdownUserBreak == '0' && pomodoro.pomodoroCount === 0) {
      setVisibleModal(true);
      localStorage.removeItem('pomodoro');
    }
  }, [ countdownUserBreak, pomodoro.pomodoroCount ]);

  React.useEffect(() => {
    let newUserBreakTime: any = pomodoro.userBreak;
    let newSecondBreakTime: any = secondTimer;

    if (newUserBreakTime !== '0' && showBreakTime === true) {
      userBreakInterval = setInterval(() => {
        if (newUserBreakTime !== +'0' && newSecondBreakTime === '00') {
          newUserBreakTime = newUserBreakTime - 1;
          newSecondBreakTime = '59';

          setCountdownUserBreak(newUserBreakTime);
          setSecondTimer(newSecondBreakTime);
        } else if (newSecondBreakTime !== '00') {
          newSecondBreakTime = newSecondBreakTime - 1;

          if (newSecondBreakTime < '10') {
            newSecondBreakTime = `0${newSecondBreakTime}`;
          }

          setCountdownUserBreak(newUserBreakTime);
          setSecondTimer(newSecondBreakTime);
        } else {
          clearInterval(userBreakInterval);

          if (pomodoro.pomodoroCount !== 0) {
            setCountdownInitialTime(pomodoro.initialTime);
            setShowBreakTime(false);
          }
        }
      }, 10);
    }
  }, []);

  const hideModalHandler: any = (): void => {
    setVisibleModal(false);
    setWriteableTask(false);
    setPomodoro(defaultContext);
  };

  return (
    <>
      <div>
        <StyledText large="true" bold="true">Your break started!</StyledText>
        <TimerText>{ countdownUserBreak }:{ secondTimer }</TimerText>
      </div>

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
    </>
  );
}
