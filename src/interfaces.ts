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
