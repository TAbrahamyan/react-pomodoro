import React from 'react';

import { TimerText, StyledText } from '../styles';
import { PomodoroContext, defaultContext } from '../context/PomodoroContext';

import { Modal } from 'antd';

let userBreakInterval: any;

export const PomodoroBreak: React.FC<any> = ({
  setWriteableTask,
  setCountdownInitialTime,
  countdownUserBreak,
  setCountdownUserBreak,
  setSecondTimer,
  secondTimer,
  showBreakTime,
  setShowBreakTime,
  setDisabledStartButton,
}) => {
  const { pomodoro, setPomodoro } = React.useContext<any>(PomodoroContext);
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
            setDisabledStartButton(false);
          }
        }
      }, 1000);
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
