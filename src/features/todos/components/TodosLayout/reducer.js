export default (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true,
      }
    case 'add':
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.payload],
      }
    case 'update':
      return {
        ...state,
        loading: false,
        todos: [...action.payload],
      }
    case 'delete':
      state.todos.splice(action.payload, 1)
      return {
        ...state,
        loading: false,
      }
    default:
      throw new Error()
  }
}
