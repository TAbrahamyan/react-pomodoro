import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { PomodoroTask } from './components/PomodoroTask';
import { PomodoroTimer } from './components/PomodoroTimer';
import { Page404 } from './components/404';

type PropsType = { pomodoro: any };

export const Routes: React.FC<PropsType> = ({ pomodoro }) => {
  const isInvalidPomodoro: Function = (): boolean =>
    !(pomodoro.pomodoroCount || pomodoro.initialTime || pomodoro.userBreak || pomodoro.taskOutput);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={PomodoroTask} exact />
        <Route path="/404" component={Page404} />
        <Route
          path="/timer"
          render={() => isInvalidPomodoro() ? <Redirect to="/" /> : <PomodoroTimer />}
        />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}
