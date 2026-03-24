import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Layout } from 'lucide-react';
import './index.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Create a stunning React app 🚀', completed: true },
      { id: 2, text: 'Learn more about AI agents 🤖', completed: false },
      { id: 3, text: 'Build a premium user experience 💎', completed: false }
    ];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
    ]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>TaskPulse</h1>
      
      <form onSubmit={addTodo} className="input-wrapper">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-btn" aria-label="Add task">
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <Layout size={40} strokeWidth={1.5} opacity={0.3} style={{ marginBottom: '1rem' }} />
            <p>Your workspace is clear today. Rest well!</p>
          </div>
        ) : (
          todos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div 
                className={`checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed && <Check size={14} color="white" strokeWidth={3} />}
              </div>
              <span className="todo-text">{todo.text}</span>
              <button 
                className="delete-btn" 
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))
        )}
      </ul>

      <footer style={{ 
        marginTop: '2.5rem', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1.5rem',
        opacity: 0.5,
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layout size={14} /> Total: {todos.length}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={14} /> Done: {todos.filter(t => t.completed).length}
        </div>
      </footer>
    </div>
  );
}

export default App;
