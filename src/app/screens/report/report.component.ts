import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import IReport, {
  IProjectIssue,
  IReportForm,
} from 'src/app/utils/types/report';
import { IUser } from 'src/app/utils/types/user';
const initReportEdit = {
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

  _id: '',
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  selectedId: string = '';

  reports: IReport[] = [];
  isOpenAddEdit: boolean = false;

  reportEdit: IReportForm = {
    ...initReportEdit,
  };
  editId: string = '';

  constructor(
    private userService: UserService,
    private reportService: ReportService
  ) {
    this.selectedId = userService.current._id;
  }

  ngOnInit(): void {
    this.userService.isLoginId.subscribe((id: string) => {
      this.selectedId = id;
      this.reportService.getReportById();
    });

    this.reportService.reports.asObservable().subscribe((data) => {
      this.reports = data;
    });
  }

  get users(): IUser[] {
    const me = { ...this.userService.current };
    const others = this.userService.users.filter((user) => user._id !== me._id);
    return [{ ...me, name: 'My reports' }, ...others];
  }

  projectReport(report: IReport): IProjectIssue[] {
    return report.yesterday;
  }

  getDateType(date: Date): 1 | 2 | 3 {
    if (moment().isSame(date, 'D')) {
      return 1;
    }
    if (moment().isBefore(date)) {
      return 2;
    }
    return 3;
  }

  days() {
    const weekStart = moment().startOf('week');

    const days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format('ddd D'));
    }

    return days;
  }

  onSelect(id: string) {
    this.selectedId = id;
    this.reportService.getReportById(id);
  }

  toggleModal(report?: IReport) {
    this.isOpenAddEdit = !this.isOpenAddEdit;
    if (report) {
      this.reportEdit = report as IReportForm;
    } else {
      this.reportEdit = { ...initReportEdit };
    }
  }
}
