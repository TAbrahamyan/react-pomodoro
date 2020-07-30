import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { PomodoroTask } from './components/PomodoroTask';
import { PomodoroTimer } from './components/PomodoroTimer';

type PropsType = { pomodoro: any };

export const Routes: React.FC<PropsType> = ({ pomodoro }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} component={PomodoroTask} exact />
        <Route
          path={'/timer'}
          render={() =>
            (!pomodoro.pomodoroCount
            && !pomodoro.initialTime
            && !pomodoro.userBreak
            && !pomodoro.taskOutput
            ? <Redirect to={'/'} />
            : <PomodoroTimer />)
          }
        />
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  );
}
