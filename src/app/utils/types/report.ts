export interface IProjectIssue {
  project: string;
  contain: string;
}

export default interface IReport {
  _id: string;
  user: string;
  date: Date;
  yesterday: IProjectIssue[];
  re_open_bug?: string;
  reason_bug?: string;
  highlight_yesterday?: string;
  today: IProjectIssue[];
  highlight_today?: string;
  impediment?: string;
  createdAt: Date;
  updatedAt: Date;
  schedule?: Date;
}

export type IReportForm = Omit<IReport, 'date' | 'createdAt' | 'updatedAt' | 'user'>