import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  constructor() { }
  @Input() init: number = null;

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  public counter: number = 0;
  private countDownTimerRef: any = null;

  ngOnInit(): void {
    this.startCountDown();
  }

  startCountDown() {
    if (this.init && this.init > 0) {
      this.clearTimeOut();
      this.counter = this.init;
      this.doCountDown();
    }
  }

  doCountDown() {
    this.countDownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountDown();
    }, 1000)
  }

  private clearTimeOut() {
    if (this.countDownTimerRef) {
      clearTimeout(this.countDownTimerRef);
      this.countDownTimerRef = null;
    }
  }

  processCountDown() {
    this.onDecrease.emit(this.counter);
    console.log('count is ', this.counter);

    if (this.counter == 0) {
      console.log('counter end');
      this.onComplete.emit();
    } else {
      this.doCountDown();
    }
  }

}
