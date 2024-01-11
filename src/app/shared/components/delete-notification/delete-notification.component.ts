import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { User } from "../../interfaces/user";

@Component({
  selector: 'app-delete-notification',
  templateUrl: './delete-notification.component.html',
  styleUrl: './delete-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteNotificationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<DeleteNotificationComponent>
  ) {}

  public cancelDelete(): void {
    this.dialogRef.close(false);
  }

  public confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
