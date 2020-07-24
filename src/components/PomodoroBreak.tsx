import React from 'react';

import { IPomodoroModal } from '../interfaces';
import { StyledText } from '../styles';

import { Modal } from 'antd';

let userBreakInterval: any;

export const PomodoroBreak: React.FC<IPomodoroModal> = ({
  setWriteableTask,
  countdownUserBreak,
  setCountdownUserBreak,
  secondTimer,
  setSecondTimer,
  showBreakTime,
}) => {
  const [ visibleModal, setVisibleModal ] = React.useState<boolean>(false);

  const hideModalHandler: any = (): void => {
    setVisibleModal(false);
    setWriteableTask(false);
  };

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
          setVisibleModal(true);
        }
      }, 1000);
    }
  }, [ showBreakTime ]);

  return (
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
  );
}
