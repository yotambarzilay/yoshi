import React, { FC } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import useTodos from './hooks/useTodos';
import useExperiments from '../../framework/hooks/useExperiments';
import useModuleParams from '../../framework/hooks/useModuleParams';

const TodoList: FC = () => {
  const { todos, addTodo, checkTodo } = useTodos();
  const { enabled } = useExperiments();
  const { config } = useModuleParams();

  return (
    <div>
      {enabled('specs.todo-app.ShowHeader') && <h1>Yo</h1>}
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCheck={done => checkTodo(todo.id, done)}
          />
        ))}
        <AddTodo onAdd={addTodo} />
      </ul>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
};

export default TodoList;
