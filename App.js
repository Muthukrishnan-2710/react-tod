import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '', status: 'not completed' });
  const [filter, setFilter] = useState('all'); // Filter for completed, not completed, or all todos

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (newTodo.name && newTodo.description) {
      setTodos([
        ...todos,
        { ...newTodo, id: Date.now() }
      ]);
      setNewTodo({ name: '', description: '', status: 'not completed' }); // Reset input fields
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Handle editing a todo
  const handleEditTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  // Handle status change
  const handleStatusChange = (id, status) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status } : todo
    );
    setTodos(updatedTodos);
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'not completed') return todo.status === 'not completed';
    return true; // 'all'
  });

  return (
    <div className="App">
      <h1>Todo App</h1>

      {/* Input for adding new todo */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Task Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {/* Filter dropdown */}
      <div className="filter-container">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>

      {/* Render todos as cards */}
      <div className="todo-cards">
        {filteredTodos.map(todo => (
          <div className="todo-card" key={todo.id}>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <div className="status-container">
              <span>Status: </span>
              <select
                value={todo.status}
                onChange={(e) => handleStatusChange(todo.id, e.target.value)}
              >
                <option value="not completed">Not Completed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="buttons-container">
              <button onClick={() => handleEditTodo(todo.id, { name: 'Edited', description: 'Edited description' })}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
