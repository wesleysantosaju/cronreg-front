import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayTime = '00:00:00.000';
  inputMinutes!: number;
  targetTime!: number;
  interval: any;
  timerRunning = false; // Variável para controlar o estado da contagem regressiva

  constructor() { }

  ngOnInit() {
  }

  startTimer() {
    if (this.inputMinutes && this.inputMinutes > 0 && !this.timerRunning) {
      this.targetTime = new Date().getTime() + this.inputMinutes * 60 * 1000;
      this.interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = this.targetTime - currentTime;
        if (remainingTime <= 0) {
          this.displayTime = '00:00:00.000';
          clearInterval(this.interval);
          this.timerRunning = false; // Define o estado da contagem regressiva como false
        } else {
          this.displayTime = this.formatTime(remainingTime);
        }
      }, 1);
      this.timerRunning = true; // Define o estado da contagem regressiva como true
    }
  }

  stopTimer() {
    if (this.timerRunning) {
      clearInterval(this.interval);
      this.timerRunning = false; // Define o estado da contagem regressiva como false
    }
  }

  resetTimer() {
    clearInterval(this.interval);
    this.timerRunning = false; // Define o estado da contagem regressiva como false
    this.displayTime = '00:00:00.000';
  }

  formatTime(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsPart = milliseconds % 1000;

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}.${this.padMilliseconds(millisecondsPart)}`;
  }

  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  padMilliseconds(milliseconds: number): string {
    return milliseconds.toString().padStart(3, '0');
  }
}
