import { UserInfo } from './auth';
import { Report } from './report';

export interface UserState {
  userData: UserInfo | null,
  loginError?: string | null
}

export interface ReportsState {
  reportsList: Report[],
  reportsError?: string
}

export interface LoadingSpinnerState {
  showLoading: boolean;
  spinnerError?: string;
}
