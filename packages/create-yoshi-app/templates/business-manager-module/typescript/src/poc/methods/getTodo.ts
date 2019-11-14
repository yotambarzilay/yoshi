const getTodos = ({ get }: any) => async (id: string) => get().todos[id];

export default getTodos;
