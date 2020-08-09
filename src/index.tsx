import React from 'react';
import { render } from 'react-dom';

import { IContext } from './interfaces';
import { Context, defaultContext } from './Context';
import { Routes } from './Routes';

import 'antd/dist/antd.css';
import './scss/app.scss';

const App: React.FC = () => {
  const [ pomodoro, setPomodoro ] = React.useState<IContext>(defaultContext);

  return (
    <Context.Provider value={{ pomodoro, setPomodoro }}>
      <div className="pomodoro">
        <Routes pomodoro={pomodoro} />
      </div>
    </Context.Provider>
  );
}

render(
  <App />,
  document.getElementById('root')
);
