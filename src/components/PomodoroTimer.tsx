import React from 'react';

import { PomodoroBreak } from './PomodoroBreak';
import { IPomodoroTask } from '../interfaces';
import { Button, TimerText, StyledText } from '../styles';

import '../scss/components/_pomodoro_timer.scss';

let initialTimeinterval: any;

export const PomodoroTimer: React.FC<IPomodoroTask> = ({
  taskOutput,
  initialTime,
  userBreak,
  setWriteableTask,
}) => {
  const [ secondTimer, setSecondTimer ] = React.useState<string>('00');
  const [ countdownInitialTime, setCountdownInitialTime ] = React.useState<string>(initialTime);
  const [ countdownUserBreak, setCountdownUserBreak ] = React.useState<string>(userBreak);
  const [ disabledStartButton, setDisabledStartButton ] = React.useState<boolean>(false);
  const [ showBreakTime, setShowBreakTime ] = React.useState<boolean>(false);

  const startTimerHandler: Function = (): void => {
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

  const resetTimerHandler: Function = (): void => {
    setCountdownInitialTime(initialTime);
    setSecondTimer('00');
    setDisabledStartButton(false);
    clearInterval(initialTimeinterval);
  }

  const stopTimerHandler: Function = (): void => {
    setDisabledStartButton(false);
    clearInterval(initialTimeinterval);
  };

  return (
    <div className="pomodoro__timer">
      <div style={{ display: 'flex' }}>
        { !showBreakTime
          ? <TimerText>{ countdownInitialTime }:{ secondTimer }</TimerText>
          : (<div>
              <StyledText>Your break started!</StyledText>
              <TimerText>{ countdownUserBreak }:{ secondTimer }</TimerText>
            </div>)
        }
      </div>

      { !showBreakTime &&
        <>
          <div className="timer__buttons">
            <Button onClick={stopTimerHandler}>
              Stop
            </Button>

            <Button primary="true" large="true" onClick={startTimerHandler} disabled={disabledStartButton}>
              Start
            </Button>

            <Button onClick={resetTimerHandler}>
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

      <PomodoroBreak
        setWriteableTask={setWriteableTask}
        countdownUserBreak={countdownUserBreak}
        setCountdownUserBreak={setCountdownUserBreak}
        secondTimer={secondTimer}
        setSecondTimer={setSecondTimer}
        showBreakTime={showBreakTime}
      />
    </div>
  );
}
