// Pomodoro context interface
export interface IContext {
  pomodoroCount: number,
  initialTime: string,
  taskOutput: string,
  userBreak: string,
}
// Pomodoro context interface

// Pomodoro break interface
export interface IPomodoroBreak {
  countdownUserBreak: string,
  setCountdownUserBreak: Function,
  secondTimer: string,
  setSecondTimer: Function,
  showBreakTime: boolean,
  setShowBreakTime: Function,
  setCountdownInitialTime: Function,
  setWriteableTask: Function,
}
// Pomodoro break interface
