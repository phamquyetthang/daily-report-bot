import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import IReport from 'src/app/utils/types/report';
import { IUser } from 'src/app/utils/types/user';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  selectedId: string = '';
  constructor(private userService: UserService, private reportService: ReportService) {
    this.selectedId = userService.current._id;
  }

  ngOnInit(): void {
    this.userService.isLoginId.subscribe((id: string) => {
      this.selectedId = id;
    });
  }

  get users(): IUser[] {
    const me = { ...this.userService.current };
    const others = this.userService.users.filter((user) => user._id !== me._id);
    return [{ ...me, name: 'My reports' }, ...others];
  }

  get reports(): IReport[]{
   return this.reportService.getReportById(this.selectedId).pipe().subscribe().unsubscribe()
  }
  onSelect(id: string) {
    console.log(
      '🚀 ~ file: report.component.ts ~ line 37 ~ ReportComponent ~ onSelect ~ id',
      id
    );
    this.selectedId = id;
  }
}
