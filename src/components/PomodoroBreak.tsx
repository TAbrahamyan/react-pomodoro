import React from 'react';

import { IPomodoroBreak } from '../interfaces';
import { TimerText, StyledText } from '../styles';

import { Modal } from 'antd';

let userBreakInterval: any;

export const PomodoroBreak: React.FC<IPomodoroBreak> = ({
  setWriteableTask,
  setDisabledStartButton,
  initialTime,
  setCountdownInitialTime,
  countdownUserBreak,
  setCountdownUserBreak,
  secondTimer,
  setSecondTimer,
  showBreakTime,
  pomodoroCount,
  setShowBreakTime,
}) => {
  const [ visibleModal, setVisibleModal ] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (countdownUserBreak == '0' && pomodoroCount === 0) {
      setVisibleModal(true);
    }
  }, [ countdownUserBreak ]);

  React.useEffect(() => {
    let newUserBreakTime: any = countdownUserBreak;
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

          if (pomodoroCount !== 0) {
            setCountdownInitialTime(initialTime);
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
