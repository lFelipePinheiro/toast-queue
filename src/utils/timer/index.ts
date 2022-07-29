interface TimerProps {
  callback(): void;
  delay: number;
}

class Timer {
  callback: () => void;
  timerId: number;
  start?: number;
  remaining: number;
  constructor({ callback, delay }: TimerProps) {
    this.callback = callback;
    this.timerId = delay;
    this.remaining = delay;
  }

  pause = () => {
    if (this.start) {
      window.clearTimeout(this.timerId);
      this.remaining -= Date.now() - this.start;
    }
  };

  resume = () => {
    this.start = Date.now();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  };
}

export default Timer;
