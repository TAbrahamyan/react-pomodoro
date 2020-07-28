import React from 'react';
import ReactDOM from 'react-dom';

import { Timer } from './pages/Timer';

import 'antd/dist/antd.css';
import './scss/_index.scss';

const App: React.FC = () => {
  return (
    <div className="pomodoro">
      <Timer />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
