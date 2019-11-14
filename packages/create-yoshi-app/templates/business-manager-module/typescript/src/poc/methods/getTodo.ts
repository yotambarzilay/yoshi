const getTodos = (state: any) => async (id: string) => state.todos[id];

export default getTodos;
