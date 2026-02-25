import { useState } from 'react'

interface Todo {
  id: string
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos([...todos, { id: crypto.randomUUID(), text: trimmed, completed: false }])
    setInput('')
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const getRemainingCount = (): number => {
    return todos.filter(t => !t.completed).length
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
          {todos.length > 0 && (
            <span className="text-sm text-blue-500 font-medium">
              残り {getRemainingCount()} 件
            </span>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.nativeEvent.isComposing && addTodo()}
            placeholder="新しいタスクを入力..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            追加
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">タスクがありません</p>
        ) : (
          <ul className="space-y-2">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 group"
              >
                <label className="flex items-center gap-3 flex-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                  <span className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setTodos([])}
              className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer"
            >
              すべて削除
            </button>
            <p className="text-xs text-gray-400">
              {todos.filter(t => t.completed).length} / {todos.length} 完了
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
