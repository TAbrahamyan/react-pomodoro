import React from 'react';

import { Modal } from 'antd';
import { Button, TimerText } from '../styles';
import '../scss/components/_pomodoro_timer.scss';

let interval: any;

export const PomodoroTimer: React.FC = () => {
  const [ firstTimer, setFirstTimer ] = React.useState<string>('25');
  const [ secondTimer, setSecondTimer ] = React.useState<string>('00');
  const [ showModal, setShowModal ] = React.useState<boolean>(false);

  const startTimer: Function = (): void => {
    let newFirstTimer: any = firstTimer;
    let newSecondTimer: any = secondTimer;
    const displayModal: boolean = !showModal;

    if (newFirstTimer !== '0') {
      interval = setInterval(() => {
        if (newFirstTimer !== +'0' && newSecondTimer === '00') {
          newFirstTimer = newFirstTimer - 1;
          newSecondTimer = '59';

          setFirstTimer(newFirstTimer);
          setSecondTimer(newSecondTimer);
        } else if (newSecondTimer !== '00') {
          newSecondTimer = newSecondTimer - 1;

          if (newSecondTimer < '10') {
            newSecondTimer = `0${newSecondTimer}`;
          }

          if (newFirstTimer === +'0' && newSecondTimer === '00') {
            setShowModal(displayModal);
          }

          setFirstTimer(newFirstTimer);
          setSecondTimer(newSecondTimer);
        }
      }, 50);
    } else {
      clearInterval(interval);
    }
  }

  const stopTimer: Function = (): void => clearInterval(interval);

  const resetTimer: Function = (): void => {
    setFirstTimer('25');
    setSecondTimer('00');
    clearInterval(interval);
  }

  const hideModalHandler: any = (): void => {
    setFirstTimer('25');
    setSecondTimer('00');
    setShowModal(false);
  }

  return (
    <div className="pomodoro__timer">
      <TimerText>{ firstTimer }:{ secondTimer }</TimerText>

      <div className="timer__buttons">
        <Button onClick={stopTimer}>
          Stop
        </Button>

        <Button success="true" large="true" onClick={startTimer}>
          Start
        </Button>

        <Button onClick={resetTimer}>
          Reset
        </Button>
      </div>

      <Modal
        title="Pomodoro time is over"
        visible={showModal}
        onOk={hideModalHandler}
        onCancel={hideModalHandler}
      >
        <TimerText></TimerText>
      </Modal>
    </div>
  );
}
