import React, { FC } from 'react';
import { Todo } from './hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onCheck?(done: boolean): void;
}

const TodoItem: FC<TodoItemProps> = ({
  todo: { text, done = false },
  onCheck = () => {},
}) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={done}
          onChange={e => onCheck(e.target.checked)}
        />
        <span>{text}</span>
      </label>
    </li>
  );
};

export default TodoItem;
