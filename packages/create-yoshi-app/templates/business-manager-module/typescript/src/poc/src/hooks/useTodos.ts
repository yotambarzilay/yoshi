import { useEffect, useState } from 'react';
import { ModuleRegistry } from 'react-module-container';
import { getModuleId } from '../../../framework/utils';

const getTodos = () =>
  ModuleRegistry.invoke(`${getModuleId()}.methods.getTodos`, undefined);

export interface Todo {
  id: string;
  text: string;
  done?: boolean;
}

const checkTodo = (
  todos: Array<Todo>,
  id: string,
  done?: boolean,
): Array<Todo> => {
  const index = todos.findIndex(todo => todo.id === id);

  return [
    ...todos.slice(0, index),
    { ...todos[index], done },
    ...todos.slice(index + 1),
  ];
};

const useTodos = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch();
  }, []);

  return {
    todos,
    addTodo: (todo: Todo) => setTodos(prevTodos => [...prevTodos, todo]),
    checkTodo: (todoId: string, done?: boolean) =>
      setTodos(prevTodos => checkTodo(prevTodos, todoId, done)),
  } as const;
};

export default useTodos;
