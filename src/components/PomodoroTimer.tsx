import React from 'react';

import { Button, TimerText, StyledText } from '../styles';
import '../scss/components/_pomodoro_timer.scss';

interface IProps {
  taskOutput: string[];
  initialTime: string,
}

let interval: any;

export const PomodoroTimer: React.FC<IProps> = ({
  taskOutput,
  initialTime,
}) => {
  const [ secondTimer, setSecondTimer ] = React.useState<string>('00');
  const [ countdown, setCountdown ] = React.useState<string>(initialTime);

  const startTimer: Function = (): void => {
    let newFirstTimer: any = countdown;
    let newSecondTimer: any = secondTimer;

    if (newFirstTimer !== '0') {
      interval = setInterval(() => {
        if (newFirstTimer !== +'0' && newSecondTimer === '00') {
          newFirstTimer = newFirstTimer - 1;
          newSecondTimer = '59';

          setCountdown(newFirstTimer);
          setSecondTimer(newSecondTimer);
        } else if (newSecondTimer !== '00') {
          newSecondTimer = newSecondTimer - 1;

          if (newSecondTimer < '10') {
            newSecondTimer = `0${newSecondTimer}`;
          }

          setCountdown(newFirstTimer);
          setSecondTimer(newSecondTimer);
        }
      }, 50);
    } else {
      clearInterval(interval);
    }
  }

  const resetTimer: Function = (): void => {
    setCountdown(initialTime);
    setSecondTimer('00');
    clearInterval(interval);
  }

  const stopTimer: Function = (): void => clearInterval(interval);

  return (
    <div className="pomodoro__timer">
      <TimerText>{ countdown }:{ secondTimer }</TimerText>

      <div className="timer__buttons">
        <Button onClick={stopTimer}>
          Stop
        </Button>

        <Button primary="true" large="true" onClick={startTimer}>
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
    </div>
  );
}
