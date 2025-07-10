# Tasks Frontend (Angular 16+)

Aplicación de gestión de tareas desarrollada en Angular, con arquitectura modular, servicios y componentes reutilizables. Incluye paginación, validaciones de formularios, manejo de estados y una interfaz profesional basada en Angular Material.

## Requisitos Previos
- Node.js 16 o superior
- Angular CLI 16 o superior

## Instalación y Ejecución
1. Clona este repositorio y navega a la carpeta del frontend.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   ng serve
   ```
4. Accede desde tu navegador a: [http://localhost:4200](http://localhost:4200)

## Conexión con el Backend
- El frontend espera que el backend esté disponible en `http://localhost:5032`.
- Si necesitas cambiar la URL del backend, edita el archivo `src/environments/environment.ts` (`apiUrl`).

## Funcionalidades Principales
- **Lista de tareas** con paginación.
- **Crear, editar y eliminar tareas**.
- **Cambiar estado** de la tarea (Pendiente, En Progreso, Completada).
- **Validaciones** en formularios reactivos.
- **Manejo de carga** y feedback visual con spinner.
- **Interfaz moderna** usando Angular Material.

## Estructura del Proyecto
```
src/
  app/
    tasks/
      task-list/      # Componente para listar tareas
      task-form/      # Componente para crear/editar tareas
      task.model.ts   # Modelo de datos de tarea
      task.service.ts # Servicio para comunicación con backend
    app.module.ts     # Módulo principal
  environments/       # Configuración de entornos
```

