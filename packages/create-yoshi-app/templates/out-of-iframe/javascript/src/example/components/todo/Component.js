import React from 'react';
import { PublicData, Controller } from 'yoshi-flow-editor-runtime';
import styles from './styles.scss';

const Todo = ({ onClick, completed, text }) => {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {text}
    </li>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const TodoList = () => {
  return (
    <Controller>
      {ctrl => (
        <ul>
          {getVisibleTodos(ctrl.todos, ctrl.visibilityFilter).map(todo => (
            <Todo
              key={todo.id}
              {...todo}
              onClick={() => ctrl.toggleTodo(todo.id)}
            />
          ))}
        </ul>
      )}
    </Controller>
  );
};

const Link = ({ active, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={active}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  );
};

const Footer = () => {
  return (
    <Controller>
      {ctrl => (
        <div>
          <span>Show: </span>
          <Link
            active={'SHOW_ALL' === ctrl.visibilityFilter}
            onClick={() => ctrl.setVisibilityFilter('SHOW_ALL')}
          >
            All
          </Link>
          <Link
            active={'SHOW_ACTIVE' === ctrl.visibilityFilter}
            onClick={() => ctrl.setVisibilityFilter('SHOW_ACTIVE')}
          >
            Active
          </Link>
          <Link
            active={'SHOW_COMPLETED' === ctrl.visibilityFilter}
            onClick={() => ctrl.setVisibilityFilter('SHOW_COMPLETED')}
          >
            Completed
          </Link>
        </div>
      )}
    </Controller>
  );
};

const AddTodo = () => {
  let input;

  return (
    <Controller>
      {ctrl => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!input.value.trim()) {
                return;
              }
              ctrl.addTodo(input.value);
              input.value = '';
            }}
          >
            <input ref={node => (input = node)} />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Controller>
  );
};

export default () => {
  return (
    <div className={styles.wrapper}>
      <PublicData>
        {publicData => {
          return (
            <div>
              <h1>{publicData.get('title')}</h1>
              <AddTodo />
              <TodoList />
              <Footer />
            </div>
          );
        }}
      </PublicData>
    </div>
  );
};
