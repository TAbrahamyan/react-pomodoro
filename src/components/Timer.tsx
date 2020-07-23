import React from 'react';

import { Button, TimerText } from '../styles';
import '../scss/components/_timer.scss';

let interval: any;

export const Timer: React.FC = () => {
  const [ firstTimer, setFirstTimer ] = React.useState<any>('25');
  const [ secondTimer, setSecondTimer ] = React.useState<any>('00');

  const startTimer = (): void => {
    let newFirstTimer: any = firstTimer;
    let newSecondTimer: any = secondTimer;

    if (newFirstTimer !== '0') {
      interval = setInterval(() => {
        if (newFirstTimer !== +0 && newSecondTimer === '00') {
          newFirstTimer = newFirstTimer - 1;
          newSecondTimer = '59';

          setFirstTimer(newFirstTimer);
          setSecondTimer(newSecondTimer);
        } else if (newSecondTimer !== '00') {
          newSecondTimer = newSecondTimer - 1;

          if (newSecondTimer < '10') {
            newSecondTimer = `0${newSecondTimer}`;
          }

          setFirstTimer(newFirstTimer);
          setSecondTimer(newSecondTimer);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }

  return (
    <div className="timer">
      <TimerText>{ firstTimer }:{ secondTimer }</TimerText>
      <Button success="true" large="true" onClick={startTimer}>
        Start
      </Button>
    </div>
  );
}
