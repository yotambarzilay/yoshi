import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:3000';

export const loadState = async userId => {
  const { data } = await axios.get('/state', { params: { userId } });
  return data;
};

export const saveState = async (state, userId) => {
  const { data } = await axios.post(
    '/state',
    { todos: state.todos, visibilityFilter: state.visibilityFilter },
    { params: { userId } },
  );
  return data;
};
