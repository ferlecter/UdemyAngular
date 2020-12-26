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

  ngOnInit(): void {
    this.startCountDown();
  }

  startCountDown() {
    if (this.init && this.init > 0) {
      this.counter = this.init;
      this.doCountDown();
    }
  }

  doCountDown() {
    setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountDown();
    }, 1000)
  }

  processCountDown() {
    this.onDecrease.emit(this.counter);
    console.log('count is ', this.counter);

    if (this.counter == 0) {
      console.log('counter end');
      this.onComplete.emit();
    }else{
      this.doCountDown();
    }
  }

}
