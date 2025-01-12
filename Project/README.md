# Task Management API

## Endpoints

### 1. Create a New Task

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Optional Task Description",
    "dueDate": "2025-01-01T00:00:00.000Z",
    "status": "pending"
  }
  ```
