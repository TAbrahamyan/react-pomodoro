import React from 'react';

import { PomodoroBreak } from './PomodoroBreak';
import { IPomodoroTimer } from '../interfaces';
import { Button, TimerText, StyledText } from '../styles';

import { FieldTimeOutlined } from '@ant-design/icons';
import '../scss/components/_pomodoro_timer.scss';

let initialTimeinterval: any;

export const PomodoroTimer: React.FC<IPomodoroTimer> = ({
  taskOutput,
  initialTime,
  userBreak,
  setWriteableTask,
  setPomodoroCount,
  pomodoroCount,
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

    if (newInitialTime !== '0' && !showBreakTime) {
      initialTimeinterval = setInterval(() => {
        if (newInitialTime !== +'0' && newSecondTime === '00') {
          newInitialTime -= 1;
          newSecondTime = '59';

          setCountdownInitialTime(newInitialTime);
          setSecondTimer(newSecondTime);
        } else if (newSecondTime !== '00') {
          newSecondTime -= 1;

          if (newSecondTime < '10') {
            newSecondTime = `0${newSecondTime}`;
          }

          setCountdownInitialTime(newInitialTime);
          setSecondTimer(newSecondTime);
        } else {
          if (pomodoroCount !== 0) {
            pomodoroCount -= 1;
            setPomodoroCount(pomodoroCount);
            clearInterval(initialTimeinterval);
          }

          setCountdownUserBreak(userBreak);
          setShowBreakTime(true);
        }
      }, 1000);
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
      { !showBreakTime
        ? <>
            <div>
              <TimerText>{ countdownInitialTime }:{ secondTimer }</TimerText>
              <StyledText style={{ margin: '1rem' }} large="true">
                { pomodoroCount }
                <FieldTimeOutlined style={{ color: '#FADB14' }} />
              </StyledText>
            </div>

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
        : <PomodoroBreak
            setWriteableTask={setWriteableTask}
            setDisabledStartButton={setDisabledStartButton}
            initialTime={initialTime}
            setCountdownInitialTime={setCountdownInitialTime}
            countdownUserBreak={countdownUserBreak}
            setCountdownUserBreak={setCountdownUserBreak}
            secondTimer={secondTimer}
            setSecondTimer={setSecondTimer}
            showBreakTime={showBreakTime}
            pomodoroCount={pomodoroCount}
            setShowBreakTime={setShowBreakTime}
          />
      }
    </div>
  );
}
