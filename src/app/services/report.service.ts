import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import IReport from '../utils/types/report';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private apiService: ApiService) {}

  reports = new ReplaySubject<IReport[]>(1);

  getReportById(id?: string) : void{
    this.apiService
      .get(`/report/daily`, id ? { userId: id } : undefined)
      .subscribe((data) => {
        this.reports.next(data);
      });
  }
}
