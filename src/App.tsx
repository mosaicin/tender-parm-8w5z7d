import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: todos.length + 1, text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-12">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <button
          type="submit"
          className="ml-2 p-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Add
        </button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
              className="mr-2"
            />
            <span className={`text-sm ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-auto p-1 text-sm text-red-500 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;