import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Gestión de Tareas</span>
    </mat-toolbar>
    <div class="main-content">
      <app-task-list></app-task-list>
    </div>
  `,
  styles: [`.main-content { padding: 2rem; max-width: 800px; margin: auto; }`]
})
export class AppComponent { }
