import React from 'react';

import { Button, TimerText, StyledText } from '../styles';
import { PomodoroBreak } from './PomodoroBreak';
import { Context } from '../Context';

import { FieldTimeOutlined } from '@ant-design/icons';
import '../scss/components/_pomodoro_timer.scss';

type Props = { setWriteableTask: Function };

let initialTimeinterval: ReturnType<typeof setInterval>;

export const PomodoroTimer: React.FC<Props> = ({ setWriteableTask }) => {
  const { pomodoro, setPomodoro } = React.useContext(Context);
  const [ secondTimer, setSecondTimer ] = React.useState<string>('00');
  const [ countdownInitialTime, setCountdownInitialTime ] = React.useState<string>(pomodoro.initialTime);
  const [ countdownUserBreak, setCountdownUserBreak ] = React.useState<string>(pomodoro.userBreak);
  const [ disabledStartButton, setDisabledStartButton ] = React.useState<boolean>(false);
  const [ showBreakTime, setShowBreakTime ] = React.useState<boolean>(false);

  const startTimerHandler: Function = (): void => {
    let newInitialTime: any = countdownInitialTime;
    let newSecondTime: any = secondTimer;
    let newPomodoroCount: number = pomodoro.pomodoroCount;

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
          if (newPomodoroCount !== 0) {
            newPomodoroCount -= 1;
            setPomodoro({ ...pomodoro, pomodoroCount: newPomodoroCount });
            clearInterval(initialTimeinterval);
          }

          setCountdownUserBreak(pomodoro.userBreak);
          setShowBreakTime(true);
          setDisabledStartButton(false);
        }
      }, 10);
    }
  }

  const resetTimerHandler: Function = (): void => {
    setCountdownInitialTime(pomodoro.initialTime);
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
                { pomodoro.pomodoroCount }
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
              <StyledText>{ pomodoro.taskOutput }</StyledText>
            </div>
          </>
        : <PomodoroBreak
            countdownUserBreak={countdownUserBreak}
            setCountdownUserBreak={setCountdownUserBreak}
            secondTimer={secondTimer}
            setSecondTimer={setSecondTimer}
            showBreakTime={showBreakTime}
            setShowBreakTime={setShowBreakTime}
            setCountdownInitialTime={setCountdownInitialTime}
            setWriteableTask={setWriteableTask}
          />
      }
    </div>
  );
}
