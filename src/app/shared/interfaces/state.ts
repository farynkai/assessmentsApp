import { UserInfo } from './auth';

export interface UserState {
  userData: UserInfo | null,
  loginError?: string | null
}

export interface LoadingSpinnerState {
  showLoading: boolean;
  spinnerError?: string;
}
