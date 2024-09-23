import { Component, Inject } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialogRef, MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { PeriodicElement } from '../../../interfaces/periodic-element.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatInput,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: EditDialogComponent,
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditDialogComponent,
      multi: true
    }],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})

export class EditDialogComponent {
  editForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
    this.editForm = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      weight: new FormControl(this.data.weight),
      symbol: new FormControl(this.data.symbol),
    });
  }

  onSave() {
    this.dialogRef.close({
      ...this.data,
      name: this.editForm?.value.name,
      weight: this.editForm?.value.weight,
      symbol: this.editForm?.value.symbol,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
