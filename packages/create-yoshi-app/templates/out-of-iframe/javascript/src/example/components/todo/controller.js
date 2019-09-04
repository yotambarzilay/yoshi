// import { saveState, loadState } from './service';
import v4 from 'uuid/v4';

const defaultState = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};

const createController = async function({
  // controllerConfig,
  frameworkData,
  appData: appDataPromise,
}) {
  // const { id: userId } = controllerConfig.wixCodeApi.user.currentUser;

  // Load app data
  // const initialState = await loadState(userId);
  // console.log({ initialState });
  const initialState = undefined;

  // Wait for framework data / setup data
  const experiments = await frameworkData.experimentsPromise;
  const appData = await appDataPromise;

  // Set initial state
  this.state = initialState || defaultState;

  console.log('In Controller');
  console.log({ experiments, appData });

  return {
    // Methods exposed to the widget
    methods: {
      addTodo: text => {
        this.setState({
          todos: [
            ...this.state.todos,
            {
              id: v4(),
              text,
              completed: false,
            },
          ],
        });
      },
      toggleTodo: id => {
        this.setState({
          todos: this.state.todos.map(todo => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }

            return todo;
          }),
        });
      },
      setVisibilityFilter: visibilityFilter => {
        this.setState({ visibilityFilter });
      },
    },
    // Hook for state changes
    stateChange: () => {
      // saveState(this.state, userId);
    },
    // Expose Corvid API
    exports: {
      getTodos: () => this.state.todos,
    },
  };
};

export default createController;
