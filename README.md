# Kanban Task Manager

A simple **Kanban-style task management web application** that allows users to add, edit, delete, and reorder tasks across different columns (To-Do, Doing, Done). The tasks are saved in **LocalStorage**, ensuring persistence even after page refresh.

## Features

- **Add Tasks**: Users can input tasks and add them to a specific column.
- **Drag and Drop**: Tasks can be dragged between columns for easy status updates.
- **Right-Click Context Menu**: Edit or delete tasks using a custom right-click menu.
- **Task Count Updates**: Displays the number of tasks in each column.
- **LocalStorage Support**: Tasks are stored locally so that they persist after refreshing the page.
- **Reset Button**: Clears all tasks and resets the board.

## How It Works

### 1. Adding a Task
- Users enter a task in the input field of a column (To-Do, Doing, or Done) and press the "Add" button.
- The task appears in the respective column along with the current timestamp.
- The task count is updated dynamically.

### 2. Drag and Drop Functionality
- Tasks are **draggable** between columns.
- On dragging a task, the script determines where to place it based on cursor position.
- Once dropped, the new task arrangement is saved in **LocalStorage**.

### 3. Right-Click Context Menu
- Right-clicking on a task brings up a **custom context menu** with options to **edit** or **delete** the task.
- Clicking "Edit" prompts the user to enter a new task name.
- Clicking "Delete" removes the task from the column and updates **LocalStorage**.

### 4. LocalStorage Integration
- Tasks are stored as JSON in the browser’s LocalStorage.
- When the page loads, tasks are retrieved from LocalStorage and displayed.
- Any changes (dragging, editing, deleting) update LocalStorage automatically.

### 5. Reset Functionality
- Clicking the "Reset" button clears **all tasks** from the board and LocalStorage.
- The task counters reset to **zero**.

## Project Structure

```
📂 Task Manager
├── 📄 index.html  # Main HTML file
├── 📄 style.css   # Styling for the UI
├── 📄 script.js   # Core JavaScript logic (drag & drop, context menu, local storage)
```

## Technologies Used

- **HTML** - Structure of the task board
- **CSS** - Styling for columns, cards, and the context menu
- **JavaScript** - Handles task creation, drag-and-drop, and LocalStorage integration

## Installation & Usage
1. clone my gitrepo
2. Open `index.html` in a browser.
3. Start adding and managing your tasks!

## Live Demo
You can view the live version of this project here:
[Live URL](https://kanban-boaard-1.onrender.com)

## Future Improvements

- **Mobile Responsiveness**: Improve UI for mobile devices.
- **Undo Feature**: Allow users to recover deleted tasks.
- **Themes/Dark Mode**: Add customization options for user experience.


