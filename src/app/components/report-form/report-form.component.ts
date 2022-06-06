import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
}
