import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { PomodoroTask } from './pages/PomodoroTask';
import { PomodoroTimer } from './pages/PomodoroTimer';
import { Page404 } from './components/404';

export const Routes: React.FC<{ pomodoro: any }> = ({ pomodoro }) => {
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
