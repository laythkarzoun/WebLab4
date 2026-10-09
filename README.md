# Assignment 4 - Dynamic Task Dashboard

## File Organization
- `index.html`: Contains semantic HTML elements (`#loadTasksBtn`, `#statusMessage`, `#taskList`).
- `styles.css`: Handles dashboard component layout and completed state strike-through formatting.
- `taskManager.js`: Holds `Task` class (with immutable `id` via `Object.defineProperty`) and `TaskManager` class providing non-mutating state array operations.
- `api.js`: Simulates an asynchronous server request returning a Promise with a 1500ms delay.
- `main.js`: Handles DOM selection, event listeners, async/await fetching, JSON handling, error handling, and UI rendering.

## Challenges Faced
1. **Strict Immutability Patterns**:
   - *Challenge*: Updating tasks or toggling status without directly modifying array elements.
   - *Solution*: Used non-mutating methods like `.map()`, `.filter()`, and array spreading `[...arr]` paired with immutable `toggle()` method that returns new instances.
2. **Asynchronous DOM State Synchronization**:
   - *Challenge*: Keeping DOM UI states fully aligned with underlying `TaskManager` instance data.
   - *Solution*: Re-rendered task view dynamically through `renderTasks()` upon every user toggle or removal action.