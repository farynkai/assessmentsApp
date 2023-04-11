import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) { }
  successfulRegistration(email: string): void {
    this.snackBar.open(`User ${email} log in successfully`, 'Close', { duration: 3000 });
  }

  showError(error: HttpErrorResponse): void {
    this.snackBar.open(`Error message: ${error.message}`, 'Close', { duration: 3000, });
  }
}
