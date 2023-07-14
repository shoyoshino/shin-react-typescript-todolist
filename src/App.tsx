import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');

    // <input type='text'> の内容を空にする
    event.currentTarget.reset();
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const switchCheckedButton = (checked: boolean) => {
    if (checked) {
      return '未完了';
    } else {
      return '完了';
    }
  };

  return (
    <div className="bg-neutral-950 text-white">
      <div className="container max-w-screen-md h-screen mx-auto">
        <h2 className="text-2xl font-bold text-center pt-16">ToDoリスト with Typescript</h2>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          className="flex justify-center mt-4"
        >
          <input
            type="text"
            onChange={(event) => handleChange(event)}
            className="border outline-0 w-full rounded-sm bg-neutral-900 px-2 py-1"
          />
          <input
            type="submit"
            value="追加"
            className="bg-neutral-700 hover:bg-neutral-800 ml-2 px-2 py-1 rounded-sm duration-200"
          />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-center mt-4">
              <input
                type="text"
                onChange={(event) => handleEdit(todo.id, event.target.value)}
                className="border outline-0 rounded-sm bg-neutral-900 px-2 py-1 disabled:opacity-25 disabled:line-through"
                value={todo.inputValue}
                disabled={todo.checked}
              />

              <label className="ml-2 flex justify-center">
                <input type="checkbox" onChange={() => handleChecked(todo.id, todo.checked)} className="hidden" />
                <span className="bg-neutral-700 hover:bg-neutral-800 ml-2 px-2 py-1 rounded-sm duration-200 select-none">
                  {switchCheckedButton(todo.checked)}
                </span>
              </label>

              <button
                onClick={() => handleDelete(todo.id)}
                className="material-icons material-symbols-outlined bg-neutral-700 hover:bg-neutral-800 ml-2 px-2 py-1 rounded-sm duration-200"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
