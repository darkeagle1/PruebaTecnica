import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './paginator-intl';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { TaskService } from '../task.service';
import { Task, TaskStatus } from '../task.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  total = 0;
  loading = false;
  page = 0;
  pageSize = 5;
  displayedColumns = ['title', 'description', 'createdAt', 'dueDate', 'status', 'actions'];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    paginatorIntl: MatPaginatorIntl
  ) {
    Object.assign(paginatorIntl, getSpanishPaginatorIntl());
  }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.loading = true;
    // Sumar 1 para la API (si la API espera base 1)
    this.taskService.getTasks(this.page + 1, this.pageSize).subscribe({
      next: (res: { tasks: Task[]; total: number; }) => {
        this.tasks = res.tasks;
        this.total = res.total;
        this.loading = false;
      },
      error: (_: any) => {
        this.snackBar.open('Error al cargar tareas', '', { duration: 2000 });
        this.loading = false;
      }
    });
  }

  onPage(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchTasks();
  }

  openForm(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task ? { ...task } : null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchTasks();
    });
  }

  deleteTask(id: string) {
    if (confirm('¿Eliminar tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: (_: any) => {
          this.snackBar.open('Tarea eliminada', '', { duration: 2000 });
          this.fetchTasks();
        },
        error: (_: any) => this.snackBar.open('Error al eliminar', '', { duration: 2000 })
      });
    }
  }

  changeStatus(task: Task, status: TaskStatus) {
    this.taskService.updateTask(task.id, { ...task, status }).subscribe({
      next: (_: any) => {
        this.snackBar.open('Estado actualizado', '', { duration: 2000 });
        this.fetchTasks();
      },
      error: (_: any) => this.snackBar.open('Error al actualizar', '', { duration: 2000 })
    });
  }
}
