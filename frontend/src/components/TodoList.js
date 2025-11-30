// components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // API base URL - your backend's address
  const API_URL = 'http://localhost:5000/todos';

  // FUNCTION: Fetch all todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  // UseEffect to fetch todos when the component loads
  useEffect(() => {
    fetchTodos();
  }, []);

  // FUNCTION: Add a new todo
  const addTodo = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (!inputText.trim()) return; // Don't add empty todos

    try {
      const response = await axios.post(API_URL, { text: inputText });
      setTodos([...todos, response.data]); // Add new todo to state
      setInputText(''); // Clear the input field
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // FUNCTION: Toggle the completed status of a todo
  const toggleTodo = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed: !currentStatus });
      // Update the specific todo in the state
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  // FUNCTION: Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Remove the todo from the state
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo._id, todo.completed)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;