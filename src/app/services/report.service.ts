import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IReport from '../utils/types/report';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: ApiService) { }
  
  getReportById(id: string): Observable<IReport[]>{
    return this.apiService.get(id)
  }
}
