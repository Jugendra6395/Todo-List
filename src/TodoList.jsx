import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./TodoList.css";

export default function TodoList() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (!newTodo.trim()) return;
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4() }];
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <div className="todo-card">
        <h1 className="todo-title">📋 To-Do List</h1>
        <p className="todo-subtitle">Stay organized. Add your tasks below.</p>

        <div className="todo-input-row">
          <input
            className="todo-input"
            placeholder="Add a task..."
            type="text"
            value={newTodo}
            onChange={updateTodoValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNewTask();
            }}
          />
          <button
            className="todo-add-btn"
            onClick={addNewTask}
            disabled={!newTodo.trim()}
          >
            Add Task
          </button>
        </div>

        <hr className="todo-divider" />

        <ul className="todo-list">
          {todos.length === 0 && (
            <p className="todo-empty">No tasks yet. Add your first one! ✨</p>
          )}
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span className="todo-text">{todo.task}</span>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTask(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
