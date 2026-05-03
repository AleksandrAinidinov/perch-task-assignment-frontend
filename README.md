# Task List App

Angular application for managing tasks.

## Tech Stack
- Angular
- Bootstrap 5
- RxJS

## Architecture
- **Service-Component Pattern**: Decoupled UI logic from API communication.
- **Reactive State**: RxJS Observables for handling asynchronous task data.

## Project Structure
- `src/app/home`: Main UI component and task list template.
- `src/app/services`: Encapsulated HttpClient logic for the API.
- `src/app/models`: TypeScript interfaces for the Task data model.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```
   *Note: Using `npm start` ensures the backend proxy is correctly configured.*

## Features
- **Add Tasks**: Create new tasks with a title and description.
- **View Tasks**: Display a responsive list of all tasks.
- **Update Status**: Mark tasks as completed or incomplete.
- **Delete Tasks**: Remove tasks from the list.
