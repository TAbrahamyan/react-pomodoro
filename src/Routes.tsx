import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { PomodoroTask } from './components/PomodoroTask';
import { PomodoroTimer } from './components/PomodoroTimer';

type PropsType = { pomodoro: any };

export const Routes: React.FC<PropsType> = ({ pomodoro }) => {
  const isInvalidPomodoro: Function = (): boolean =>
    !(pomodoro.pomodoroCount || pomodoro.initialTime || pomodoro.userBreak || pomodoro.taskOutput);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} component={PomodoroTask} exact />
        <Route
          path={'/timer'}
          render={() => isInvalidPomodoro() ? <Redirect to={'/'} /> : <PomodoroTimer />}
        />
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  );
}
