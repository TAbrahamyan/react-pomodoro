// Task interface
export interface IPomodoroTask {
  pomodoroCount: number,
  setPomodoroCount: Function,
  chooseTime: string[],
  chooseBreak: string[],
  taskOutput: string[],
  setTaskOutput: Function,
  setWriteableTask: Function,
  setInitialTime: Function,
  setUserBreak: Function,
  initialTime: string,
}
// Task interface

// Pomodoro Task interface
export interface IPomodoroTimer {
  taskOutput: string,
  setTaskOutput: Function,
  initialTime: string,
  setInitialTime: Function,
  userBreak: string,
  setWriteableTask: Function,
  pomodoroCount: number,
  setPomodoroCount: Function,
}
// Pomodoro Task interface

// Pomodoro modal interface
export interface IPomodoroBreak {
  setWriteableTask: Function,
  setDisabledStartButton: Function,
  initialTime: string,
  setCountdownInitialTime: Function,
  countdownUserBreak: string,
  setCountdownUserBreak: Function,
  secondTimer: string,
  setSecondTimer: Function,
  showBreakTime: boolean,
  pomodoroCount: number,
  setShowBreakTime: Function,
}
// Pomodoro modal interface
