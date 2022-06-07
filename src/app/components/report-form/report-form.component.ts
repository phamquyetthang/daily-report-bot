import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { IReportForm } from 'src/app/utils/types/report';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() isOpen: boolean = false;
  @Input() report: IReportForm = {
    _id: '',
    yesterday: [
      {
        project: '',
        contain: '',
      },
    ],

    today: [
      {
        project: '',
        contain: '',
      },
    ],
  };

  @Output() closeEvent = new EventEmitter<void>();

  toggleModal() {
    this.closeEvent.emit();
  }

  addFormYesterday() {
    this.report.yesterday.push({
      project: '',
      contain: '',
    });
  }

  get isShowDate() {
    return (
      (this.report.date && moment(this.report.date).isBefore(moment())) ||
      (this.report.schedule && moment(this.report.schedule).isBefore(moment()))
    );
  }

  get defaultScheduleTime(): string {
    return this.report.schedule
      ? moment(this.report.schedule).format()
      : moment().add(1, 'day').startOf('D').add(8, 'hours').format();
  }

  updateSchedule(time: string) {
    this.report.schedule = new Date(time);
  }
}
