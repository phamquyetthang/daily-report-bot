import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() disable: boolean = false;
  @Input() minDate: string = moment().format();
  @Input() currentValue: string = moment().add(30, 'M').format();
  @Output() updateTimeEvent = new EventEmitter<string>();

  currentHour: number = 8;
  currentMinuses: number = 30;

  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker = false;

  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [6] as number[];
  blankdays = [] as number[];

  constructor() {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.currentHour = moment(this.currentValue).hour();
    console.log(
      '🚀 ~ file: date-picker.component.ts ~ line 55 ~ DatePickerComponent ~ initDate ~  this.currentHour',
      this.currentHour
    );
    this.currentMinuses = moment(this.currentValue).minutes();
  }

  isSelectedDay(date: any) {
    const d = new Date(this.year, this.month, date);
    return moment(this.currentValue).isSame(d, 'D');
  }
  isToDay(date: any) {
    const d = new Date(this.year, this.month, date);
    return moment(d).isSame(moment(), 'D');
  }

  updateTime(newTime: string) {
    if (moment(newTime).isAfter(this.minDate)) {
      this.currentValue = newTime;
      !this.disable && this.updateTimeEvent.emit(newTime);
    }
  }
  getDateValue(date: any) {
    let selectedDate = new Date(this.year, this.month, date);
    if (this.isDisableDate(selectedDate)) {
      return;
    }
    const newTime = moment(
      `${moment(selectedDate).format('YYYY-DD-MM')}  ${this.currentHour}:${
        this.currentMinuses
      }`,
      'YYYY-DD-MM H:mm'
    ).format();
    this.updateTime(newTime);
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;
  isDisableDate(date: Date): boolean {
    return moment(date).isBefore(this.minDate, 'D');
  }

  isDisableDateUi(date: any): boolean {
    const d = new Date(this.year, this.month, date);
    return this.isDisableDate(d);
  }

  changeHour($event: number) {
    if ($event <= 24 && $event >= 0) {
      const newTime = moment(
        `${moment(this.currentValue).format('YYYY-DD-MM')}  ${$event}:${
          this.currentMinuses
        }`,
        'YYYY-DD-MM H:mm'
      ).format();
      this.updateTime(newTime);
    }
  }
  changeMinutes($event: number) {
    if ($event < 60 && $event >= 0) {
      const newTime = (this.currentValue = moment(
        `${moment(this.currentValue).format('YYYY-DD-MM')}  ${
          this.currentHour
        }:${$event}`,
        'YYYY-DD-MM H:mm'
      ).format());
      this.updateTime(newTime);
    }
  }
}
