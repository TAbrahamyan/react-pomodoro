// Task interface
export interface ITask {
  chooseTime: string[],
  chooseBreak: string[],
  taskOutput: string[],
  setTaskOutput: Function,
  setWriteableTask: Function,
  setInitialTime: Function,
  setUserBreak: Function,
}
// Task interface

// Pomodoro Task interface
export interface IPomodoroTask {
  taskOutput: string[];
  initialTime: string,
  userBreak: string,
  setWriteableTask: Function,
}
// Pomodoro Task interface

// Pomodoro modal interface
export interface IPomodoroBreak {
  setWriteableTask: Function,
  countdownUserBreak: string,
  setCountdownUserBreak: Function,
  secondTimer: string,
  setSecondTimer: Function,
  showBreakTime: boolean,
}
// Pomodoro modal interface
