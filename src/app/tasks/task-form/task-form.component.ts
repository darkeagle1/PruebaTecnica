import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task, TaskStatus } from '../task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  form: FormGroup;
  isEdit = false;
  statusOptions = [
    { value: 0, label: 'Pendiente' },
    { value: 1, label: 'En Progreso' },
    { value: 2, label: 'Completada' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      title: [data?.title || '', [Validators.required, Validators.maxLength(100)]],
      description: [data?.description || ''],
      dueDate: [data?.dueDate || ''],
      status: [data?.status ?? 0, Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (this.isEdit && this.data) {
      this.taskService.updateTask(this.data.id, {
        ...this.data,
        ...value
      }).subscribe({
        next: _ => {
          this.snackBar.open('Tarea actualizada', '', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error: _ => this.snackBar.open('Error al actualizar', '', { duration: 2000 })
      });
    } else {
      this.taskService.createTask(value).subscribe({
        next: _ => {
          this.snackBar.open('Tarea creada', '', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error: _ => this.snackBar.open('Error al crear', '', { duration: 2000 })
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
