import React, { FC, useState } from 'react';
import { Todo } from './hooks/useTodos';

export interface AddTodoProps {
  onAdd?(todo: Todo): void;
}

const AddTodo: FC<AddTodoProps> = ({ onAdd = () => {} }) => {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  return (
    <li>
      <form
        onSubmit={e => {
          e.preventDefault();
          onAdd({ id: Math.random().toString(), text, done });
          setText('');
          setDone(false);
        }}
      >
        <input
          type="checkbox"
          checked={done}
          onChange={e => setDone(e.target.checked)}
        />

        <input value={text} onChange={e => setText(e.target.value)} />
      </form>
    </li>
  );
};

export default AddTodo;
